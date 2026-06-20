import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

const schema = z.object({
  mentorNames: z.array(z.string().trim().min(1)).length(3),
});

function normalizeMentorName(value: string) {
  return value.trim();
}

function getOnboardingSaveErrorMessage(error: {
  code?: string;
  message?: string;
  details?: string;
}) {
  if (error.code === "42P01") {
    return "导师数据表还没有创建成功，请先运行数据库 migration。";
  }

  if (error.code === "23505") {
    return "导师数据发生了唯一约束冲突，请刷新页面后重试。";
  }

  if (error.code === "42501") {
    return "当前账号没有保存导师镜像的权限，请重新登录后再试。";
  }

  if (error.message?.includes("there is no unique or exclusion constraint")) {
    return "数据库缺少 user_id 唯一约束，说明 migration 可能还没有正确执行。";
  }

  if (error.message?.includes("Could not find the 'user_id' column")) {
    return "数据库表结构和当前代码不一致，请重新执行 migration。";
  }

  if (error.message?.includes("relation") && error.message.includes("does not exist")) {
    return "导师数据表不存在，请先执行数据库 migration。";
  }

  if (error.message?.includes("Could not find the table 'public.mentor_selections'")) {
    return "导师数据表还没有创建，请先去 Supabase 执行数据库 migration。";
  }

  if (error.message) {
    return `保存导师镜像失败：${error.message}`;
  }

  return "保存导师镜像失败，请稍后再试。";
}

export async function POST(request: Request) {
  if (!getSupabaseEnv().isConfigured) {
    return NextResponse.json(
      { error: "Supabase 尚未配置，暂时无法保存导师选择。" },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "请先登录。" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "必须刚好填写 3 位公开人物。" },
      { status: 400 },
    );
  }

  const mentorNames = parsed.data.mentorNames.map(normalizeMentorName);
  const uniqueMentors = new Set(
    mentorNames.map((mentor) => mentor.toLocaleLowerCase()),
  );

  if (uniqueMentors.size !== mentorNames.length) {
    return NextResponse.json(
      { error: "3 位导师不能重复，请修改后再保存。" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("mentor_selections").upsert(
    {
      user_id: user.id,
      mentor_names: mentorNames,
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) {
    return NextResponse.json(
      { error: getOnboardingSaveErrorMessage(error) },
      { status: 500 },
    );
  }

  await supabase.from("mentor_profiles").delete().eq("user_id", user.id);

  revalidatePath("/onboarding");
  revalidatePath("/distill");
  revalidatePath("/dashboard");
  revalidatePath("/history");

  return NextResponse.json({
    success: true,
    redirectTo: "/distill",
  });
}

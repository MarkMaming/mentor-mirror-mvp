import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSupabaseEnv } from "@/lib/env";
import { distillMentorProfile } from "@/lib/mock/mentor-replies";
import { createClient } from "@/lib/supabase/server";

function getDistillErrorMessage(error: {
  code?: string;
  message?: string;
  details?: string;
}) {
  if (error.code === "42P01") {
    return "导师镜像数据表还没有创建成功，请先执行 0002_mentor_profiles.sql。";
  }

  if (error.code === "23505") {
    return "导师镜像保存时发生唯一约束冲突，请刷新页面后重试。";
  }

  if (error.code === "42501") {
    return "当前账号没有保存导师镜像的权限，请重新登录后再试。";
  }

  if (error.message?.includes("Could not find the table 'public.mentor_profiles'")) {
    return "Supabase 里还没有 mentor_profiles 表，请先执行 0002_mentor_profiles.sql。";
  }

  if (error.message?.includes("relation") && error.message.includes("does not exist")) {
    return "导师镜像相关数据表不存在，请先执行 0002_mentor_profiles.sql。";
  }

  if (error.message) {
    return `导师镜像蒸馏失败：${error.message}`;
  }

  return "导师镜像蒸馏失败，请稍后再试。";
}

export async function POST() {
  if (!getSupabaseEnv().isConfigured) {
    return NextResponse.json(
      { error: "Supabase 尚未配置，暂时无法生成导师镜像。" },
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

  const { data: selection, error: selectionError } = await supabase
    .from("mentor_selections")
    .select("mentor_names")
    .eq("user_id", user.id)
    .maybeSingle();

  if (selectionError || !selection || selection.mentor_names.length !== 3) {
    return NextResponse.json(
      { error: "请先完成 3 位导师的设置，再生成导师镜像。" },
      { status: 400 },
    );
  }

  const profiles = selection.mentor_names.map((mentorName) => {
    const profile = distillMentorProfile({ mentorName });

    return {
      user_id: user.id,
      mentor_name: profile.mentorName,
      distilled_summary: profile.distilledSummary,
      perspective_prompt: profile.perspectivePrompt,
      communication_style: profile.communicationStyle,
      focus_areas: profile.focusAreas,
      signature_questions: profile.signatureQuestions,
      caution_note: profile.cautionNote,
      status: profile.status,
    };
  });

  const { error } = await supabase.from("mentor_profiles").upsert(profiles, {
    onConflict: "user_id,mentor_name",
  });

  if (error) {
    return NextResponse.json({ error: getDistillErrorMessage(error) }, { status: 500 });
  }

  revalidatePath("/distill");
  revalidatePath("/dashboard");
  revalidatePath("/history");

  return NextResponse.json({
    success: true,
    redirectTo: "/dashboard",
  });
}

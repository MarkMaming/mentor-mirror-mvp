import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  if (!getSupabaseEnv().isConfigured) {
    return NextResponse.json(
      { error: "Supabase 尚未配置，暂时无法删除复盘。" },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "登录状态已失效，请重新登录。" }, { status: 401 });
  }

  const { data: reflection, error: reflectionError } = await supabase
    .from("reflections")
    .select("id, user_id")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (reflectionError || !reflection) {
    return NextResponse.json({ error: "未找到这篇复盘。" }, { status: 404 });
  }

  const { error } = await supabase.from("reflections").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "删除复盘失败，请稍后再试。" }, { status: 500 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/history");

  return NextResponse.json({ success: true });
}

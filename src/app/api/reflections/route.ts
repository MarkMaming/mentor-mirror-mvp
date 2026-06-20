import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { MentorProfile } from "@/types/domain";
import { getSupabaseEnv } from "@/lib/env";
import { generateMentorReplies } from "@/lib/mock/mentor-replies";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  content: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  if (!getSupabaseEnv().isConfigured) {
    return NextResponse.json(
      { error: "Supabase 尚未配置，暂时无法提交复盘。" },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "登录状态已失效，请重新登录。" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "复盘内容至少需要 10 个字符。" },
      { status: 400 },
    );
  }

  const { data: selection, error: selectionError } = await supabase
    .from("mentor_selections")
    .select("mentor_names")
    .eq("user_id", user.id)
    .maybeSingle();

  if (selectionError || !selection || selection.mentor_names.length !== 3) {
    return NextResponse.json(
      { error: "请先完成 3 位导师的选择，再提交复盘。" },
      { status: 400 },
    );
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("mentor_profiles")
    .select(
      "id, user_id, mentor_name, distilled_summary, perspective_prompt, communication_style, focus_areas, signature_questions, caution_note, status, distilled_at",
    )
    .eq("user_id", user.id)
    .order("distilled_at", { ascending: true });

  if (profilesError || !profiles || profiles.length !== 3) {
    return NextResponse.json(
      { error: "请先完成这 3 位导师的镜像蒸馏，再提交复盘。" },
      { status: 400 },
    );
  }

  const mentorProfiles: MentorProfile[] = profiles.map((profile) => ({
    id: profile.id,
    userId: profile.user_id,
    mentorName: profile.mentor_name,
    distilledSummary: profile.distilled_summary,
    perspectivePrompt: profile.perspective_prompt,
    communicationStyle: profile.communication_style,
    focusAreas: profile.focus_areas,
    signatureQuestions: profile.signature_questions,
    cautionNote: profile.caution_note,
    status: profile.status,
    distilledAt: profile.distilled_at,
  }));

  const mentorReplies = generateMentorReplies({
    mentorProfiles,
    reflection: parsed.data.content,
  });

  const { data: reflection, error: reflectionError } = await supabase
    .from("reflections")
    .insert({
      user_id: user.id,
      content: parsed.data.content,
      summary: parsed.data.content.slice(0, 120),
      source_type: "mock",
      source_metadata: {
        generator: "mock-mentor-replies",
        mentorProfileCount: mentorProfiles.length,
      },
    })
    .select("id, content, summary, source_type, created_at")
    .single();

  if (reflectionError || !reflection) {
    return NextResponse.json(
      { error: "保存复盘失败，请稍后再试。" },
      { status: 500 },
    );
  }

  const { data: insertedReplies, error: repliesError } = await supabase
    .from("mentor_replies")
    .insert(
      mentorReplies.map((reply) => ({
        reflection_id: reflection.id,
        user_id: user.id,
        mentor_name: reply.mentorName,
        content: reply.content,
        style_note: reply.styleNote,
      })),
    )
    .select("id, mentor_name, content, style_note, created_at");

  if (repliesError || !insertedReplies) {
    return NextResponse.json(
      { error: "保存导师回复失败，请稍后再试。" },
      { status: 500 },
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/history");

  return NextResponse.json({
    reflection: {
      id: reflection.id,
      content: reflection.content,
      summary: reflection.summary,
      sourceType: reflection.source_type,
      createdAt: reflection.created_at,
      replies: insertedReplies.map((reply) => ({
        id: reply.id,
        mentorName: reply.mentor_name,
        content: reply.content,
        styleNote: reply.style_note,
        createdAt: reply.created_at,
        reflectionId: reflection.id,
        followups: [],
      })),
    },
  });
}

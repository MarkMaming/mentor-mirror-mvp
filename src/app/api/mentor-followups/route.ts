import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { MentorProfile } from "@/types/domain";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import { generateMentorFollowupReply } from "@/lib/mock/mentor-replies";

const schema = z.object({
  mentorReplyId: z.string().uuid(),
  reflectionId: z.string().uuid(),
  mentorName: z.string().trim().min(1),
  question: z.string().trim().min(3).max(1000),
  originalReply: z.string().trim().min(1).max(10000).optional(),
  previousFollowups: z
    .array(
      z.object({
        question: z.string().trim().min(1).max(1000),
        answer: z.string().trim().min(1).max(10000),
      }),
    )
    .max(20)
    .optional(),
});

export async function POST(request: Request) {
  if (!getSupabaseEnv().isConfigured) {
    return NextResponse.json(
      { error: "Supabase 尚未配置，暂时无法继续追问。" },
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
      { error: "追问内容至少需要 3 个字符。" },
      { status: 400 },
    );
  }

  const { data: replyRecord, error: replyError } = await supabase
    .from("mentor_replies")
    .select("id, mentor_name, reflection_id, user_id")
    .eq("id", parsed.data.mentorReplyId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (replyError || !replyRecord || replyRecord.reflection_id !== parsed.data.reflectionId) {
    return NextResponse.json({ error: "未找到可追问的导师回复。" }, { status: 404 });
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("mentor_profiles")
    .select(
      "id, user_id, mentor_name, distilled_summary, perspective_prompt, communication_style, focus_areas, signature_questions, caution_note, status, distilled_at",
    )
    .eq("user_id", user.id);

  if (profilesError || !profiles) {
    return NextResponse.json({ error: "未找到导师镜像资料。" }, { status: 400 });
  }

  const mentorProfile = profiles.find(
    (profile) =>
      profile.mentor_name.toLocaleLowerCase() === parsed.data.mentorName.toLocaleLowerCase(),
  );

  if (!mentorProfile) {
    return NextResponse.json({ error: "未找到该导师的镜像资料。" }, { status: 404 });
  }

  const profile: MentorProfile = {
    id: mentorProfile.id,
    userId: mentorProfile.user_id,
    mentorName: mentorProfile.mentor_name,
    distilledSummary: mentorProfile.distilled_summary,
    perspectivePrompt: mentorProfile.perspective_prompt,
    communicationStyle: mentorProfile.communication_style,
    focusAreas: mentorProfile.focus_areas,
    signatureQuestions: mentorProfile.signature_questions,
    cautionNote: mentorProfile.caution_note,
    status: mentorProfile.status,
    distilledAt: mentorProfile.distilled_at,
  };

  const answer = generateMentorFollowupReply({
    profile,
    question: parsed.data.question,
    originalReply: parsed.data.originalReply,
    previousFollowups: parsed.data.previousFollowups,
  });

  const { data: followup, error: insertError } = await supabase
    .from("mentor_followups")
    .insert({
      mentor_reply_id: parsed.data.mentorReplyId,
      reflection_id: parsed.data.reflectionId,
      user_id: user.id,
      mentor_name: parsed.data.mentorName,
      question: parsed.data.question,
      answer,
    })
    .select("id, mentor_name, question, answer, created_at, mentor_reply_id, reflection_id")
    .single();

  if (insertError || !followup) {
    return NextResponse.json({ error: "保存追问失败，请稍后再试。" }, { status: 500 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/history");

  return NextResponse.json({
    followup: {
      id: followup.id,
      mentorName: followup.mentor_name,
      question: followup.question,
      answer: followup.answer,
      createdAt: followup.created_at,
      mentorReplyId: followup.mentor_reply_id,
      reflectionId: followup.reflection_id,
    },
  });
}

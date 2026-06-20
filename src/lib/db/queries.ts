import { cache } from "react";
import { getSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { MentorProfile, MentorSelection, ReflectionRecord, ReflectionSummary } from "@/types/domain";

type MentorFollowupRow = {
  id: string;
  mentor_name: string;
  question: string;
  answer: string;
  created_at: string;
  mentor_reply_id: string;
  reflection_id: string;
};
import { diffLocalDays, isSameLocalDay, startOfLocalDay } from "@/lib/utils";

export const getCurrentUser = cache(async () => {
  if (!getSupabaseEnv().isConfigured) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getMentorSelection = cache(async (): Promise<MentorSelection | null> => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mentor_selections")
    .select("id, user_id, mentor_names")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    userId: data.user_id,
    mentorNames: data.mentor_names,
  };
});

export const getMentorProfiles = cache(async (): Promise<MentorProfile[]> => {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mentor_profiles")
    .select(
      "id, user_id, mentor_name, distilled_summary, perspective_prompt, communication_style, focus_areas, signature_questions, caution_note, status, distilled_at",
    )
    .eq("user_id", user.id)
    .order("distilled_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    mentorName: item.mentor_name,
    distilledSummary: item.distilled_summary,
    perspectivePrompt: item.perspective_prompt,
    communicationStyle: item.communication_style,
    focusAreas: item.focus_areas,
    signatureQuestions: item.signature_questions,
    cautionNote: item.caution_note,
    status: item.status,
    distilledAt: item.distilled_at,
  }));
});

export async function hasReadyMentorProfiles() {
  const selection = await getMentorSelection();

  if (!selection || selection.mentorNames.length !== 3) {
    return false;
  }

  const profiles = await getMentorProfiles();

  if (profiles.length !== 3) {
    return false;
  }

  const selectedNames = new Set(selection.mentorNames.map((name) => name.toLocaleLowerCase()));
  const profileNames = new Set(profiles.map((profile) => profile.mentorName.toLocaleLowerCase()));

  if (selectedNames.size !== profileNames.size) {
    return false;
  }

  return Array.from(selectedNames).every((name) => profileNames.has(name));
}

export async function getReflectionHistory(): Promise<ReflectionRecord[]> {
  if (!getSupabaseEnv().isConfigured) {
    return [];
  }

  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reflections")
    .select(
      "id, content, summary, source_type, created_at, mentor_replies(id, mentor_name, content, style_note, created_at, mentor_followups(id, mentor_name, question, answer, created_at, mentor_reply_id, reflection_id))",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    content: item.content,
    summary: item.summary,
    sourceType: item.source_type,
    createdAt: item.created_at,
    replies: (item.mentor_replies ?? [])
      .slice()
      .sort(
        (left, right) =>
          new Date(left.created_at).getTime() - new Date(right.created_at).getTime(),
      )
      .map((reply) => ({
        id: reply.id,
        mentorName: reply.mentor_name,
        content: reply.content,
        styleNote: reply.style_note,
        createdAt: reply.created_at,
        reflectionId: item.id,
        followups: ((reply.mentor_followups ?? []) as unknown as MentorFollowupRow[])
          .slice()
          .sort(
            (left, right) =>
              new Date(left.created_at).getTime() - new Date(right.created_at).getTime(),
          )
          .map((followup) => ({
            id: followup.id,
            mentorName: followup.mentor_name,
            question: followup.question,
            answer: followup.answer,
            createdAt: followup.created_at,
            mentorReplyId: followup.mentor_reply_id,
            reflectionId: followup.reflection_id,
          })),
      })),
  }));
}

export async function hasReflectionToday() {
  const history = await getReflectionHistory();

  if (history.length === 0) {
    return false;
  }

  return history.some((item) => isSameLocalDay(item.createdAt, new Date()));
}

export async function getReflectionSummary(): Promise<ReflectionSummary> {
  const history = await getReflectionHistory();

  if (history.length === 0) {
    return {
      totalCount: 0,
      latestReflectionAt: null,
      streakDays: 0,
    };
  }

  const uniqueDays = Array.from(
    new Set(history.map((item) => startOfLocalDay(item.createdAt).toISOString())),
  )
    .map((value) => new Date(value))
    .sort((left, right) => right.getTime() - left.getTime());

  let streakDays = 0;

  for (let index = 0; index < uniqueDays.length; index += 1) {
    const currentDay = uniqueDays[index];

    if (index === 0) {
      const gapToToday = diffLocalDays(new Date(), currentDay);

      if (gapToToday > 1) {
        break;
      }

      streakDays = 1;
      continue;
    }

    const previousDay = uniqueDays[index - 1];
    const gap = diffLocalDays(previousDay, currentDay);

    if (gap === 1) {
      streakDays += 1;
      continue;
    }

    break;
  }

  return {
    totalCount: history.length,
    latestReflectionAt: history[0]?.createdAt ?? null,
    streakDays,
  };
}

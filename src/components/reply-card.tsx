"use client";

import { useState } from "react";
import type { MentorFollowup } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ReplyCardProps = {
  replyId: string;
  reflectionId: string;
  mentorName: string;
  content: string;
  styleNote?: string | null;
  followups?: MentorFollowup[];
};

export function ReplyCard({
  replyId,
  reflectionId,
  mentorName,
  content,
  styleNote,
  followups = [],
}: ReplyCardProps) {
  const [question, setQuestion] = useState("");
  const [items, setItems] = useState(followups);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      setError("请先输入你的追问。");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/mentor-followups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorReplyId: replyId,
          reflectionId,
          mentorName,
          question,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        followup?: MentorFollowup;
      };

      if (!response.ok || !result.followup) {
        throw new Error(result.error || "追问失败，请稍后再试。");
      }

      setItems((current) => [...current, result.followup as MentorFollowup]);
      setQuestion("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "追问失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-slate-950">{mentorName}</h3>
        {styleNote ? (
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            {styleNote}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700">{content}</p>

      <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((followup) => (
              <div key={followup.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  追问
                </p>
                <p className="mt-2 text-sm text-slate-700">{followup.question}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  导师进一步回复
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{followup.answer}</p>
              </div>
            ))}
          </div>
        ) : null}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={`继续追问 ${mentorName}...`}
            className="min-h-24"
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "追问中..." : "继续追问"}
          </Button>
        </form>
      </div>
    </Card>
  );
}

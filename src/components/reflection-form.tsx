"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReflectionRecord } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReplyCard } from "@/components/reply-card";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/utils";

type ReflectionFormProps = {
  mentors: string[];
  initialHistory: ReflectionRecord[];
};

type ReflectionResponse = {
  reflection: ReflectionRecord;
};

export function ReflectionForm({
  mentors,
  initialHistory,
}: ReflectionFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [latestCreated, setLatestCreated] = useState<ReflectionRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const latestReflection = latestCreated ?? initialHistory[0] ?? null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("请先写下今天的复盘内容。");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/reflections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const result = (await response.json()) as ReflectionResponse | { error: string };

      if (!response.ok || !("reflection" in result)) {
        throw new Error("error" in result ? result.error : "提交失败，请稍后再试。");
      }

      setLatestCreated(result.reflection);
      setMessage("复盘提交成功，3 位导师回复已更新。");
      setContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-5">
          <p className="text-sm text-slate-500">今日复盘</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            写下今天的复盘日记
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            提交后会生成 {mentors.length} 条不同导师视角的模拟建议。
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="今天做得好的地方、卡住的地方、一个想改进的决定，都可以写下来。"
          />

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "生成建议中..." : "提交复盘并生成建议"}
          </Button>

          {isSubmitting ? (
            <p className="text-sm text-slate-500">
              正在整理你的复盘，并生成最新的导师镜像建议...
            </p>
          ) : null}
        </form>
      </Card>

      <Card className="bg-slate-950 text-white">
        <p className="text-sm text-slate-300">导师镜像摘要</p>
        <p className="mt-3 text-sm leading-7 text-slate-100">
          当前导师组合：{mentors.join("、")}。下面会按顺序展示你的最新复盘和 3 位导师的回复。
        </p>
      </Card>

      {latestReflection ? (
        <div className="space-y-4">
          <Card className="border-slate-200 bg-slate-50">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">最新一篇复盘</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatDateTime(latestReflection.createdAt)}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs text-slate-500">
                3 位导师回复
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {latestReflection.content}
            </p>
          </Card>

          <div className="space-y-3">
            {latestReflection.replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                replyId={reply.id}
                reflectionId={reply.reflectionId}
                mentorName={reply.mentorName}
                content={reply.content}
                styleNote={reply.styleNote}
                followups={reply.followups}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <p className="text-sm text-slate-500">等待第一篇复盘</p>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            提交后，这里会先显示你的复盘，再依次显示 3 位导师的回复。
          </p>
        </Card>
      )}
    </div>
  );
}

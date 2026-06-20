"use client";

import { useState } from "react";
import type { ReflectionRecord } from "@/types/domain";
import { ReplyCard } from "@/components/reply-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";

type HistoryListProps = {
  initialHistory: ReflectionRecord[];
};

export function HistoryList({ initialHistory }: HistoryListProps) {
  const [history, setHistory] = useState(initialHistory);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(reflectionId: string) {
    const confirmed = window.confirm("确定删除这篇复盘吗？删除后无法恢复。");

    if (!confirmed) {
      return;
    }

    setDeletingId(reflectionId);
    setError(null);

    try {
      const response = await fetch(`/api/reflections/${reflectionId}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "删除失败，请稍后再试。");
      }

      setHistory((current) => current.filter((item) => item.id !== reflectionId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败，请稍后再试。");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {error ? (
        <Card className="border-rose-200 bg-rose-50">
          <p className="text-sm text-rose-700">{error}</p>
        </Card>
      ) : null}

      {history.map((reflection) => (
        <Card key={reflection.id} className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">一篇复盘</h2>
              <p className="mt-1 text-sm text-slate-500">
                {formatDateTime(reflection.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                {reflection.sourceType || "mock"}
              </span>
              <Button
                variant="ghost"
                onClick={() => handleDelete(reflection.id)}
                disabled={deletingId === reflection.id}
                className="px-3 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                {deletingId === reflection.id ? "删除中..." : "删除"}
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {reflection.content}
          </div>

          <div className="space-y-3">
            {reflection.replies.map((reply) => (
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
        </Card>
      ))}
    </div>
  );
}

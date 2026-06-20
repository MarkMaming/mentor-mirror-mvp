"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type DistillStatusProps = {
  mentors: string[];
};

export function DistillStatus({ mentors }: DistillStatusProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleDistill() {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/distill", {
        method: "POST",
      });

      const result = (await response.json()) as {
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "导师镜像蒸馏失败，请稍后再试。");
      }

      setMessage("3 位导师镜像已准备完成，正在进入 Dashboard。");
      router.replace(result.redirectTo || "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "导师镜像蒸馏失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <p className="text-sm text-slate-500">Mentor Distillation</p>
      <h1 className="mt-1 text-3xl font-semibold text-slate-950">
        先为这 3 位公开人物生成导师镜像
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        这一步不会抓取真实资料，也不会调用真实 AI。当前系统会基于公开人物视角，
        为每位导师先生成一份可复用的 mock 镜像档案，再进入后续复盘页面。
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {mentors.map((mentor) => (
          <div
            key={mentor}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-5 text-center"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">mentor</div>
            <div className="mt-2 text-base font-medium text-slate-800">{mentor}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-900">
        生成结果会为每位导师保存不同的：关注重点、表达风格、追问方式、提醒角度。
        后续每次复盘，系统会基于这 3 份镜像分别给出模拟建议，而不是只换名字套同一段话。
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          准备完成后，你会自动进入 Dashboard 开始写第一篇复盘。
        </p>
        <Button onClick={handleDistill} disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "正在生成导师镜像..." : "开始蒸馏这 3 位导师"}
        </Button>
      </div>
    </Card>
  );
}

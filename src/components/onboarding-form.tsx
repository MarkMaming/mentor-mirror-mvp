"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mentorOptions } from "@/lib/data/mentors";

type OnboardingFormProps = {
  initialMentors: string[];
};

function normalizeMentorName(value: string) {
  return value.trim();
}

function countFilledMentors(mentors: string[]) {
  return mentors.filter((mentor) => normalizeMentorName(mentor)).length;
}

function validateMentors(mentors: string[]) {
  const normalized = mentors.map(normalizeMentorName);
  const filled = normalized.filter(Boolean);

  if (filled.length !== 3) {
    return "必须刚好填写 3 位公开人物。";
  }

  const uniqueMentors = new Set(filled.map((item) => item.toLocaleLowerCase()));

  if (uniqueMentors.size !== filled.length) {
    return "3 位导师不能重复，请检查后再保存。";
  }

  return null;
}

export function OnboardingForm({ initialMentors }: OnboardingFormProps) {
  const router = useRouter();
  const [mentorInputs, setMentorInputs] = useState<string[]>([
    initialMentors[0] ?? "",
    initialMentors[1] ?? "",
    initialMentors[2] ?? "",
  ]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filledCount = useMemo(() => countFilledMentors(mentorInputs), [mentorInputs]);

  function updateMentor(index: number, value: string) {
    setError(null);
    setMessage(null);
    setMentorInputs((current) =>
      current.map((mentor, currentIndex) => (currentIndex === index ? value : mentor)),
    );
  }

  function clearMentor(index: number) {
    setError(null);
    setMessage(null);
    setMentorInputs((current) =>
      current.map((mentor, currentIndex) => (currentIndex === index ? "" : mentor)),
    );
  }

  function fillRecommendedMentor(name: string) {
    setError(null);
    setMessage(null);

    const normalizedName = normalizeMentorName(name);
    const normalizedCurrent = mentorInputs.map(normalizeMentorName);

    if (
      normalizedCurrent.some(
        (mentor) => mentor.toLocaleLowerCase() === normalizedName.toLocaleLowerCase(),
      )
    ) {
      setError("这个人物已经填写过了，请选择其他公开人物。");
      return;
    }

    const firstEmptyIndex = normalizedCurrent.findIndex((mentor) => !mentor);

    if (firstEmptyIndex === -1) {
      setError("3 个输入框都已填满，请先删除或修改现有导师。");
      return;
    }

    updateMentor(firstEmptyIndex, name);
  }

  async function handleSubmit() {
    const validationError = validateMentors(mentorInputs);

    if (validationError) {
      setError(validationError);
      return;
    }

    const mentorNames = mentorInputs.map(normalizeMentorName);

    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mentorNames }),
      });

      const result = (await response.json()) as {
        error?: string;
        success?: boolean;
        redirectTo?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "保存失败，请稍后再试。");
      }

      setMessage("导师已保存，接下来会重新生成这 3 位导师的镜像。");
      router.replace(result.redirectTo || "/distill");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <p className="text-sm text-slate-500">Onboarding</p>
        <h1 className="mt-1 text-3xl font-semibold text-slate-950">
          输入或选择 3 位公开人物
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          你可以随时回到这里调整导师。修改并保存后，系统会重新蒸馏这 3 位导师镜像。
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {mentorInputs.map((mentor, index) => (
          <div
            key={`mentor-input-${index + 1}`}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">导师 {index + 1}</span>
              {normalizeMentorName(mentor) ? (
                <button
                  type="button"
                  onClick={() => clearMentor(index)}
                  className="text-xs text-slate-500 transition hover:text-slate-800"
                >
                  删除
                </button>
              ) : null}
            </div>
            <Input
              value={mentor}
              onChange={(event) => updateMentor(index, event.target.value)}
              placeholder={`输入第 ${index + 1} 位公开人物姓名`}
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-slate-700">
            推荐人物，可点击快速填入
          </h2>
          <p className="text-sm text-slate-500">
            当前推荐列表里的所有导师，都已升级为高质量蒸馏版本。
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mentorOptions.map((mentor) => (
            <button
              key={mentor}
              type="button"
              onClick={() => fillRecommendedMentor(mentor)}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-5 text-left text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="text-sm text-slate-500">公开人物</div>
              <div className="mt-2 text-lg font-medium">{mentor}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">当前已填写 {filledCount}/3</p>
          <p className="mt-1 text-sm text-slate-700">
            {mentorInputs.map(normalizeMentorName).filter(Boolean).join("、") || "尚未填写"}
          </p>
          {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="mt-2 text-sm text-emerald-600">{message}</p> : null}
        </div>

        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full lg:w-auto">
          {isSubmitting ? "保存中..." : "保存并重新蒸馏导师"}
        </Button>
      </div>
    </Card>
  );
}

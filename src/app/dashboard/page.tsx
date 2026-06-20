import Link from "next/link";
import { redirect } from "next/navigation";
import { MentorList } from "@/components/mentor-list";
import { ReflectionForm } from "@/components/reflection-form";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import {
  getCurrentUser,
  getMentorSelection,
  hasReadyMentorProfiles,
  getReflectionHistory,
  getReflectionSummary,
  hasReflectionToday,
} from "@/lib/db/queries";
import { getSupabaseEnv } from "@/lib/env";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { isConfigured } = getSupabaseEnv();

  if (!isConfigured) {
    return (
      <main className="min-h-screen bg-slate-50">
        <SiteHeader />
        <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10">
          <Card>
            <h1 className="text-2xl font-semibold text-slate-950">
              Dashboard 需要先完成 Supabase 配置
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              你可以先浏览首页与认证页；填写 `.env.local` 并执行 migration 后，这里就能完整跑通。
            </p>
          </Card>
        </div>
      </main>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?next=/dashboard");
  }

  const selection = await getMentorSelection();

  if (!selection || selection.mentorNames.length !== 3) {
    redirect("/onboarding");
  }

  const hasProfiles = await hasReadyMentorProfiles();

  if (!hasProfiles) {
    redirect("/distill");
  }

  const history = await getReflectionHistory();
  const wroteToday = await hasReflectionToday();
  const summary = await getReflectionSummary();

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Dashboard</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">
              今天和你的导师镜像一起复盘
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {history.length > 0
                ? `你已经累计写了 ${history.length} 篇复盘，最新建议会实时显示在右侧。`
                : "你还没有写过复盘，先从今天的第一篇开始。"}
            </p>
          </div>
          <Link
            href="/history"
            className="text-sm text-slate-600 underline-offset-4 hover:underline"
          >
            查看历史记录
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">累计复盘次数</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {summary.totalCount}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {summary.totalCount > 0
                ? "每一篇复盘都会进入你的历史记录。"
                : "还没有复盘记录，写下第一篇后这里会更新。"}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-500">最近一次复盘时间</p>
            <p className="mt-3 text-xl font-semibold text-slate-950">
              {summary.latestReflectionAt
                ? formatDateTime(summary.latestReflectionAt)
                : "还没有复盘记录"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {summary.latestReflectionAt
                ? "你最近一次提交的复盘时间。"
                : "完成第一篇复盘后，这里会显示最新时间。"}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-slate-500">连续复盘天数</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {summary.streakDays}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {summary.streakDays > 0
                ? "按自然日连续计算，帮助你保持复盘节奏。"
                : "从今天开始写第一篇，也能慢慢积累 streak。"}
            </p>
          </Card>
        </div>

        {wroteToday ? (
          <Card className="border-emerald-200 bg-emerald-50">
            <p className="text-sm leading-7 text-emerald-800">
              你今天已经完成过一次复盘，也可以继续补充。
            </p>
          </Card>
        ) : (
          <Card className="border-sky-200 bg-sky-50">
            <p className="text-sm leading-7 text-sky-800">
              今天还没有复盘记录。现在写下第一篇，系统会立即生成 3 条导师镜像建议。
            </p>
          </Card>
        )}

        <MentorList mentors={selection.mentorNames} />
        <ReflectionForm mentors={selection.mentorNames} initialHistory={history} />
      </div>
    </main>
  );
}

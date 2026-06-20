import Link from "next/link";
import { redirect } from "next/navigation";
import { HistoryList } from "@/components/history-list";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import {
  getCurrentUser,
  getMentorSelection,
  getReflectionHistory,
  hasReadyMentorProfiles,
} from "@/lib/db/queries";
import { getSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const { isConfigured } = getSupabaseEnv();

  if (!isConfigured) {
    return (
      <main className="min-h-screen bg-slate-50">
        <SiteHeader />
        <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10">
          <Card>
            <h1 className="text-2xl font-semibold text-slate-950">
              History 需要先完成 Supabase 配置
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              配置好 `.env.local` 并完成 migration 后，这里才会显示真实历史数据。
            </p>
          </Card>
        </div>
      </main>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?next=/history");
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

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">History</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">
              历史复盘记录
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              当前导师镜像：{selection.mentorNames.join("、")}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-slate-600 underline-offset-4 hover:underline"
          >
            返回 Dashboard
          </Link>
        </div>

        {history.length > 0 ? (
          <>
            <Card className="border-slate-200 bg-white">
              <p className="text-sm leading-7 text-slate-600">
                这里按时间倒序展示你的复盘、导师回复，以及后续追问记录。
              </p>
            </Card>
            <HistoryList initialHistory={history} />
          </>
        ) : (
          <Card className="p-8 sm:p-10">
            <p className="text-sm text-slate-500">暂无历史</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              你还没有写过第一篇复盘
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              去 Dashboard 写下今天的第一篇复盘后，这里就会按时间倒序显示你的历史记录和对应建议。
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                去 Dashboard 写第一篇复盘
              </Link>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}

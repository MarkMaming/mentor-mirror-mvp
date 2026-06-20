import { redirect } from "next/navigation";
import { DistillStatus } from "@/components/distill-status";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import {
  getCurrentUser,
  getMentorProfiles,
  getMentorSelection,
} from "@/lib/db/queries";
import { getSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function DistillPage() {
  const { isConfigured } = getSupabaseEnv();

  if (!isConfigured) {
    return (
      <main className="min-h-screen bg-slate-50">
        <SiteHeader />
        <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10">
          <Card>
            <h1 className="text-2xl font-semibold text-slate-950">
              Distill 需要先完成 Supabase 配置
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              配置好 `.env.local` 并完成 migration 后，这里才能生成导师镜像。
            </p>
          </Card>
        </div>
      </main>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?next=/distill");
  }

  const selection = await getMentorSelection();

  if (!selection || selection.mentorNames.length !== 3) {
    redirect("/onboarding");
  }

  const profiles = await getMentorProfiles();

  if (profiles.length === 3) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10">
        <DistillStatus mentors={selection.mentorNames} />
      </div>
    </main>
  );
}

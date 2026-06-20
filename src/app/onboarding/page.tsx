import { OnboardingForm } from "@/components/onboarding-form";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getMentorSelection } from "@/lib/db/queries";
import { getSupabaseEnv } from "@/lib/env";

export default async function OnboardingPage() {
  const { isConfigured } = getSupabaseEnv();
  const selection = await getMentorSelection();

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
        {isConfigured ? (
          <OnboardingForm initialMentors={selection?.mentorNames ?? []} />
        ) : (
          <Card className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold text-slate-950">
              还不能进入 Onboarding
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              需要先配置 Supabase 环境变量并完成数据库 migration，才能保存你的导师选择。
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}

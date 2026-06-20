import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

type AuthPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { isConfigured } = getSupabaseEnv();
  const params = (await searchParams) ?? {};
  const signedOut = params.signed_out === "1";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)]">
      <SiteHeader />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="self-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Auth
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            登录后，开始创建你的人生导师镜像
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            先完成注册或登录，再进入导师选择和每日复盘流程。MVP 阶段使用 Supabase Auth，后续可以继续扩展为更完整的身份体系。
          </p>

          {!isConfigured ? (
            <Card className="mt-8 border-amber-200 bg-amber-50">
              <p className="text-sm leading-7 text-amber-900">
                当前还未配置 Supabase 环境变量。页面可以先打开，但注册、登录、保存数据等功能需要在 `.env.local` 中填写 Supabase 配置后才能使用。
              </p>
            </Card>
          ) : (
            <Card className="mt-8 border-slate-200 bg-white">
              <p className="text-sm leading-7 text-slate-600">
                如果你的 Supabase 项目开启了邮箱确认，注册后需要先到邮箱中点击确认链接，再返回这里登录。
              </p>
            </Card>
          )}
        </div>

        <div className="self-center">
          <Suspense
            fallback={
              <Card className="mx-auto w-full max-w-md p-8 text-sm text-slate-500">
                加载认证表单中...
              </Card>
            }
          >
            <AuthForm signedOut={signedOut} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

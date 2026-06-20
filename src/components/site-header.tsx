import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/env";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  let user:
    | {
        id: string;
        email?: string;
      }
    | null = null;

  if (getSupabaseEnv().isConfigured) {
    const supabase = await createClient();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    user = currentUser;
  }

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-base font-semibold text-slate-950">
            人生导师镜像
          </Link>
          {user ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              已登录 {user.email || "当前用户"}
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
              未登录
            </span>
          )}
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link href="/dashboard" className="px-3 py-2 text-sm text-slate-600">
            Dashboard
          </Link>
          <Link href="/history" className="px-3 py-2 text-sm text-slate-600">
            History
          </Link>
          <Link href="/onboarding" className="px-3 py-2 text-sm text-slate-600">
            Onboarding
          </Link>
          {user ? (
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="secondary" className="px-4 py-2">
                退出登录
              </Button>
            </form>
          ) : (
            <Link href="/auth">
              <Button className="px-4 py-2">登录</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

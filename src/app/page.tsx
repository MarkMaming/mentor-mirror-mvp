import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(172,208,255,0.35),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)]">
      <SiteHeader />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(54,84,130,0.12)] backdrop-blur md:p-12">
          <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            基于公开人物视角的模拟建议，不冒充真实本人
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            人生导师镜像
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            选择三位你认可的公开人物，建立属于你的导师镜像。每天写下复盘日记，系统会生成三条不同视角的模拟建议，帮助你整理情绪、决策与行动。
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-medium !text-white transition hover:bg-slate-800"
            >
              开始创建我的导师镜像
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              进入 Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

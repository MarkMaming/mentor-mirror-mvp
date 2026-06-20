# 人生导师镜像 MVP

一个基于 `Next.js + TypeScript + Tailwind CSS + Supabase` 的最小可运行 MVP，用于让用户选择 3 位公开人物作为“导师镜像”，并围绕每日复盘生成 3 条“基于公开人物视角的模拟建议”。

## 当前范围

- 首页
- Supabase Auth 登录/注册
- Onboarding 选择 3 位导师
- Dashboard 提交每日复盘并生成 3 条 mock 回复
- History 查看历史复盘与回复
- Supabase Postgres schema 与 RLS policy

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres

## 环境变量

复制 `.env.example` 为 `.env.local`，并填写你自己的 Supabase 项目配置：

```powershell
Copy-Item .env.example .env.local
```

需要的变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`：可选，如果你项目里使用新版命名可以填写这里；未填写时会回退到 `ANON_KEY`

## 本地运行

### 1. 安装依赖

```powershell
npm install
```

### 2. 配置 `.env.local`

在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

说明：

- 如果你的 Supabase 控制台只提供 `anon key`，填写 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 即可
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 这项可以留空

### 3. 运行 migration

方式 A：使用 Supabase CLI

```powershell
npm install -g supabase
supabase login
supabase link --project-ref 你的-project-ref
supabase db push
```

方式 B：手动执行 SQL

- 打开 Supabase 控制台
- 进入 SQL Editor
- 执行 [supabase/migrations/0001_init.sql](C:/Users/FZLLZ/Documents/日常/mentor-mirror-mvp/supabase/migrations/0001_init.sql)

### 4. 启动本地项目

```powershell
npm run dev
```

默认访问：

- [http://localhost:3000](http://localhost:3000)

## 验证方式

- 访问 `/` 确认首页正常渲染
- 访问 `/auth` 确认登录/注册页正常显示
- 登录后依次测试 `/onboarding`、`/dashboard`、`/history`
- 执行 `npm run lint`
- 执行 `npm run build`

## 后续扩展预留

- `pgvector`
- RAG 检索层
- 真实 AI 回复服务
- 更完整的用户资料和导师素材管理

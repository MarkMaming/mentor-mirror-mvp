# 人生导师镜像 MVP

一个基于 `Next.js + TypeScript + Tailwind CSS + Supabase` 的 MVP 项目。

它的核心流程是：
- 用户注册 / 登录
- 选择 3 位公开人物作为“导师镜像”
- 先蒸馏导师镜像
- 每天写复盘
- 获得 3 位导师视角的模拟建议
- 可以继续追问
- 可以查看历史复盘、删除不满意的复盘

## 当前功能

- 首页
- 登录 / 注册
- Onboarding 选择或输入 3 位公开人物
- 导师镜像蒸馏页
- Dashboard 提交复盘
- 3 位导师回复
- 每位导师下继续追问
- History 查看历史记录
- 删除历史复盘
- Supabase Auth
- Supabase Postgres
- RLS policy

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres

## 本地开发

### 1. 安装依赖

```powershell
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```powershell
Copy-Item .env.example .env.local
```

然后填写你自己的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

说明：
- 如果你只有 `anon key`，也可以只填 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `.env.local` 不要上传到公开 GitHub

### 3. 运行数据库 migration

当前需要执行这些 SQL：

- [0001_init.sql](./supabase/migrations/0001_init.sql)
- [0002_mentor_profiles.sql](./supabase/migrations/0002_mentor_profiles.sql)
- [0004_mentor_followups.sql](./supabase/migrations/0004_mentor_followups.sql)

最简单方式：

1. 打开 Supabase 控制台
2. 进入 `SQL Editor`
3. 依次执行以上 3 个文件内容

### 4. 启动项目

```powershell
npm run dev
```

访问：

- [http://localhost:3000](http://localhost:3000)

## 验证

```powershell
npm run lint
npm run build
```

## 项目备份与恢复

这个项目要完整保住，需要同时保住 3 部分：

### 1. 代码仓库

GitHub 仓库：

- [MarkMaming/mentor-mirror-mvp](https://github.com/MarkMaming/mentor-mirror-mvp)

### 2. Supabase 项目

不要删除当前 Supabase project。

它保存了：
- 用户账号
- 数据库数据
- 复盘记录
- 导师镜像
- 追问记录

### 3. `.env.local`

你必须单独备份 `.env.local` 里的环境变量，至少包括：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

建议保存到：
- 私密网盘
- 密码管理器
- 私密笔记

## 换电脑后的恢复步骤

### 1. 克隆代码

```powershell
git clone https://github.com/MarkMaming/mentor-mirror-mvp.git
cd mentor-mirror-mvp
```

### 2. 安装依赖

```powershell
npm install
```

### 3. 新建 `.env.local`

把之前备份的环境变量填回去。

### 4. 启动项目

```powershell
npm run dev
```

### 5. 如果你换了新的 Supabase 项目

那就要重新去 Supabase SQL Editor 执行：

- `0001_init.sql`
- `0002_mentor_profiles.sql`
- `0004_mentor_followups.sql`

## 当前高质量蒸馏说明

目前推荐列表中的导师，已经做成高质量 mock 蒸馏版本。

这不是实时抓资料的自动蒸馏，而是：
- 基于公开形象
- 结构化整理价值观、决策规则、风险偏好
- 再生成导师风格回复

当前已经支持：
- 更高质量的导师回复
- 每位导师下继续追问

## 后续可扩展

- 接入真实 AI API
- 接入真实人物资料蒸馏链
- 引入 RAG / pgvector
- 为导师建立更强的资料来源系统
- 多轮追问记忆增强

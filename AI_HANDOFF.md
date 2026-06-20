# 人生导师镜像 - AI 交接文档

本文档用于让新的 AI 助手快速接手本项目，避免依赖历史对话记录。

## 1. 项目基本信息

- 项目名：`人生导师镜像`
- 本地目录：`C:\Users\FZLLZ\Documents\日常\mentor-mirror-mvp`
- GitHub 仓库：`https://github.com/MarkMaming/mentor-mirror-mvp`
- 线上地址：`https://mentor-mirror-mvp.vercel.app`
- 技术栈：
  - `Next.js 16 + TypeScript`
  - `Tailwind CSS`
  - `Supabase Auth + Postgres`
  - 预留 RAG / pgvector 接口，但当前未接入真实 AI

## 2. 当前产品状态

本项目已经可以正常使用，且已部署到 Vercel。

当前主要流程：
- 首页可访问
- 用户可注册 / 登录 / 退出
- Onboarding 可输入或选择 3 位公开人物
- 选择导师后会进入 distill 流程
- Dashboard 可写复盘并生成 3 条导师回复
- 每位导师回复下可继续追问
- History 可查看历史复盘与回复，并支持删除复盘

## 3. 重要说明

- 当前“蒸馏”不是自动联网抓取，也不是真实 AI 蒸馏链。
- 当前使用的是**高质量 mock 蒸馏**：
  - 基于公开人物风格、价值排序、表达习惯、判断方式
  - 手工构造 persona seed
  - 再通过 mock 生成逻辑输出回复与追问
- 产品文案必须保持这个边界：
  - 使用“基于公开人物视角的模拟建议”
  - 不假装是真人本人发言

## 4. 部署与环境状态

### Vercel

- 已完成部署
- 线上域名：`https://mentor-mirror-mvp.vercel.app`
- 已配置环境变量：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Supabase

当前 Supabase 项目：
- `Project ID`: `ohffagjxxudsodroauhk`
- `Project URL`: `https://ohffagjxxudsodroauhk.supabase.co`

Auth URL Configuration 已配置为：

- `Site URL`
  - `https://mentor-mirror-mvp.vercel.app`

- `Redirect URLs`
  - `http://localhost:3000/**`
  - `https://mentor-mirror-mvp.vercel.app/**`

## 5. 数据库 migration 状态

项目内已有 migration 文件：

- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_mentor_profiles.sql`
- `supabase/migrations/0004_mentor_followups.sql`

根据用户此前操作确认：
- `0001` 已执行
- `0002` 已执行
- `0004` 用户已被引导执行，且功能后续可正常使用时应视为已执行

若后续 AI 怀疑数据库缺字段，优先检查这 3 个 migration 是否和线上结构一致。

## 6. 当前推荐导师

推荐人物列表当前包括：

- 稻盛和夫
- 查理·芒格
- 奥普拉·温弗瑞
- 埃隆·马斯克
- 杨绛
- 李开复
- 史蒂夫·乔布斯
- 曾国藩
- 纳瓦尔
- 武志红
- 梁永安
- 蔡康永

说明：
- `王阳明 / 德鲁克 / Marie Curie` 已从推荐列表删除
- 已改为 `武志红 / 梁永安 / 蔡康永`

## 7. 当前蒸馏与回复质量状态

已做过以下增强：

- 三位高质量角色曾先做过重点升级：
  - 查理·芒格
  - 埃隆·马斯克
  - 纳瓦尔
- 后续又把推荐列表中的所有导师统一升级为高质量 mock 蒸馏
- 最近又对**所有导师**增加了更像真人说话的：
  - 专属回复口吻
  - 专属追问口吻

但用户最新反馈仍然是：
- 当前蒸馏质量“仍然不够”
- 用户希望未来继续提升“画像深度”和“非模板化程度”

这意味着后续优化重点应放在：
- 更深入的人物 dossier
- 更细的主题分叉
- 更强的多轮对话连续性

而不是继续做 UI 小修小补。

## 8. 关键文件

后续 AI 优先阅读这些文件：

- `README.md`
- `src/lib/mock/mentor-replies.ts`
- `src/lib/data/mentors.ts`
- `src/components/onboarding-form.tsx`
- `src/components/reflection-form.tsx`
- `src/components/reply-card.tsx`
- `src/components/history-list.tsx`
- `src/lib/db/queries.ts`
- `src/types/domain.ts`
- `src/types/database.ts`
- `src/app/api/reflections/route.ts`
- `src/app/api/reflections/[id]/route.ts`
- `src/app/api/mentor-followups/route.ts`
- `src/app/api/distill/route.ts`

## 9. 用户偏好

这个非常重要，新 AI 应继承：

- 所有输出都用中文
- 不喜欢长篇铺垫和废话
- 喜欢“直接说结论”
- 改代码前先说会改哪些文件
- 要保持最小改动，不大改项目结构
- 修改后说明验证方式
- 不要接真实 AI、不要做 RAG、不要做爬虫，除非用户明确要求改变方向
- 用户非常在意“蒸馏质量”和“像真人说话”

## 10. 已完成的重要体验改动

- 首页 CTA 可读性已修正
- 登录 / 注册错误提示已增强
- 邮箱确认流程已接通
- Onboarding 支持：
  - 手动输入 3 位公开人物
  - 推荐人物快捷填入
  - 删除已填导师
- 如果用户未完成导师选择，会自动引导
- Onboarding 保存成功跳转 Dashboard
- Dashboard / History 支持：
  - 空状态
  - 加载状态
  - 成功提示
  - 错误提示
- Dashboard 有“今天已复盘”提醒
- Dashboard 顶部有摘要区：
  - 累计复盘次数
  - 最近复盘时间
  - streak
- 回复区排版已由左右布局改为更紧凑布局
- History 支持删除复盘
- 每位导师回复下支持继续追问

## 11. 本地运行方式

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run start
```

说明：
- 本地开发时必须开着终端，是因为 `next dev` 需要进程常驻
- 现在项目已部署到 Vercel，线上访问不再依赖本地终端

## 12. 后续最值得做的方向

按优先级建议：

1. 提升蒸馏质量
- 把 persona seed 升级成更完整 dossier
- 每位导师按主题拆分：
  - 工作
  - 关系
  - 情绪
  - 金钱
  - 自我成长

2. 提升追问质量
- 让追问能引用上一轮回复重点
- 让导师对话更连贯，而不是每轮都像重新开始

3. 做“蒸馏状态可视化”
- 显示导师当前画像构建程度
- 让用户理解“为什么这位导师会这样回答”

4. 未来再考虑接真实 AI
- 当前阶段不建议贸然接入
- 先把 dossier 结构和 mock 架构打磨好

## 13. 交接结论

如果新的 AI 要继续工作，最推荐的接手顺序是：

1. 先读本文件
2. 再读 `README.md`
3. 再读 `src/lib/mock/mentor-replies.ts`
4. 然后根据用户最新需求做最小改动


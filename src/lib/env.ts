import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

if (!parsedEnv.success) {
  console.warn("Supabase 环境变量尚未完整配置，相关页面在运行时会提示。");
}

function getSupabaseKey() {
  const env = parsedEnv.success ? parsedEnv.data : process.env;

  return (
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  );
}

export function getSupabaseEnv() {
  const url =
    parsedEnv.success
      ? parsedEnv.data.NEXT_PUBLIC_SUPABASE_URL
      : process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  return {
    url,
    publishableKey: getSupabaseKey(),
    isConfigured: Boolean(url && getSupabaseKey()),
  };
}

export function requireSupabaseEnv() {
  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    throw new Error(
      "Supabase 环境变量未配置。请检查 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。",
    );
  }

  return env;
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  signedOut?: boolean;
};

function getAuthErrorMessage(error: { message?: string } | Error) {
  const message = "message" in error ? error.message || "" : "";

  if (message.includes("Email not confirmed")) {
    return "邮箱尚未确认。请先检查收件箱并完成邮箱确认，再回来登录。";
  }

  if (message.includes("Invalid login credentials")) {
    return "邮箱或密码不正确，请检查后重试。";
  }

  if (message.includes("User already registered")) {
    return "这个邮箱已经注册过了，你可以直接登录。";
  }

  if (message.includes("Password should be at least")) {
    return "密码长度不足，请至少输入 6 位。";
  }

  if (message) {
    return `认证失败：${message}`;
  }

  return "认证失败，请稍后再试。";
}

export function AuthForm({ signedOut = false }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/onboarding";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(
    signedOut ? "你已安全退出登录。" : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || undefined,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.user && !data.session) {
          setMessage("注册成功。请检查邮箱并完成确认，确认后再回来登录。");
        } else {
          setMessage("注册成功，正在为你跳转到导师设置页面。");
          router.replace("/onboarding");
          router.refresh();
        }

        setMode("login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        setMessage("登录成功，正在进入你的人生导师镜像空间。");
        router.replace(nextPath);
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error ? getAuthErrorMessage(err) : "认证失败，请稍后再试。",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md p-8">
      <div className="mb-6 flex rounded-full bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError(null);
          }}
          className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
            mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
          }`}
        >
          登录
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError(null);
          }}
          className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
            mode === "register" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
          }`}
        >
          注册
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <label className="block space-y-2">
            <span className="text-sm text-slate-600">显示名称</span>
            <Input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="例如：Mark"
            />
          </label>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm text-slate-600">邮箱</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-slate-600">密码</span>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="至少 6 位"
            minLength={6}
            required
          />
        </label>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-600">{message}</p> : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : mode === "login" ? "登录并继续" : "创建账号"}
        </Button>
      </form>
    </Card>
  );
}

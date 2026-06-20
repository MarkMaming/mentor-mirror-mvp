import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人生导师镜像",
  description: "选择三位公开人物，获得基于公开人物视角的模拟建议。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}

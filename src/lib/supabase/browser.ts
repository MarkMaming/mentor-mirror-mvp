"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { requireSupabaseEnv } from "@/lib/env";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (browserClient) {
    return browserClient;
  }

  const { url, publishableKey } = requireSupabaseEnv();

  browserClient = createBrowserClient<Database>(url, publishableKey);
  return browserClient;
}

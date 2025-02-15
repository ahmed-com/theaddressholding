"use client";

import { AuthProvider } from "@/hooks/useAuth";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

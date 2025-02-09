"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";

export function GlobalHeader() {
  const { user } = useAuth();

  return (
    <header className="w-full">
      <nav className="w-full flex justify-between p-4">
        {user && user.role === "ADMIN" ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <div></div>
        )}
        <Link href="/" className="text-5xl">The Address Holding</Link>
        {user ? <UserAvatar user={user} /> : <Link href="/login">Login</Link>}
      </nav>
    </header>
  );
}

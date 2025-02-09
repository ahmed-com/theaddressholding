"use client";

import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}

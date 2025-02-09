"use client";

import { CreateApartmentForm } from "@/components/create-apartment-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/login");
    return null;
  }

  if (user.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateApartmentForm />
      </div>
    </div>
  );
}

"use client";

import { Card } from "@/components/ui/card";

export default function GlobalError() {
  return (
    <Card className="flex h-60">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 first-letter:capitalize">
          Something went wrong
        </h2>
        <p className="text-gray-600 text-sm">Please try again later</p>
      </div>
    </Card>
  );
}

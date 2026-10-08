"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getStoredSession } from "@/lib/session";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = getStoredSession();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="rounded-xl border bg-background px-6 py-4 text-sm text-muted-foreground">
          যাচাই করা হচ্ছে...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sprout } from "lucide-react";

import { getStoredSession } from "@/lib/session";

type StoredSession = ReturnType<typeof getStoredSession>;

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Keep the initial server and client render identical.
  const [session, setSession] = useState<StoredSession>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    try {
      const storedSession = getStoredSession();

      if (!isMounted) return;

      setSession(storedSession);
      setIsChecking(false);

      if (!storedSession) {
        router.replace("/login");
        return;
      }

      // Only admins can access /admin.
      if (storedSession.user?.role !== "admin") {
        router.replace("/");
      }
    } catch (error) {
      console.error("Failed to read stored session:", error);

      if (!isMounted) return;

      setSession(null);
      setIsChecking(false);
      router.replace("/login");
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  // Render the same loading UI during SSR and the first client render.
  if (isChecking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
          >
            <Sprout className="size-7" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm font-medium text-foreground"
          >
            লগইন যাচাই করা হচ্ছে...
          </motion.p>

          <div className="mt-3 flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="size-1.5 rounded-full bg-emerald-600"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </main>
    );
  }

  // Do not render protected content for unauthorized users.
  if (!session || session.user?.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="flex flex-col items-center gap-3 text-center">
          <ShieldCheck className="size-8 text-emerald-600" />
          <p className="text-sm text-muted-foreground">
            অনুমতি যাচাই করা হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  // Authorized admin.
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sprout } from "lucide-react";

import { getStoredSession } from "@/lib/session";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = getStoredSession();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }

    // Only admin can access /admin
    if (session.user?.role !== "admin") {
      router.replace("/");
    }
  }, [router, session]);

  /*
   * Not logged in or not admin
   */
  if (
    !session ||
    session.user?.role !== "admin"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Animated icon */}
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
            {session ? (
              <ShieldCheck className="size-7" />
            ) : (
              <Sprout className="size-7" />
            )}
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm font-medium text-foreground"
          >
            {session
              ? "অ্যাক্সেস যাচাই করা হচ্ছে..."
              : "লগইন যাচাই করা হচ্ছে..."}
          </motion.p>

          {/* Animated dots */}
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

  /*
   * Authorized admin
   */
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

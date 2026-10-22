
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  Sprout,
} from "lucide-react";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStoredSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getStoredSession();

    if (!session) return;

    if (session.user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
  }, [router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      email: String(formData.get("email") || "")
        .trim()
        .toLowerCase(),
      password: String(formData.get("password") || ""),
    };

    if (!payload.email || !payload.password) {
      setError("ইমেইল এবং পাসওয়ার্ড প্রদান করুন।");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
        );
      }

      const user = result.data?.user;
      const token = result.data?.token;

      if (
        !user ||
        !token ||
        typeof user.email !== "string" ||
        (user.role !== "admin" && user.role !== "user")
      ) {
        throw new Error(
          "লগইন response সঠিক নয়। আবার চেষ্টা করুন।",
        );
      }

      // Save the same session format used by ProtectedRoute.
      localStorage.setItem("mah-garden-token", token);
      localStorage.setItem(
        "mah-garden-user",
        JSON.stringify(user),
      );

      await Swal.fire({
        icon: "success",
        title: "লগইন সফল!",
        text:
          user.role === "admin"
            ? "অ্যাডমিন ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে..."
            : "স্বাগতম! হোম পেজে নিয়ে যাওয়া হচ্ছে।",
        timer: 1200,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Replace the login history entry with the destination.
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }

      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

      setError(message);

      await Swal.fire({
        icon: "error",
        title: "লগইন ব্যর্থ!",
        text: message,
        confirmButtonText: "আবার চেষ্টা করুন",
        confirmButtonColor: "#16a34a",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          হোমে ফিরুন
        </Link>

        <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-emerald-500/5 sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Sprout className="size-6" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              লগইন
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "সাইন ইন হচ্ছে..." : "লগইন"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:underline"
            >
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

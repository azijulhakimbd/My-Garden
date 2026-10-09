
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  Sprout,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStoredSession } from "@/lib/session";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getStoredSession();

    if (!session) return;

    // Admin → Admin dashboard
    if (session.user?.role === "admin") {
      router.replace("/admin");
      return;
    }

    // Normal user → Home
    router.replace("/");
  }, [router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "")
        .trim()
        .toLowerCase(),
      password: String(formData.get("password") || ""),
    };

    // Client-side validation
    if (!payload.name) {
      setError("আপনার নাম লিখুন।");
      setLoading(false);
      return;
    }

    if (!payload.email) {
      setError("আপনার ইমেইল লিখুন।");
      setLoading(false);
      return;
    }

    if (payload.password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Registration failed.",
        );
      }

      /*
       * Backend MUST create every public registration
       * with role: "user".
       */
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "mah-garden-token",
          result.data.token,
        );

        localStorage.setItem(
          "mah-garden-user",
          JSON.stringify(result.data.user),
        );
      }

      /*
       * New users are NOT admins.
       * Therefore never redirect registration to /admin.
       */
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "রেজিস্টার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
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
          {/* Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Sprout className="size-6" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              রেজিস্টার
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              আপনার বাগান অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                পূর্ণ নাম
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="আপনার নাম"
                  className="pl-10"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                ইমেইল
              </Label>

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

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                পাসওয়ার্ড
              </Label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <p className="text-xs text-muted-foreground">
                কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড ব্যবহার করুন।
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "রেজিস্টার হচ্ছে..."
                : "রেজিস্টার করুন"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

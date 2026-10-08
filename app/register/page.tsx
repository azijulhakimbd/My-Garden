"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, Sprout, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStoredSession } from "@/lib/session";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getStoredSession()) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
    };

    if (payload.password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("mah-garden-token", result.data.token);
        localStorage.setItem(
          "mah-garden-user",
          JSON.stringify(result.data.user),
        );
      }

      router.push("/admin");
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
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Sprout className="size-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">রেজিস্টার</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              আপনার বাগান অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">পূর্ণ নাম</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="আপনার নাম"
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
                  minLength={6}
                  required
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার করুন"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

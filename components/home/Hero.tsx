"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Droplets,
  Leaf,
  Sparkles,
  Sun,
  TreePine,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const plants = [
  {
    name: "আম গাছ",
    status: "সুস্থ",
    icon: "🥭",
    color: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    name: "গোলাপ",
    status: "ফুল ফুটছে",
    icon: "🌹",
    color: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    name: "তুলসী",
    status: "পানি প্রয়োজন",
    icon: "🌿",
    color: "bg-emerald-50 dark:bg-emerald-500/10",
  },
];

export function Hero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf6] dark:bg-slate-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 size-[500px] rounded-full bg-emerald-300/20 blur-[120px] dark:bg-emerald-500/10" />

        <div className="absolute -right-40 top-20 size-[500px] rounded-full bg-lime-300/20 blur-[120px] dark:bg-lime-500/10" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#064e3b 1px, transparent 1px), linear-gradient(90deg, #064e3b 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40 lg:px-8 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left */}
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-6 gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-4 py-2 text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <Sparkles className="size-3.5" />
              আমার ব্যক্তিগত ডিজিটাল বাগান
            </Badge>

            <h1 className="text-balance text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[80px] dark:text-white">
              আমার বাগানকে
              <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text p-2 text-transparent">
                আরও সুন্দরভাবে জানুন।
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              আমার প্রতিটি গাছের তথ্য সংরক্ষণ করুন, প্রয়োজনীয় পরিচর্যার কথা
              মনে রাখুন, বাগানের প্রয়োজন বুঝুন এবং সময়ের সাথে গাছের বেড়ে ওঠা
              পর্যবেক্ষণ করুন—সবকিছু একটি সুন্দর বাগান ড্যাশবোর্ড থেকে।
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/garden"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-xl shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                আমার বাগান দেখুন
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/plants"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Leaf className="mr-2 size-4 text-emerald-600" />
                গাছপালা দেখুন
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                গাছের তথ্য সংরক্ষণ
              </span>

              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                পরিচর্যার অনুস্মারক
              </span>

              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                বাগানের তথ্য বিশ্লেষণ
              </span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-emerald-400/20 blur-[80px] dark:bg-emerald-500/10" />

            {/* Main Dashboard */}
            <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    বাগানের সারসংক্ষেপ
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
                    শুভ সকাল 🌱
                  </h2>
                </div>

                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                  <Sun className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatCard
                  icon={<TreePine className="size-4" />}
                  value="২৪"
                  label="গাছ"
                />

                <StatCard
                  icon={<Droplets className="size-4" />}
                  value="৪"
                  label="পানি দেওয়া"
                />

                <StatCard
                  icon={<Leaf className="size-4" />}
                  value="৮৬%"
                  label="সুস্থতা"
                />
              </div>

              {/* Garden Health */}
              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      বাগানের সুস্থতা
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      এই সপ্তাহে বাগান ভালো আছে
                    </p>
                  </div>

                  <span className="text-xl font-bold text-emerald-600">
                    ৮৬%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-600 to-lime-500" />
                </div>
              </div>

              {/* Tasks */}
              <div className="mt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    আজকের বাগানের কাজ
                  </p>

                  <Link
                    href="/tasks"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    সব দেখুন
                  </Link>
                </div>

                <div className="space-y-2">
                  <Task
                    icon={<Droplets className="size-4" />}
                    title="আম গাছে পানি দিন"
                    time="আজ · সকাল ৮:০০"
                  />

                  <Task
                    icon={<Leaf className="size-4" />}
                    title="টমেটো গাছের পাতা দেখুন"
                    time="আজ · সকাল ১০:০০"
                  />

                  <Task
                    icon={<CalendarDays className="size-4" />}
                    title="গোলাপ গাছে সার দিন"
                    time="আগামীকাল · সকাল ৯:০০"
                  />
                </div>
              </div>

              {/* Plant List */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {plants.map((plant) => (
                  <div
                    key={plant.name}
                    className={`rounded-2xl p-3 ${plant.color}`}
                  >
                    <div className="text-2xl">{plant.icon}</div>

                    <p className="mt-2 truncate text-xs font-bold text-slate-900 dark:text-white">
                      {plant.name}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {plant.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Card */}
            <div className="absolute -left-5 top-24 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-950/10 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                  <Sun className="size-5 text-amber-500" />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    ৩১°C
                  </p>

                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    বাগানের জন্য সুন্দর দিন
                  </p>
                </div>
              </div>
            </div>

            {/* Plant Card */}
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-950/10 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl dark:bg-emerald-500/10">
                  🌱
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    নতুন বৃদ্ধি
                  </p>

                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    তুলসী গাছটি ভালো বাড়ছে
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="mt-20 grid gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-3 dark:border-white/10">
          <Feature
            icon={<Leaf />}
            title="প্রতিটি গাছকে জানুন"
            description="আপনার সব গাছের তথ্য একটি জায়গায় সুন্দরভাবে সংরক্ষণ করুন।"
          />

          <Feature
            icon={<Droplets />}
            title="পরিচর্যা ভুলবেন না"
            description="পানি দেওয়া ও বাগানের প্রয়োজনীয় কাজের কথা মনে রাখুন।"
          />

          <Feature
            icon={<Sparkles />}
            title="আরও স্মার্টভাবে বাগান করুন"
            description="বাগানের তথ্য ব্যবহার করে আরও ভালোভাবে গাছের যত্ন নিন।"
          />
        </div>
      </section>
    </main>
  );
}

/* ---------------- Stat Card ---------------- */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/5 dark:bg-white/[0.03]">
      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        {icon}
      </div>

      <p className="mt-3 text-lg font-bold text-slate-950 dark:text-white">
        {value}
      </p>

      <p className="text-[10px] text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

/* ---------------- Task ---------------- */

function Task({
  icon,
  title,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 dark:border-white/5 dark:bg-white/[0.03]">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
          {time}
        </p>
      </div>

      <div className="size-2 rounded-full bg-emerald-500" />
    </div>
  );
}

/* ---------------- Feature ---------------- */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

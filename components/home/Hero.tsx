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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plants = [
  {
    name: "Mango Tree",
    status: "Healthy",
    icon: "🥭",
    color: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    name: "Rose",
    status: "Flowering",
    icon: "🌹",
    color: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    name: "Basil",
    status: "Needs water",
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
              Your personal digital garden
            </Badge>

            <h1 className="text-balance text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[80px] dark:text-white">
              Grow a garden
              <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
                you can understand.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              Track every plant, remember every task, understand what your
              garden needs, and watch it grow — all from one beautiful garden
              dashboard.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-xl bg-emerald-600 px-6 text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-700"
              >
                <Link href="/garden">
                  Explore My Garden
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-xl border-slate-200 bg-white/70 px-6 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <Link href="/plants">
                  <Leaf className="mr-2 size-4 text-emerald-600" />
                  Browse Plants
                </Link>
              </Button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                Plant tracking
              </span>

              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                Smart reminders
              </span>

              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <Check className="size-3 text-emerald-600" />
                </span>
                Garden insights
              </span>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-emerald-400/20 blur-[80px] dark:bg-emerald-500/10" />

            {/* Main dashboard */}
            <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Garden overview
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
                    Good morning 🌱
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
                  value="24"
                  label="Plants"
                />

                <StatCard
                  icon={<Droplets className="size-4" />}
                  value="4"
                  label="Watering"
                />

                <StatCard
                  icon={<Leaf className="size-4" />}
                  value="86%"
                  label="Health"
                />
              </div>

              {/* Garden health */}
              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Garden health
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Looking great this week
                    </p>
                  </div>

                  <span className="text-xl font-bold text-emerald-600">
                    86%
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
                    Today's garden
                  </p>

                  <Link
                    href="/tasks"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="space-y-2">
                  <Task
                    icon={<Droplets className="size-4" />}
                    title="Water Mango Tree"
                    time="Today · 8:00 AM"
                  />

                  <Task
                    icon={<Leaf className="size-4" />}
                    title="Check Tomato leaves"
                    time="Today · 10:00 AM"
                  />

                  <Task
                    icon={<CalendarDays className="size-4" />}
                    title="Fertilize Rose"
                    time="Tomorrow · 9:00 AM"
                  />
                </div>
              </div>

              {/* Plant list */}
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

            {/* Floating weather card */}
            <div className="absolute -left-5 top-24 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-950/10 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                  <Sun className="size-5 text-amber-500" />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    31°C
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Perfect garden day
                  </p>
                </div>
              </div>
            </div>

            {/* Floating plant card */}
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-950/10 backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl dark:bg-emerald-500/10">
                  🌱
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    New growth
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    Basil is thriving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature strip */}
        <div className="mt-20 grid gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-3 dark:border-white/10">
          <Feature
            icon={<Leaf />}
            title="Know every plant"
            description="Keep all your plants organized in one place."
          />

          <Feature
            icon={<Droplets />}
            title="Never miss care"
            description="Stay on top of watering and garden tasks."
          />

          <Feature
            icon={<Sparkles />}
            title="Grow smarter"
            description="Turn your garden data into useful insights."
          />
        </div>
      </section>
    </main>
  );
}

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

      <p className="text-[10px] text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

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
"use client";

import Link from "next/link";
import { Leaf, Menu, Sprout } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { label: "হোম", href: "/" },
  { label: "আমার বাগান", href: "/garden" },
  { label: "গাছপালা", href: "/plants" },
  { label: "কাজসমূহ", href: "/tasks" },
  { label: "বাগান এআই", href: "/garden-ai" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between rounded-2xl border border-emerald-950/10 bg-white/80 px-4 shadow-lg shadow-emerald-950/5 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/75 sm:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:scale-105">
              <Leaf className="size-5" />
            </span>

            <div className="hidden sm:block">
              <p className="text-base font-bold tracking-tight text-slate-950 dark:text-white">
                আমার বাগান
              </p>

              <p className="text-[10px] font-medium tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                যত্নে গড়ে উঠুক সবুজ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              লগইন
            </Link>

            <Link
              href="/garden"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/10 transition hover:bg-emerald-700"
            >
              <Sprout className="mr-2 size-4" />
              বাগান শুরু করুন
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />

            <Sheet>
              <SheetTrigger
                className="flex size-9 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label="মেনু খুলুন"
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] border-l border-emerald-950/10 bg-white dark:border-white/10 dark:bg-slate-950"
              >
                <div className="mt-8 flex flex-col">

                  {/* Mobile Logo */}
                  <div className="mb-8 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <Leaf className="size-5" />
                    </span>

                    <div>
                      <p className="font-bold text-slate-950 dark:text-white">
                        আমার বাগান
                      </p>

                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        যত্নে গড়ে উঠুক সবুজ
                      </p>
                    </div>
                  </div>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-8 flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    >
                      লগইন
                    </Link>

                    <Link
                      href="/garden"
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <Sprout className="mr-2 size-4" />
                      বাগান শুরু করুন
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Leaf,
  Search,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 size-80 rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="absolute -right-32 bottom-10 size-96 rounded-full bg-lime-500/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="mx-auto mb-8 flex size-28 items-center justify-center rounded-[2rem] border border-emerald-500/10 bg-emerald-500/5 shadow-xl shadow-emerald-950/5 dark:bg-emerald-500/10">
          <div className="relative">
            <Leaf className="size-14 rotate-[-18deg] text-emerald-600 dark:text-emerald-400" />

            <Sprout className="absolute -bottom-3 -right-7 size-8 rotate-12 text-lime-600 dark:text-lime-400" />
          </div>
        </div>

        {/* Error code */}
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl">
          Looks like this plant
          <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
            hasn&apos;t grown yet.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          The page you&apos;re looking for may have been moved, removed, or
          never planted in this garden.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="h-12 rounded-xl bg-primary px-6 shadow-lg shadow-emerald-900/10"
          >
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Garden
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 rounded-xl"
          >
            <Link href="/plants">
              <Search className="mr-2 size-4" />
              Explore Plants
            </Link>
          </Button>
        </div>

        {/* Back link */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Go back
        </button>

        {/* Bottom message */}
        <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-4 text-left shadow-sm backdrop-blur">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <Sprout className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-card-foreground">
              Nothing grows here yet.
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Let&apos;s get you back to your garden.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
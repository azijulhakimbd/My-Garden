"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Flower2,
  Leaf,
  MapPin,
  Search,
  Sprout,
  TreePine,
  X,
} from "lucide-react";


import { plants, type Plant } from "../../public/data/plant";

const categoryIcons: Record<string, typeof Leaf> = {
  ফলজ: TreePine,
  সাইট্রাস: Leaf,
  ঔষধি: Sprout,
  মসলা: Leaf,
  আম: TreePine,
  ফুল: Flower2,
};

const categoryColors: Record<string, string> = {
  ফলজ: "bg-emerald-500/10 text-emerald-600",
  সাইট্রাস: "bg-lime-500/10 text-lime-600",
  ঔষধি: "bg-green-500/10 text-green-600",
  মসলা: "bg-orange-500/10 text-orange-600",
  আম: "bg-yellow-500/10 text-yellow-600",
  ফুল: "bg-pink-500/10 text-pink-600",
};

export default function GardenPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("সব");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const categories = useMemo(
    () => ["সব", ...Array.from(new Set(plants.map((plant) => plant.category)))],
    [],
  );

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(search.toLowerCase()) ||
        plant.note?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "সব" || plant.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalQuantity = plants.reduce(
    (total, plant) => total + plant.quantity,
    0,
  );

  const totalVarieties = plants.length;

  const fruitPlants = plants
    .filter((plant) => plant.category === "ফলজ")
    .reduce((total, plant) => total + plant.quantity, 0);

  const flowerPlants = plants
    .filter((plant) => plant.category === "ফুল")
    .reduce((total, plant) => total + plant.quantity, 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.10),transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
                <Sprout className="h-4 w-4" />
                আমাদের সবুজ বাগান
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                প্রকৃতির সাথে{" "}
                <span className="text-emerald-600">
                  আমাদের সুন্দর সম্পর্ক
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                আমাদের বাগানে থাকা বিভিন্ন ফলজ, ফুল, ঔষধি ও অন্যান্য
                গাছপালার তথ্য এক জায়গায় দেখুন। গাছের নাম, পরিমাণ, শ্রেণি,
                রোপণের তারিখ এবং পরিচর্যার তথ্য সংরক্ষণ করুন।
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#plants"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  গাছগুলো দেখুন
                  <ChevronRight className="h-4 w-4" />
                </a>

                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                  <CalendarDays className="h-4 w-4" />
                  টাইমলাইন
                </a>
              </div>
            </div>

            {/* Garden Visual */}
            <div className="relative">
              <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center overflow-hidden rounded-[2rem] border bg-emerald-500/5 shadow-2xl shadow-emerald-500/10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/5">
                    <TreePine className="h-20 w-20 text-emerald-600" />
                  </div>

                  <p className="mt-6 text-5xl font-bold text-emerald-600">
                    {totalQuantity}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    মোট গাছ ও উদ্ভিদ
                  </p>
                </div>

                <div className="absolute left-5 top-5 rounded-2xl border bg-background/80 p-3 shadow-lg backdrop-blur">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                </div>

                <div className="absolute bottom-5 right-5 rounded-2xl border bg-background/80 p-3 shadow-lg backdrop-blur">
                  <Flower2 className="h-5 w-5 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          <StatCard
            icon={<TreePine className="h-5 w-5" />}
            label="মোট গাছ"
            value={totalQuantity}
          />

          <StatCard
            icon={<Leaf className="h-5 w-5" />}
            label="মোট প্রজাতি"
            value={totalVarieties}
          />

          <StatCard
            icon={<Sprout className="h-5 w-5" />}
            label="ফলজ গাছ"
            value={fruitPlants}
          />

          <StatCard
            icon={<Flower2 className="h-5 w-5" />}
            label="ফুলের গাছ"
            value={flowerPlants}
          />
        </div>
      </section>

      {/* Plants */}
      <section id="plants" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            GARDEN COLLECTION
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            আমাদের গাছপালা
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            আপনার বাগানে থাকা গাছগুলো নাম অথবা শ্রেণি অনুযায়ী খুঁজে দেখুন।
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="গাছের নাম খুঁজুন..."
              className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  category === item
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border bg-background hover:bg-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredPlants.length}টি গাছের রেকর্ড পাওয়া গেছে
          </span>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-emerald-600 hover:underline"
            >
              সার্চ পরিষ্কার করুন
            </button>
          )}
        </div>

        {/* Cards */}
        {filteredPlants.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onView={() => setSelectedPlant(plant)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              কোনো গাছ পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              অন্য কোনো নাম অথবা শ্রেণি দিয়ে চেষ্টা করুন।
            </p>
          </div>
        )}
      </section>

      {/* Timeline */}
      <section
        id="timeline"
        className="border-y bg-muted/20"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-emerald-600">
              GARDEN TIMELINE
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              বাগানের সময়রেখা
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              প্রতিটি গাছের রোপণ ও পরিচর্যার গুরুত্বপূর্ণ তথ্য ভবিষ্যতে
              এখানে সংরক্ষণ করা যাবে।
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-5 top-2 h-[calc(100%-1rem)] w-px bg-emerald-500/20 sm:left-1/2" />

            <TimelineItem
              icon={<Sprout className="h-5 w-5" />}
              title="গাছের সংগ্রহ তৈরি"
              description="বাগানের গাছপালার নাম ও পরিমাণ তথ্য হিসেবে সংরক্ষণ করা হয়েছে।"
              date="বর্তমান"
              side="left"
            />

            <TimelineItem
              icon={<CalendarDays className="h-5 w-5" />}
              title="রোপণের তারিখ"
              description="প্রতিটি গাছের প্রকৃত রোপণের তারিখ plant.ts ফাইলে যোগ করা যাবে।"
              date="তারিখ যোগ করুন"
              side="right"
            />

            <TimelineItem
              icon={<Leaf className="h-5 w-5" />}
              title="পরিচর্যার রেকর্ড"
              description="পানি দেওয়া, সার প্রয়োগ, ছাঁটাই এবং অন্যান্য পরিচর্যার তথ্য সংরক্ষণ করা যাবে।"
              date="চলমান"
              side="left"
            />

            <TimelineItem
              icon={<TreePine className="h-5 w-5" />}
              title="বাগানের ভবিষ্যৎ"
              description="নতুন গাছ যোগ করে এই বাগান ডাটাবেস আরও সমৃদ্ধ করা যাবে।"
              date="পরবর্তী ধাপ"
              side="right"
            />
          </div>
        </div>
      </section>

      {/* Plant Modal */}
      {selectedPlant && (
        <PlantDetailsModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}

     
    </main>
  );
}

/* ---------------- Stat Card ---------------- */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Plant Card ---------------- */

function hasValidImageSource(src?: string) {
  if (!src) return false;

  const value = src.trim();

  return /^(?:\/?(?:[A-Za-z0-9_\-./]+)|https?:\/\/|data:|blob:)/.test(
    value,
  );
}

function PlantCard({
  plant,
  onView,
}: {
  plant: Plant;
  onView: () => void;
}) {
  const Icon = categoryIcons[plant.category] ?? Leaf;

  const categoryClass =
    categoryColors[plant.category] ??
    "bg-emerald-500/10 text-emerald-600";

  return (
    <article className="group overflow-hidden rounded-2xl border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent">
        {hasValidImageSource(plant.image) ? (
          <Image
            src={plant.image as string}
            alt={plant.name}
            width={800}
            height={500}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_55%)]" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
              <Icon className="h-12 w-12 text-emerald-600 transition duration-300 group-hover:scale-110" />
            </div>
          </>
        )}

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${categoryClass}`}
        >
          {plant.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {plant.name}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              পরিমাণ
            </p>

            <p className="mt-1 font-semibold">
              {plant.quantity} টি
            </p>
          </div>

          <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              রোপণের তারিখ
            </p>

            <p className="mt-1 truncate text-sm font-semibold">
              {plant.plantedDate || "যোগ করা হয়নি"}
            </p>
          </div>
        </div>

        {plant.note && (
          <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
            {plant.note}
          </p>
        )}

        <button
          type="button"
          onClick={onView}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-emerald-600"
        >
          বিস্তারিত দেখুন
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

/* ---------------- Timeline Item ---------------- */

function TimelineItem({
  icon,
  title,
  description,
  date,
  side,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  side: "left" | "right";
}) {
  return (
    <div
      className={`relative mb-10 flex items-start ${
        side === "right"
          ? "sm:flex-row-reverse"
          : "sm:flex-row"
      }`}
    >
      <div className="ml-0 w-full pl-14 sm:w-1/2 sm:px-8 sm:pl-0">
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-emerald-600">
                {date}
              </p>

              <h3 className="mt-1 font-semibold">
                {title}
              </h3>
            </div>

            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 sm:flex">
              {icon}
            </div>
          </div>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-emerald-600 shadow-sm sm:left-1/2 sm:-translate-x-1/2">
        {icon}
      </div>
    </div>
  );
}

/* ---------------- Details Modal ---------------- */

function PlantDetailsModal({
  plant,
  onClose,
}: {
  plant: Plant;
  onClose: () => void;
}) {
  const Icon = categoryIcons[plant.category] ?? Leaf;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border bg-background shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 transition hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-5 pr-10">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-500/10">
              {hasValidImageSource(plant.image) ? (
                <Image
                  src={plant.image as string}
                  alt={plant.name}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon className="h-10 w-10 text-emerald-600" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-emerald-600">
                {plant.category}
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {plant.name}
              </h2>

              {plant.note && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {plant.note}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <InfoBox
            icon={<TreePine className="h-4 w-4" />}
            label="পরিমাণ"
            value={`${plant.quantity} টি`}
          />

          <InfoBox
            icon={<CalendarDays className="h-4 w-4" />}
            label="রোপণের তারিখ"
            value={plant.plantedDate || "যোগ করা হয়নি"}
          />

          <InfoBox
            icon={<MapPin className="h-4 w-4" />}
            label="অবস্থান"
            value={plant.location || "যোগ করা হয়নি"}
          />
        </div>

        {/* Timeline */}
        <div className="px-6 pb-6">
          <h3 className="mb-5 flex items-center gap-2 font-semibold">
            <CalendarDays className="h-5 w-5 text-emerald-600" />
            গাছের টাইমলাইন
          </h3>

          <div className="relative space-y-5 pl-7">
            <div className="absolute bottom-2 left-2 top-2 w-px bg-emerald-500/20" />

            <ModalTimeline
              title="গাছের রেকর্ড তৈরি"
              date="বর্তমান"
              description={`${plant.name} বাগানের গাছের তালিকায় যুক্ত আছে।`}
            />

            <ModalTimeline
              title="রোপণের তারিখ"
              date={plant.plantedDate || "তারিখ যোগ করা হয়নি"}
                description="গাছটি বাগানে রোপণ করা হয়েছে।"
            />

            <ModalTimeline
              title="পরবর্তী পরিচর্যা"
              date="তথ্য যোগ করুন"
              description="পানি, সার, ছাঁটাই বা অন্যান্য পরিচর্যার রেকর্ড এখানে যোগ করা যাবে।"
            />
          </div>
        </div>

        {/* Close */}
        <div className="border-t bg-muted/20 p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-emerald-600">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 truncate text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function ModalTimeline({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-emerald-600 bg-background" />

      <p className="text-xs font-medium text-emerald-600">
        {date}
      </p>

      <h4 className="mt-1 text-sm font-semibold">
        {title}
      </h4>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
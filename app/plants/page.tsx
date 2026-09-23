"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Flower2,
  Leaf,
  MapPin,
  Search,
  Sprout,
  Trees,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  plants,
  categories,
  totalPlants,
  totalPlantVarieties,
  floweringPlants,
  fruitingPlants,
  smallPlants,
  deadPlants,
  type Plant,
  type PlantCategory,
} from "../../public/data/plant";

/* =========================================================
   Helpers
========================================================= */

function getStatusClass(status?: Plant["status"]) {
  switch (status) {
    case "ফল হয়েছে":
    case "ফল হয়েছে ও ফুল হয়েছে":
      return "bg-garden/10 text-garden";

    case "ফুল হয়েছে":
    case "গাছ ছোট ও ফুল হয়েছে":
    case "ফুল এসেছে কিন্তু ফল হয়নি":
      return "bg-pink-500/10 text-pink-600 dark:text-pink-400";

    case "গাছ মরে গেছে":
    case "গাছ ছোট ও গাছ মরে গেছে":
      return "bg-destructive/10 text-destructive";

    case "গাছ ছোট":
    case "গাছ ছোট ও ফল হয়নি":
    case "ফল হয়নি":
      return "bg-moss/15 text-moss-foreground";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatusIcon(status?: Plant["status"]) {
  if (status?.includes("মরে গেছে")) {
    return "🪵";
  }

  if (status?.includes("ফুল")) {
    return "🌸";
  }

  if (status?.includes("ফল")) {
    return "🍃";
  }

  return "🌱";
}

/* =========================================================
   Stat Card
========================================================= */

function StatCard({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="garden-glow min-w-0 rounded-2xl border bg-card/80 p-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 sm:p-4">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-garden/10 text-garden sm:h-10 sm:w-10">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-lg font-black tracking-tight sm:text-2xl">
            {value.toLocaleString("bn-BD")}
          </p>

          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Plant Card
========================================================= */

function PlantCard({
  plant,
  onSelect,
}: {
  plant: Plant;
  onSelect: (plant: Plant) => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <button
        type="button"
        onClick={() => onSelect(plant)}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-muted text-left"
        aria-label={`${plant.name} বিস্তারিত দেখুন`}
      >
        {plant.image ? (
          <Image
            src={plant.image}
            alt={plant.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 768px) 50vw,
              (max-width: 1024px) 50vw,
              (max-width: 1280px) 33vw,
              25vw
            "
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="garden-gradient flex h-full w-full items-center justify-center">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110 sm:text-7xl">
              {plant.icon}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15" />

        {/* Category */}
        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="inline-flex max-w-[45vw] truncate rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md sm:max-w-none sm:px-3 sm:py-1.5 sm:text-xs">
            {plant.category}
          </span>
        </div>

        {/* Status */}
        {plant.status && (
          <div className="absolute right-3 top-3 max-w-[58%] sm:right-4 sm:top-4">
            <span
              className={`inline-flex max-w-full items-center truncate rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold shadow-lg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs ${getStatusClass(
                plant.status,
              )}`}
              title={plant.status}
            >
              <span className="mr-1 shrink-0">
                {getStatusIcon(plant.status)}
              </span>

              <span className="truncate">{plant.status}</span>
            </span>
          </div>
        )}

        {/* Quantity */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs">
            {plant.quantity.toLocaleString("bn-BD")} টি গাছ
          </span>
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold tracking-tight sm:text-xl">
              {plant.name}
            </h2>

            {plant.variety && (
              <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                জাত: {plant.variety}
              </p>
            )}
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-garden/10 text-xl sm:h-10 sm:w-10 sm:text-2xl">
            {plant.icon}
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="min-w-0 rounded-2xl border bg-muted/30 p-2.5 sm:p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              রোপণ
            </div>

            <p className="truncate text-xs font-semibold sm:text-sm">
              {plant.plantedDate}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border bg-muted/30 p-2.5 sm:p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
              <Trees className="h-3.5 w-3.5 shrink-0" />
              অবস্থা
            </div>

            <p className="truncate text-xs font-semibold sm:text-sm">
              {plant.growthStage ?? "তথ্য নেই"}
            </p>
          </div>
        </div>

        {/* Nursery */}
        {plant.nursery && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-garden" />

            <span className="line-clamp-2">
              <span className="font-medium text-foreground">
                নার্সারি:
              </span>{" "}
              {plant.nursery}
            </span>
          </div>
        )}

        {/* Result */}
        {plant.result && (
          <div className="rounded-2xl bg-garden/5 px-3 py-2.5">
            <p className="line-clamp-2 text-xs font-medium leading-5 text-garden sm:text-sm">
              {plant.result}
            </p>
          </div>
        )}

        {/* Button */}
        <Button
          type="button"
          variant="outline"
          className="mt-auto w-full rounded-xl transition-colors hover:border-garden hover:bg-garden hover:text-garden-foreground"
          onClick={() => onSelect(plant)}
        >
          বিস্তারিত দেখুন
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </article>
  );
}

/* =========================================================
   Info Item
========================================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border bg-muted/20 p-3 sm:p-4">
      <p className="text-[11px] text-muted-foreground sm:text-xs">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold sm:text-base">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   Plant Details Modal
========================================================= */

function PlantDetails({
  plant,
  onClose,
}: {
  plant: Plant;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${plant.name} বিস্তারিত`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[96vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:max-h-[90vh] sm:rounded-3xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-background/90 shadow-lg backdrop-blur-xl transition-colors hover:bg-muted sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          aria-label="বন্ধ করুন"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted sm:aspect-[16/9]">
          {plant.image ? (
            <Image
              src={plant.image}
              alt={plant.name}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          ) : (
            <div className="garden-gradient flex h-full items-center justify-center">
              <span className="text-7xl sm:text-8xl">
                {plant.icon}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
            <span className="inline-flex rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs">
              {plant.category}
            </span>

            <h2 className="mt-2 pr-10 text-2xl font-black text-white sm:text-4xl">
              {plant.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 overflow-y-auto">
          <div className="space-y-5 p-4 sm:space-y-6 sm:p-8">
            {/* Status */}
            {plant.status && (
              <div>
                <span
                  className={`inline-flex max-w-full rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                    plant.status,
                  )}`}
                >
                  {getStatusIcon(plant.status)}{" "}
                  <span className="ml-1 truncate">
                    {plant.status}
                  </span>
                </span>
              </div>
            )}

            {/* Main Information */}
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              <InfoItem
                label="পরিমাণ"
                value={`${plant.quantity.toLocaleString("bn-BD")} টি`}
              />

              <InfoItem
                label="রোপণ / সংগ্রহ"
                value={plant.plantedDate}
              />

              {plant.price !== undefined && (
                <InfoItem
                  label="মূল্য"
                  value={
                    plant.price === 0
                      ? "বিনামূল্যে"
                      : `${plant.price.toLocaleString(
                          "bn-BD",
                        )} টাকা`
                  }
                />
              )}

              {plant.growthStage && (
                <InfoItem
                  label="বৃদ্ধির পর্যায়"
                  value={plant.growthStage}
                />
              )}

              {plant.variety && (
                <InfoItem
                  label="জাত"
                  value={plant.variety}
                />
              )}

              {plant.scientificName && (
                <InfoItem
                  label="বৈজ্ঞানিক নাম"
                  value={plant.scientificName}
                />
              )}
            </div>

            {/* Result */}
            {plant.result && (
              <div className="rounded-2xl border bg-garden/5 p-3.5 sm:p-4">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 shrink-0 text-garden" />

                  <h3 className="font-bold">
                    বর্তমান ফলাফল
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {plant.result}
                </p>
              </div>
            )}

            {/* Nursery */}
            {plant.nursery && (
              <div className="flex gap-3 rounded-2xl border p-3.5 sm:p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-garden" />

                <div className="min-w-0">
                  <p className="font-semibold">
                    নার্সারি / সংগ্রহের স্থান
                  </p>

                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    {plant.nursery}
                  </p>
                </div>
              </div>
            )}

            {/* Note */}
            {plant.note && (
              <div className="rounded-2xl border bg-muted/30 p-3.5 sm:p-4">
                <h3 className="font-semibold">
                  নোট
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {plant.note}
                </p>
              </div>
            )}

            {/* Timeline */}
            {plant.timeline.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2 sm:mb-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-garden/10 text-garden">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold">
                    গাছের Timeline
                  </h3>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {plant.timeline.map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-3 rounded-2xl border bg-card p-3 sm:gap-4 sm:p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-garden/10 sm:h-10 sm:w-10">
                        {event.type === "flowering" ? (
                          <Flower2 className="h-4 w-4 text-pink-500 sm:h-5 sm:w-5" />
                        ) : event.type === "fruiting" ? (
                          <Leaf className="h-4 w-4 text-garden sm:h-5 sm:w-5" />
                        ) : (
                          <Sprout className="h-4 w-4 text-garden sm:h-5 sm:w-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold sm:text-base">
                            {event.title}
                          </h4>

                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                            {event.date}
                          </span>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Page
========================================================= */

export default function PlantsPage() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<
    PlantCategory | "সব"
  >("সব");

  const [selectedStatus, setSelectedStatus] = useState<
    Plant["status"] | "সব"
  >("সব");

  const [selectedPlant, setSelectedPlant] =
    useState<Plant | null>(null);

  const statusOptions = useMemo(() => {
    return Array.from(
      new Set(
        plants
          .map((plant) => plant.status)
          .filter(
            (status): status is NonNullable<Plant["status"]> =>
              Boolean(status),
          ),
      ),
    );
  }, []);

  const filteredPlants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return plants.filter((plant) => {
      const matchesSearch =
        !query ||
        plant.name.toLowerCase().includes(query) ||
        plant.category.toLowerCase().includes(query) ||
        plant.result?.toLowerCase().includes(query) ||
        plant.nursery?.toLowerCase().includes(query) ||
        plant.variety?.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "সব" ||
        plant.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "সব" ||
        plant.status === selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, selectedCategory, selectedStatus]);

  const hasFilters =
    Boolean(search) ||
    selectedCategory !== "সব" ||
    selectedStatus !== "সব";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("সব");
    setSelectedStatus("সব");
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* =====================================================
          Hero
      ===================================================== */}
      <section className="garden-gradient relative overflow-hidden border-b">
        {/* Decorative */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-garden/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-lime/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
              <Sprout className="h-4 w-4 text-garden" />
              আমার বাগান
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              আমার{" "}
              <span className="text-garden">
                গাছপালা
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-7">
              আমার বাগানের প্রতিটি গাছের রোপণ, বৃদ্ধি, ফুল,
              ফল এবং বর্তমান অবস্থার তথ্য এক জায়গায় সংরক্ষণ
              ও পর্যবেক্ষণ করুন।
            </p>
          </div>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            <StatCard
              value={totalPlantVarieties}
              label="Plant Records"
              icon={<Trees className="h-5 w-5" />}
            />

            <StatCard
              value={totalPlants}
              label="মোট গাছ"
              icon={<Sprout className="h-5 w-5" />}
            />

            <StatCard
              value={categories.length}
              label="ক্যাটাগরি"
              icon={<Leaf className="h-5 w-5" />}
            />

            <StatCard
              value={fruitingPlants.length}
              label="ফল হয়েছে"
              icon={<span className="text-lg">🍎</span>}
            />

            <StatCard
              value={floweringPlants.length}
              label="ফুল হয়েছে"
              icon={<Flower2 className="h-5 w-5" />}
            />

            <StatCard
              value={deadPlants.length}
              label="মরে গেছে"
              icon={<span className="text-lg">🪵</span>}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          Plants Section
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Search / Filter */}
        <div className="glass garden-glow mb-6 rounded-2xl p-3.5 sm:mb-8 sm:rounded-3xl sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
            {/* Search */}
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:h-5 sm:w-5" />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="গাছের নাম, ক্যাটাগরি, নার্সারি খুঁজুন..."
                className="h-10 w-full rounded-xl border-input bg-background/70 pl-9 text-sm sm:h-11 sm:pl-10"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value as PlantCategory | "সব",
                )
              }
              className="h-10 w-full rounded-xl border border-input bg-background/70 px-3 text-sm outline-none transition-colors focus:border-garden focus:ring-2 focus:ring-garden/20 sm:h-11 lg:w-auto lg:min-w-36"
              aria-label="ক্যাটাগরি নির্বাচন করুন"
            >
              <option value="সব">সব ক্যাটাগরি</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value as Plant["status"] | "সব",
                )
              }
              className="h-10 w-full rounded-xl border border-input bg-background/70 px-3 text-sm outline-none transition-colors focus:border-garden focus:ring-2 focus:ring-garden/20 sm:h-11 lg:w-auto lg:min-w-44"
              aria-label="অবস্থা নির্বাচন করুন"
            >
              <option value="সব">সব অবস্থা</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="mt-3 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground sm:text-sm">
              মোট{" "}
              <span className="font-bold text-foreground">
                {filteredPlants.length.toLocaleString("bn-BD")}
              </span>{" "}
              টি রেকর্ড পাওয়া গেছে
            </p>

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="w-full rounded-lg hover:bg-garden/10 hover:text-garden sm:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                ফিল্টার পরিষ্কার
              </Button>
            )}
          </div>
        </div>

        {/* Plant Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelect={setSelectedPlant}
              />
            ))}
          </div>
        ) : (
          <div className="garden-gradient rounded-2xl border border-dashed p-8 text-center sm:rounded-3xl sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-garden/10 text-garden sm:h-16 sm:w-16">
              <Search className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h2 className="mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
              কোনো গাছ পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              সার্চ অথবা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4 rounded-xl hover:border-garden hover:bg-garden hover:text-garden-foreground sm:mt-5"
              onClick={clearFilters}
            >
              সব গাছ দেখুন
            </Button>
          </div>
        )}

        {/* Small Plant Notice */}
        {smallPlants.length > 0 && (
          <div className="mt-6 rounded-2xl border bg-moss/5 p-4 sm:mt-8 sm:rounded-3xl sm:p-5">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss/15 sm:h-10 sm:w-10">
                🌱
              </div>

              <div className="min-w-0">
                <h3 className="font-bold">
                  নতুন ও ছোট গাছ
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  বর্তমানে{" "}
                  <span className="font-semibold text-foreground">
                    {smallPlants.length.toLocaleString("bn-BD")}
                  </span>{" "}
                  টি Plant Record-এ গাছ ছোট অবস্থায় রয়েছে।
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="garden-gradient garden-glow overflow-hidden rounded-2xl border p-5 sm:rounded-3xl sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="min-w-0">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-garden/10 text-garden sm:h-10 sm:w-10">
                  <Sprout className="h-5 w-5" />
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  বাগানের আরও তথ্য যোগ করুন
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  নতুন গাছ, ছবি, রোপণের তারিখ, নার্সারি,
                  মূল্য এবং গাছের বর্তমান অবস্থা সংরক্ষণ করুন।
                </p>
              </div>

              <Button
                asChild
                className="w-full rounded-xl bg-garden text-garden-foreground hover:bg-garden/90 sm:w-auto"
              >
                <Link href="/plants/add">
                  <Sprout className="mr-2 h-4 w-4" />
                  নতুন গাছ যোগ করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Details Modal
      ===================================================== */}
      {selectedPlant && (
        <PlantDetails
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </main>
  );
}
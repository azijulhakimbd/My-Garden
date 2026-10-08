"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Leaf,
  Loader2,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Plant = {
  _id: string;
  name: string;
  scientificName?: string;
  category?: string;
  quantity?: number;
  status?: string;
  description?: string;
  image?: string;
  location?: string;
  plantedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

const STATUS_LABELS: Record<string, string> = {
  healthy: "স্বাস্থ্যকর",
  growing: "বর্ধনশীল",
  flowering: "ফুল দিচ্ছে",
  fruiting: "ফল দিচ্ছে",
  sick: "অসুস্থ",
  dead: "মৃত",
};

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  healthy: "default",
  growing: "secondary",
  flowering: "default",
  fruiting: "default",
  sick: "destructive",
  dead: "destructive",
};

export default function PlantsAdminPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const loadPlants = useCallback(async () => {
    try {
      setRefreshing(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category !== "all") {
        params.set("category", category);
      }

      if (status !== "all") {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/plants?${params.toString()}`,
        {
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to load plants",
        );
      }

      setPlants(
        Array.isArray(result?.data)
          ? result.data
          : [],
      );
    } catch (error) {
      console.error(error);
      setPlants([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, category, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadPlants();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadPlants]);

  async function deletePlant(id: string) {
    const confirmed = window.confirm(
      "আপনি কি সত্যিই এই গাছটি মুছে ফেলতে চান?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `/api/plants/${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Delete failed",
        );
      }

      setPlants((current) =>
        current.filter(
          (plant) => plant._id !== id,
        ),
      );
    } catch (error) {
      console.error(error);

      window.alert(
        error instanceof Error
          ? error.message
          : "গাছ মুছে ফেলা যায়নি।",
      );
    } finally {
      setDeletingId(null);
    }
  }

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        plants
          .map((plant) => plant.category)
          .filter(Boolean),
      ),
    ) as string[];
  }, [plants]);

  const totalQuantity = useMemo(
    () =>
      plants.reduce(
        (sum, plant) =>
          sum + Number(plant.quantity ?? 0),
        0,
      ),
    [plants],
  );

  const healthyCount = useMemo(
    () =>
      plants.filter(
        (plant) =>
          !plant.status ||
          plant.status === "healthy" ||
          plant.status === "growing",
      ).length,
    [plants],
  );

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="-ml-2"
            >
              <Link href="/admin">
                <ArrowLeft className="mr-1 size-4" />
                Dashboard
              </Link>
            </Button>

            <span>/</span>
            <span>গাছপালা</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                গাছপালা পরিচালনা
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                আপনার বাগানের সব গাছ MongoDB থেকে পরিচালনা করুন।
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => void loadPlants()}
                disabled={refreshing}
              >
                <RefreshCw
                  className={`mr-2 size-4 ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />
                রিফ্রেশ
              </Button>

              <Button asChild>
                <Link href="/admin/plants/new">
                  <Plus className="mr-2 size-4" />
                  নতুন গাছ
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="গাছের রেকর্ড"
            value={plants.length}
            icon={Leaf}
          />

          <StatCard
            title="মোট সংখ্যা"
            value={totalQuantity}
            icon={Leaf}
          />

          <StatCard
            title="স্বাস্থ্যকর"
            value={healthyCount}
            icon={Leaf}
          />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>সব গাছ</CardTitle>
                <CardDescription>
                  গাছের তথ্য দেখুন, সম্পাদনা করুন অথবা মুছে ফেলুন।
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="গাছ খুঁজুন..."
                    className="w-full pl-9 sm:w-56"
                  />
                </div>

                {/* Category */}
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="ক্যাটাগরি" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      সব ক্যাটাগরি
                    </SelectItem>

                    {categories.map(
                      (item) => (
                        <SelectItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>

                {/* Status */}
                <Select
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="স্ট্যাটাস" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      সব স্ট্যাটাস
                    </SelectItem>

                    {Object.entries(
                      STATUS_LABELS,
                    ).map(
                      ([value, label]) => (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <LoadingState />
            ) : plants.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>গাছ</TableHead>
                      <TableHead>ক্যাটাগরি</TableHead>
                      <TableHead>পরিমাণ</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>লোকেশন</TableHead>
                      <TableHead className="text-right">
                        অ্যাকশন
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {plants.map((plant) => (
                      <TableRow key={plant._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
                              {plant.image ? (
                                <img
                                  src={plant.image}
                                  alt={plant.name}
                                  className="size-full object-cover"
                                />
                              ) : (
                                <Leaf className="size-5 text-primary" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium">
                                {plant.name}
                              </p>

                              {plant.scientificName && (
                                <p className="truncate text-xs italic text-muted-foreground">
                                  {plant.scientificName}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {plant.category || "—"}
                        </TableCell>

                        <TableCell>
                          <span className="font-medium">
                            {plant.quantity ?? 0}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              STATUS_VARIANTS[
                                plant.status ||
                                  "healthy"
                              ] || "secondary"
                            }
                          >
                            {STATUS_LABELS[
                              plant.status ||
                                "healthy"
                            ] ||
                              plant.status ||
                              "স্বাস্থ্যকর"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {plant.location || "—"}
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                              >
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">
                                  অ্যাকশন
                                </span>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                asChild
                              >
                                <Link
                                  href={`/admin/plants/${plant._id}`}
                                >
                                  <Edit className="mr-2 size-4" />
                                  সম্পাদনা
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                variant="destructive"
                                disabled={
                                  deletingId ===
                                  plant._id
                                }
                                onClick={() =>
                                  void deletePlant(
                                    plant._id,
                                  )
                                }
                              >
                                {deletingId ===
                                plant._id ? (
                                  <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                  <Trash2 className="mr-2 size-4" />
                                )}

                                মুছে ফেলুন
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <p className="mt-1 text-2xl font-bold">
              {value}
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center gap-3">
      <Loader2 className="size-8 animate-spin text-primary" />

      <p className="text-sm text-muted-foreground">
        MongoDB থেকে গাছের তথ্য লোড হচ্ছে...
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
        <Leaf className="size-7 text-primary" />
      </div>

      <h3 className="mt-4 font-semibold">
        কোনো গাছ পাওয়া যায়নি
      </h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        নতুন গাছ যোগ করুন অথবা আপনার search/filter পরিবর্তন করুন।
      </p>

      <Button className="mt-4" asChild>
        <Link href="/admin/plants/new">
          <Plus className="mr-2 size-4" />
          নতুন গাছ যোগ করুন
        </Link>
      </Button>
    </div>
  );
}
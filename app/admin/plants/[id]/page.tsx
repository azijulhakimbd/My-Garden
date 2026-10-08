"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ArrowLeft, Leaf, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Plant = {
  name: string;
  scientificName?: string;
  category?: string;
  quantity?: number;
  status?: string;
  location?: string;
  image?: string;
  plantedAt?: string;
  description?: string;
};

export default function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Plant>({
    name: "",
    scientificName: "",
    category: "",
    quantity: 1,
    status: "healthy",
    location: "",
    image: "",
    plantedAt: "",
    description: "",
  });

  useEffect(() => {
    async function loadPlant() {
      try {
        const response = await fetch(
          `/api/plants/${id}`,
          {
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "গাছ পাওয়া যায়নি।",
          );
        }

        const plant = result.data;

        setForm({
          name: plant.name ?? "",
          scientificName:
            plant.scientificName ?? "",
          category: plant.category ?? "",
          quantity: plant.quantity ?? 1,
          status:
            plant.status ?? "healthy",
          location: plant.location ?? "",
          image: plant.image ?? "",
          plantedAt: plant.plantedAt
            ? new Date(
                plant.plantedAt,
              )
                .toISOString()
                .split("T")[0]
            : "",
          description:
            plant.description ?? "",
        });
      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : "গাছ লোড করা যায়নি।",
        );

        router.push("/admin/plants");
      } finally {
        setLoading(false);
      }
    }

    void loadPlant();
  }, [id, router]);

  function updateField(
    field: keyof Plant,
    value: string | number,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        `/api/plants/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "গাছ আপডেট করা যায়নি।",
        );
      }

      router.push("/admin/plants");
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "গাছ আপডেট করা যায়নি।",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">
            গাছের তথ্য লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="-ml-3"
          >
            <Link href="/admin/plants">
              <ArrowLeft className="mr-2 size-4" />
              গাছপালায় ফিরে যান
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Leaf className="size-5 text-primary" />
              </div>

              <div>
                <CardTitle>
                  গাছের তথ্য সম্পাদনা
                </CardTitle>

                <CardDescription>
                  পরিবর্তনগুলো MongoDB-তে সংরক্ষণ হবে।
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    গাছের নাম *
                  </Label>

                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value,
                      )
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    বৈজ্ঞানিক নাম
                  </Label>

                  <Input
                    value={
                      form.scientificName
                    }
                    onChange={(e) =>
                      updateField(
                        "scientificName",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>ক্যাটাগরি</Label>

                  <Input
                    value={form.category}
                    onChange={(e) =>
                      updateField(
                        "category",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>পরিমাণ</Label>

                  <Input
                    type="number"
                    min="0"
                    value={
                      form.quantity ?? 0
                    }
                    onChange={(e) =>
                      updateField(
                        "quantity",
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>স্ট্যাটাস</Label>

                  <Select
                    value={
                      form.status ??
                      "healthy"
                    }
                    onValueChange={(value) =>
                      updateField(
                        "status",
                        value,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="healthy">
                        স্বাস্থ্যকর
                      </SelectItem>

                      <SelectItem value="growing">
                        বর্ধনশীল
                      </SelectItem>

                      <SelectItem value="flowering">
                        ফুল দিচ্ছে
                      </SelectItem>

                      <SelectItem value="fruiting">
                        ফল দিচ্ছে
                      </SelectItem>

                      <SelectItem value="sick">
                        অসুস্থ
                      </SelectItem>

                      <SelectItem value="dead">
                        মৃত
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>লোকেশন</Label>

                  <Input
                    value={
                      form.location
                    }
                    onChange={(e) =>
                      updateField(
                        "location",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    লাগানোর তারিখ
                  </Label>

                  <Input
                    type="date"
                    value={
                      form.plantedAt
                    }
                    onChange={(e) =>
                      updateField(
                        "plantedAt",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Image URL
                  </Label>

                  <Input
                    value={form.image}
                    onChange={(e) =>
                      updateField(
                        "image",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>বিবরণ</Label>

                <Textarea
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value,
                    )
                  }
                  rows={5}
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-5">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/plants">
                    বাতিল
                  </Link>
                </Button>

                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 size-4" />
                  )}

                  {saving
                    ? "আপডেট হচ্ছে..."
                    : "পরিবর্তন সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
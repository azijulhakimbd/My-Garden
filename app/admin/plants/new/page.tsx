"use client";

import Link from "next/link";
import { useState } from "react";
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

export default function NewPlantPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    category: "",
    quantity: "1",
    status: "healthy",
    location: "",
    image: "",
    plantedAt: "",
    description: "",
  });

  function updateField(
    field: keyof typeof form,
    value: string,
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

    if (!form.name.trim()) {
      alert("গাছের নাম দিন।");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/plants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            quantity: Number(form.quantity),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "গাছ যোগ করা যায়নি।",
        );
      }

      router.push("/admin/plants");
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "গাছ যোগ করা যায়নি।",
      );
    } finally {
      setSaving(false);
    }
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
                <CardTitle>নতুন গাছ যোগ করুন</CardTitle>
                <CardDescription>
                  তথ্য পূরণ করলে MongoDB-তে নতুন গাছ সংরক্ষণ হবে।
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
                    placeholder="যেমন: গোলাপ"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scientificName">
                    বৈজ্ঞানিক নাম
                  </Label>

                  <Input
                    id="scientificName"
                    value={
                      form.scientificName
                    }
                    onChange={(e) =>
                      updateField(
                        "scientificName",
                        e.target.value,
                      )
                    }
                    placeholder="Rosa rubiginosa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    ক্যাটাগরি
                  </Label>

                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) =>
                      updateField(
                        "category",
                        e.target.value,
                      )
                    }
                    placeholder="ফুল / ফল / সবজি"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">
                    পরিমাণ
                  </Label>

                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(e) =>
                      updateField(
                        "quantity",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>স্ট্যাটাস</Label>

                  <Select
                    value={form.status}
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
                  <Label htmlFor="location">
                    লোকেশন
                  </Label>

                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) =>
                      updateField(
                        "location",
                        e.target.value,
                      )
                    }
                    placeholder="বাড়ির ছাদ / বারান্দা"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plantedAt">
                    লাগানোর তারিখ
                  </Label>

                  <Input
                    id="plantedAt"
                    type="date"
                    value={form.plantedAt}
                    onChange={(e) =>
                      updateField(
                        "plantedAt",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">
                    Image URL
                  </Label>

                  <Input
                    id="image"
                    value={form.image}
                    onChange={(e) =>
                      updateField(
                        "image",
                        e.target.value,
                      )
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  বিবরণ
                </Label>

                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value,
                    )
                  }
                  placeholder="গাছ সম্পর্কে কিছু লিখুন..."
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
                    ? "সংরক্ষণ হচ্ছে..."
                    : "গাছ সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
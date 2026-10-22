
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ArrowLeft, Leaf, Loader2, Save } from "lucide-react";

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
      await Swal.fire({
        icon: "warning",
        title: "গাছের নাম প্রয়োজন!",
        text: "অনুগ্রহ করে গাছের নাম লিখুন।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    const quantity = Number(form.quantity);

    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 0
    ) {
      await Swal.fire({
        icon: "warning",
        title: "ভুল পরিমাণ!",
        text: "পরিমাণ শূন্য অথবা ধনাত্মক পূর্ণসংখ্যা হতে হবে।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    try {
      setSaving(true);

      Swal.fire({
        title: "গাছ সংরক্ষণ হচ্ছে...",
        text: "অনুগ্রহ করে অপেক্ষা করুন।",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch("/api/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          quantity,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message ||
            result?.error ||
            "গাছ সংরক্ষণ করা যায়নি।",
        );
      }

      if (!result?.data) {
        throw new Error(
          "সার্ভার থেকে সংরক্ষিত গাছের তথ্য পাওয়া যায়নি।",
        );
      }

      await Swal.fire({
        icon: "success",
        title: "সফলভাবে সংরক্ষিত!",
        text: `${form.name.trim()} গাছটি সফলভাবে যোগ করা হয়েছে।`,
        confirmButtonText: "গাছের তালিকা দেখুন",
        confirmButtonColor: "#16a34a",
        timer: 2500,
        timerProgressBar: true,
      });

      router.push("/admin/plants");
      router.refresh();
    } catch (error) {
      Swal.close();

      await Swal.fire({
        icon: "error",
        title: "সংরক্ষণ ব্যর্থ!",
        text:
          error instanceof Error
            ? error.message
            : "একটি অপ্রত্যাশিত সমস্যা হয়েছে।",
        confirmButtonText: "আবার চেষ্টা করুন",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="-ml-3">
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
                  গাছের তথ্য পূরণ করুন। সংরক্ষিত তথ্য MongoDB-তে
                  জমা হবে।
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">গাছের নাম *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
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
                    value={form.scientificName}
                    onChange={(e) =>
                      updateField("scientificName", e.target.value)
                    }
                    placeholder="Rosa rubiginosa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">ক্যাটাগরি</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) =>
                      updateField("category", e.target.value)
                    }
                    placeholder="ফুল / ফল / সবজি"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">পরিমাণ</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={(e) =>
                      updateField("quantity", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">স্ট্যাটাস</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      updateField("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
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
                      <SelectItem value="sick">অসুস্থ</SelectItem>
                      <SelectItem value="dead">মৃত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">লোকেশন</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) =>
                      updateField("location", e.target.value)
                    }
                    placeholder="বাড়ির ছাদ / বারান্দা"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plantedAt">লাগানোর তারিখ</Label>
                  <Input
                    id="plantedAt"
                    type="date"
                    value={form.plantedAt}
                    onChange={(e) =>
                      updateField("plantedAt", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={form.image}
                    onChange={(e) =>
                      updateField("image", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">বিবরণ</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
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
                  disabled={saving}
                >
                  <Link href="/admin/plants">বাতিল</Link>
                </Button>

                <Button type="submit" disabled={saving}>
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

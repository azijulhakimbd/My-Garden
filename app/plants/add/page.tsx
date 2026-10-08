"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const categories = ["ফলজ", "সাইট্রাস", "ঔষধি", "মসলা", "আম", "ফুল"];
const statuses = ["গাছ ছোট", "ফল হয়েছে", "ফল হয়নি", "ফুল হয়েছে", "গাছ মরে গেছে"];

export default function AddPlantPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      router.push("/plants");
    } catch {
      setError("গাছটি সংরক্ষণ করা যায়নি। MongoDB সংযোগ পরীক্ষা করুন।");
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <Link
        href="/plants"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        গাছপালায় ফিরুন
      </Link>

      <div className="mb-8">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-garden/10 text-garden">
          <Sprout className="size-5" />
        </div>
        <h1 className="text-3xl font-bold">নতুন গাছ যোগ করুন</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          গাছের তথ্য MongoDB-তে সংরক্ষণ করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">গাছের নাম *</Label>
            <Input id="name" name="name" required maxLength={120} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">ক্যাটাগরি *</Label>
            <select
              id="category"
              name="category"
              required
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue="ফলজ"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">পরিমাণ</Label>
            <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">বর্তমান অবস্থা</Label>
            <select
              id="status"
              name="status"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue="গাছ ছোট"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scientificName">বৈজ্ঞানিক নাম</Label>
            <Input id="scientificName" name="scientificName" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plantedAt">রোপণের তারিখ</Label>
            <Input id="plantedAt" name="plantedAt" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">অবস্থান</Label>
            <Input id="location" name="location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">ছবির URL</Label>
            <Input id="image" name="image" type="url" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nursery">নার্সারি / সংগ্রহের স্থান</Label>
            <Input id="nursery" name="nursery" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="variety">জাত</Label>
            <Input id="variety" name="variety" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">মূল্য</Label>
            <Input id="price" name="price" type="number" min="0" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">বিবরণ / নোট</Label>
          <Textarea id="description" name="description" rows={4} />
        </div>

        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <Button asChild variant="outline">
            <Link href="/plants">বাতিল</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "সংরক্ষণ হচ্ছে..." : "গাছ সংরক্ষণ করুন"}
          </Button>
        </div>
      </form>
    </main>
  );
}
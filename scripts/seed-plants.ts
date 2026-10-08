import fs from "node:fs";
import mongoose from "mongoose";

import { plants } from "../public/data/plant";
import { Plant } from "../models/plant";

for (const envFile of [".env.local", ".env"]) {
  if (fs.existsSync(envFile)) {
    process.loadEnvFile(envFile);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

function parseBanglaNumber(value: string): number {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  return Number(
    value
      .split("")
      .map((char) => {
        const index = banglaDigits.indexOf(char);

        return index === -1 ? char : englishDigits[index];
      })
      .join(""),
  );
}

function parsePlantedDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  // YYYY / বাংলা YYYY
  const yearMatch = value.match(/[০-৯0-9]{4}/);

  if (yearMatch) {
    const year = parseBanglaNumber(yearMatch[0]);

    if (year >= 1900 && year <= 2100) {
      return new Date(`${year}-01-01T00:00:00.000Z`);
    }
  }

  // Bengali month names
  const months: Record<string, number> = {
    জানুয়ারি: 0,
    জানুয়ারি: 0,
    ফেব্রুয়ারি: 1,
    ফেব্রুয়ারি: 1,
    মার্চ: 2,
    এপ্রিল: 3,
    মে: 4,
    জুন: 5,
    জুলাই: 6,
    আগস্ট: 7,
    সেপ্টেম্বর: 8,
    অক্টোবর: 9,
    নভেম্বর: 10,
    ডিসেম্বর: 11,
  };

  for (const [monthName, monthIndex] of Object.entries(months)) {
    if (value.includes(monthName)) {
      const dayMatch = value.match(/[০-৯0-9]{1,2}/);
      const yearMatch = value.match(/[০-৯0-9]{4}/);

      if (yearMatch) {
        const year = parseBanglaNumber(yearMatch[0]);
        const day = dayMatch
          ? parseBanglaNumber(dayMatch[0])
          : 1;

        return new Date(
          Date.UTC(year, monthIndex, day),
        );
      }
    }
  }

  // English-style date fallback
  const parsed = new Date(value);

  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
}

async function seedPlants() {
  try {
    console.log("🌱 Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI, {
      dbName: "MAH-Garden",
    });

    console.log("✅ MongoDB connected");
    console.log(`📦 Source plants: ${plants.length}`);

    const documents = plants.map((plant) => ({
      name: plant.name,
      quantity: plant.quantity ?? 1,

      category: plant.category,

      plantedAt: parsePlantedDate(plant.plantedDate),

      scientificName: plant.scientificName ?? "",

      status: plant.status ?? "",

      description: plant.note ?? "",

      image: plant.image ?? "",

      location: plant.location ?? "",

      result: plant.result ?? "",

      nursery: plant.nursery ?? "",

      note: plant.note ?? "",

      variety: plant.variety ?? "",

      price: plant.price ?? 0,

      icon: plant.icon ?? "🌱",
    }));

    console.log("🧹 Removing old seed data...");

    await Plant.deleteMany({});

    console.log("📥 Inserting plants...");

    const insertedPlants = await Plant.insertMany(documents);

    console.log("");
    console.log("================================");
    console.log("🌱 PLANT SEED COMPLETE");
    console.log("================================");
    console.log(`Inserted: ${insertedPlants.length}`);
    console.log(`Database: MAH-Garden`);
    console.log(`Collection: plants`);
    console.log("================================");
    console.log("");

    await mongoose.disconnect();

    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("❌ Plant seed failed");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seedPlants();
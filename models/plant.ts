
import mongoose, { Schema, type Model } from "mongoose";

export type PlantStatus =
  | "ফল হয়েছে"
  | "ফল হয়নি"
  | "ফুল হয়েছে"
  | "গাছ ছোট"
  | "গাছ মরে গেছে";

export type PlantCategory =
  | "ফলজ"
  | "সাইট্রাস"
  | "ঔষধি"
  | "মসলা"
  | "আম"
  | "ফুল";

export interface IPlant {
  name: string;
  quantity: number;
  scientificName?: string;
  category: PlantCategory;
  status: PlantStatus;
  description?: string;
  image?: string;
  location?: string;
  result?: string;
  nursery?: string;
  note?: string;
  variety?: string;
  price?: number;
  icon?: string;
  plantedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PlantSchema = new Schema<IPlant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },

    scientificName: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "ফলজ",
        "সাইট্রাস",
        "ঔষধি",
        "মসলা",
        "আম",
        "ফুল",
      ],
    },

    status: {
      type: String,
      required: true,
      enum: [
        "ফল হয়েছে",
        "ফল হয়নি",
        "ফুল হয়েছে",
        "গাছ ছোট",
        "গাছ মরে গেছে",
      ],
      default: "গাছ ছোট",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    result: { type: String, trim: true, default: "" },
    nursery: { type: String, trim: true, default: "" },
    note: { type: String, trim: true, default: "" },
    variety: { type: String, trim: true, default: "" },
    price: { type: Number, min: 0 },
    icon: { type: String, trim: true, default: "🌱" },

    plantedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Plant: Model<IPlant> =
  mongoose.models.Plant ||
  mongoose.model<IPlant>("Plant", PlantSchema);

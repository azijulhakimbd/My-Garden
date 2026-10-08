import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IPlant extends Document {
  name: string;
  quantity: number;
  category:
    | "ফলজ"
    | "সাইট্রাস"
    | "ঔষধি"
    | "মসলা"
    | "আম"
    | "ফুল";

  plantedAt?: Date | null;
  scientificName?: string;
  status?: string;
  description?: string;
  image?: string;
  location?: string;
  result?: string;
  nursery?: string;
  note?: string;
  variety?: string;
  price?: number;
  icon?: string;

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
      default: 1,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: ["ফলজ", "সাইট্রাস", "ঔষধি", "মসলা", "আম", "ফুল"],
    },

    plantedAt: {
      type: Date,
      default: null,
    },

    scientificName: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      trim: true,
      default: "",
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

    result: {
      type: String,
      trim: true,
      default: "",
    },

    nursery: {
      type: String,
      trim: true,
      default: "",
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    variety: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    icon: {
      type: String,
      default: "🌱",
    },
  },
  {
    timestamps: true,
    collection: "plants",
  },
);

export const Plant: Model<IPlant> =
  mongoose.models.Plant ||
  mongoose.model<IPlant>("Plant", PlantSchema);
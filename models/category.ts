import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      type: String,
      default: "Leaf",
    },

    color: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
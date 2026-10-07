import mongoose, { Schema, type Model } from "mongoose";

export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface IGardenTask {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

const GardenTaskSchema = new Schema<IGardenTask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    category: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true },
);

export const GardenTask: Model<IGardenTask> =
  mongoose.models.GardenTask ||
  mongoose.model<IGardenTask>("GardenTask", GardenTaskSchema);
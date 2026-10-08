import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  category?: string;
  dueDate?: Date;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  plantId?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    dueDate: {
      type: Date,
    },

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

    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Task: Model<ITask> =
  mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
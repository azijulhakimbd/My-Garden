import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IActivity extends Document {
  action: string;
  description: string;
  type:
    | "plant"
    | "task"
    | "user"
    | "category"
    | "ai"
    | "system";
  userId?: mongoose.Types.ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "plant",
        "task",
        "user",
        "category",
        "ai",
        "system",
      ],
      default: "system",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);
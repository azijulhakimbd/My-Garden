import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAIChat extends Document {
  question: string;
  answer: string;
  provider?: string;
  model?: string;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AIChatSchema = new Schema<IAIChat>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      default: "Gemini",
    },

    model: {
      type: String,
      default: "",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const AIChat: Model<IAIChat> =
  mongoose.models.AIChat ||
  mongoose.model<IAIChat>("AIChat", AIChatSchema);
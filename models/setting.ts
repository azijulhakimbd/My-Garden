import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ISetting extends Document {
  key: string;
  value: unknown;
  description?: string;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    value: {
      type: Schema.Types.Mixed,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Setting: Model<ISetting> =
  mongoose.models.Setting ||
  mongoose.model<ISetting>("Setting", SettingSchema);
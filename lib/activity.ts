import { Activity } from "@/models/activity";

type ActivityType =
  | "plant"
  | "task"
  | "user"
  | "category"
  | "ai"
  | "system";

export async function createActivity({
  action,
  description,
  type,
  userId,
  metadata,
}: {
  action: string;
  description: string;
  type: ActivityType;
  userId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await Activity.create({
      action,
      description,
      type,
      userId: userId || undefined,
      metadata: metadata || {},
    });
  } catch (error) {
    console.error("Activity logging failed:", error);
  }
}
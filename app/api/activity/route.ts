import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Activity } from "@/models/activity";

export async function GET() {
  try {
    await connectDB();

    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch activity",
      },
      { status: 500 },
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Setting } from "@/models/setting";

export async function GET() {
  try {
    await connectDB();

    const settings = await Setting.find()
      .sort({ key: 1 })
      .lean();

    const data = Object.fromEntries(
      settings.map((item) => [
        item.key,
        item.value,
      ]),
    );

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const entries = Object.entries(body);

    for (const [key, value] of entries) {
      await Setting.findOneAndUpdate(
        { key },
        {
          $set: {
            value,
          },
        },
        {
          upsert: true,
          new: true,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings",
      },
      { status: 500 },
    );
  }
}
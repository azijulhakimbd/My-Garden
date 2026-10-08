import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";
import { Activity } from "@/models/activity";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          scientificName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    const plants = await Plant.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: plants,
    });
  } catch (error) {
    console.error("GET /api/plants:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plants",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Plant name is required",
        },
        { status: 400 },
      );
    }

    const plant = await Plant.create({
      name: body.name.trim(),
      scientificName: body.scientificName?.trim() || "",
      category: body.category?.trim() || "",
      quantity: Number(body.quantity ?? 1),
      status: body.status || "healthy",
      description: body.description?.trim() || "",
      image: body.image?.trim() || "",
      location: body.location?.trim() || "",
      plantedAt: body.plantedAt || undefined,
    });

    await Activity.create({
      action: "plant_created",
      description: `নতুন গাছ যোগ করা হয়েছে: ${plant.name}`,
      type: "plant",
      metadata: {
        plantId: plant._id.toString(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: plant,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/plants:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create plant",
      },
      { status: 500 },
    );
  }
}
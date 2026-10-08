import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";
import { Activity } from "@/models/activity";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  _request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const plant = await Plant.findById(id).lean();

    if (!plant) {
      return NextResponse.json(
        {
          success: false,
          message: "Plant not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: plant,
    });
  } catch (error) {
    console.error("GET /api/plants/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plant",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID",
        },
        { status: 400 },
      );
    }

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

    const plant = await Plant.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name.trim(),
          scientificName:
            body.scientificName?.trim() || "",
          category: body.category?.trim() || "",
          quantity: Number(body.quantity ?? 1),
          status: body.status || "healthy",
          description:
            body.description?.trim() || "",
          image: body.image?.trim() || "",
          location: body.location?.trim() || "",
          plantedAt:
            body.plantedAt || undefined,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!plant) {
      return NextResponse.json(
        {
          success: false,
          message: "Plant not found",
        },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "plant_updated",
      description: `গাছ আপডেট করা হয়েছে: ${plant.name}`,
      type: "plant",
      metadata: {
        plantId: plant._id.toString(),
      },
    });

    return NextResponse.json({
      success: true,
      data: plant,
    });
  } catch (error) {
    console.error("PUT /api/plants/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update plant",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    if (!isValidId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const plant = await Plant.findByIdAndDelete(id);

    if (!plant) {
      return NextResponse.json(
        {
          success: false,
          message: "Plant not found",
        },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "plant_deleted",
      description: `গাছ মুছে ফেলা হয়েছে: ${plant.name}`,
      type: "plant",
      metadata: {
        plantId: plant._id.toString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Plant deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/plants/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete plant",
      },
      { status: 500 },
    );
  }
}
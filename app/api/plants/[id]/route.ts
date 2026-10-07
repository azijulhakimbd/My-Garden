
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET single plant
export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID.",
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
          message: "Plant not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: plant,
    });
  } catch (error) {
    console.error("GET /api/plants/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plant.",
      },
      { status: 500 },
    );
  }
}

// UPDATE plant
export async function PUT(
  request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID.",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    await connectDB();

    const plant = await Plant.findByIdAndUpdate(
      id,
      {
        name: body.name,
        quantity: body.quantity ?? 1,
        scientificName: body.scientificName ?? "",
        category: body.category,
        status: body.status,
        description: body.description ?? "",
        image: body.image ?? "",
        location: body.location ?? "",
        result: body.result ?? body.description ?? "",
        nursery: body.nursery ?? "",
        note: body.note ?? "",
        variety: body.variety ?? "",
        price: body.price,
        icon: body.icon ?? "🌱",
        plantedAt: body.plantedAt
          ? new Date(body.plantedAt)
          : undefined,
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
          message: "Plant not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plant updated successfully.",
      data: plant,
    });
  } catch (error) {
    console.error("PUT /api/plants/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update plant.",
      },
      { status: 500 },
    );
  }
}

// DELETE plant
export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plant ID.",
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
          message: "Plant not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plant deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/plants/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete plant.",
      },
      { status: 500 },
    );
  }
}

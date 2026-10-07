
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";

export async function GET() {
  try {
    await connectDB();

    const plants = await Plant.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: plants,
    });
  } catch (error) {
    console.error("GET /api/plants error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plants.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const plant = await Plant.create({
      name: body.name,
      quantity: body.quantity ?? 1,
      scientificName: body.scientificName ?? "",
      category: body.category,
      status: body.status ?? "গাছ ছোট",
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
    });

    return NextResponse.json(
      {
        success: true,
        data: plant,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST /api/plants error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create plant.",
      },
      {
        status: 500,
      },
    );
  }
}

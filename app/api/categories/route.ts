import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/category";
import { Activity } from "@/models/activity";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
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
          message: "Category name is required",
        },
        { status: 400 },
      );
    }

    const slug =
      body.slug?.trim().toLowerCase() ||
      body.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const exists = await Category.findOne({ slug });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists",
        },
        { status: 409 },
      );
    }

    const category = await Category.create({
      name: body.name.trim(),
      slug,
      description: body.description ?? "",
      icon: body.icon ?? "Leaf",
      color: body.color ?? "",
      active: body.active ?? true,
    });

    await Activity.create({
      action: "category_created",
      description: `নতুন ক্যাটাগরি যোগ করা হয়েছে: ${category.name}`,
      type: "category",
      metadata: {
        categoryId: category._id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
      },
      { status: 500 },
    );
  }
}
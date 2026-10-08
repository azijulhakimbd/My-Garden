import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/category";
import { Activity } from "@/models/activity";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const body = await request.json();

    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          slug: body.slug,
          description: body.description ?? "",
          icon: body.icon ?? "Leaf",
          color: body.color ?? "",
          active: body.active ?? true,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "category_updated",
      description: `ক্যাটাগরি আপডেট করা হয়েছে: ${category.name}`,
      type: "category",
      metadata: {
        categoryId: category._id,
      },
    });

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category",
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "category_deleted",
      description: `ক্যাটাগরি মুছে ফেলা হয়েছে: ${category.name}`,
      type: "category",
      metadata: {
        categoryId: category._id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category",
      },
      { status: 500 },
    );
  }
}
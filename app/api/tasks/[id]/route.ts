import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/task";
import { Activity } from "@/models/activity";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function invalidId(id: string) {
  return !mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  _request: NextRequest,
  context: Context,
) {
  try {
    const { id } = await context.params;

    if (invalidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID" },
        { status: 400 },
      );
    }

    await connectDB();

    const task = await Task.findById(id).lean();

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch task" },
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

    if (invalidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID" },
        { status: 400 },
      );
    }

    await connectDB();

    const body = await request.json();

    const task = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          description: body.description ?? "",
          category: body.category ?? "",
          dueDate: body.dueDate || undefined,
          status: body.status ?? "pending",
          priority: body.priority ?? "medium",
          plantId: body.plantId || undefined,
          notes: body.notes ?? "",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "task_updated",
      description: `কাজ আপডেট করা হয়েছে: ${task.title}`,
      type: "task",
      metadata: {
        taskId: task._id,
      },
    });

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to update task" },
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

    if (invalidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID" },
        { status: 400 },
      );
    }

    await connectDB();

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 },
      );
    }

    await Activity.create({
      action: "task_deleted",
      description: `কাজ মুছে ফেলা হয়েছে: ${task.title}`,
      type: "task",
      metadata: {
        taskId: task._id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to delete task" },
      { status: 500 },
    );
  }
}
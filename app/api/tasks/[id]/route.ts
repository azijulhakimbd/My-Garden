import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { GardenTask } from "@/models/task";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const updates: Record<string, string> = {};
    if (["pending", "in-progress", "completed"].includes(body.status)) {
      updates.status = body.status;
    }
    if (["low", "medium", "high"].includes(body.priority)) {
      updates.priority = body.priority;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid task changes provided." },
        { status: 400 },
      );
    }

    await connectDB();
    const task = await GardenTask.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update task." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID." },
        { status: 400 },
      );
    }

    await connectDB();
    const task = await GardenTask.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Task deleted." });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete task." },
      { status: 500 },
    );
  }
}
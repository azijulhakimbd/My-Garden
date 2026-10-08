import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/task";
import { Activity } from "@/models/activity";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("GET /api/tasks:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasks",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Task title is required",
        },
        { status: 400 },
      );
    }

    const task = await Task.create({
      title: body.title.trim(),
      description: body.description ?? "",
      category: body.category ?? "",
      dueDate: body.dueDate || undefined,
      status: body.status ?? "pending",
      priority: body.priority ?? "medium",
      plantId: body.plantId || undefined,
      notes: body.notes ?? "",
    });

    await Activity.create({
      action: "task_created",
      description: `নতুন কাজ যোগ করা হয়েছে: ${task.title}`,
      type: "task",
      metadata: {
        taskId: task._id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: task,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/tasks:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create task",
      },
      { status: 500 },
    );
  }
}
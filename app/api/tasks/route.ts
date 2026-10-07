import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { GardenTask } from "@/models/task";

export async function GET() {
  try {
    await connectDB();
    const tasks = await GardenTask.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    console.error("GET /api/tasks error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!title || typeof body.category !== "string" || !body.category.trim() ||
      typeof body.dueDate !== "string" || !body.dueDate.trim()) {
      return NextResponse.json(
        { success: false, message: "Title, category, and due date are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const task = await GardenTask.create({
      title,
      description: typeof body.description === "string" ? body.description : "",
      category: body.category.trim(),
      dueDate: body.dueDate.trim(),
      priority: body.priority ?? "medium",
    });

    return NextResponse.json(
      { success: true, data: task },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/tasks error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create task." },
      { status: 500 },
    );
  }
}
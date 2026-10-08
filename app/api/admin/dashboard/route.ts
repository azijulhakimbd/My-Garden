import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { Category } from "@/models/category";
import { Activity } from "@/models/activity";

export async function GET() {
  try {
    await connectDB();

    const [
      plants,
      tasks,
      users,
      categories,
      activities,
    ] = await Promise.all([
      Plant.find()
        .sort({ createdAt: -1 })
        .lean(),

      Task.find()
        .sort({ createdAt: -1 })
        .lean(),

      User.countDocuments(),

      Category.countDocuments(),

      Activity.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
    ]);

    const totalPlants = plants.reduce(
      (sum, plant) =>
        sum + Number(plant.quantity ?? 0),
      0,
    );

    const completedTasks = tasks.filter(
      (task) => task.status === "completed",
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "pending",
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const healthyPlants = plants.filter(
      (plant) =>
        plant.status !== "dead" &&
        plant.status !== "মরে গেছে",
    ).length;

    const completionPercent = tasks.length
      ? Math.round(
          (completedTasks / tasks.length) * 100,
        )
      : 0;

    return NextResponse.json({
      success: true,

      data: {
        stats: {
          totalPlants,
          plantRecords: plants.length,
          totalTasks: tasks.length,
          completedTasks,
          pendingTasks,
          inProgressTasks,
          healthyPlants,
          users,
          categories,
          completionPercent,
        },

        plants: plants.slice(0, 10),

        tasks: tasks.slice(0, 10),

        activities,
      },
    });
  } catch (error) {
    console.error("Dashboard API:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      { status: 500 },
    );
  }
}
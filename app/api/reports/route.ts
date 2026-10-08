import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Plant } from "@/models/plant";
import { Task } from "@/models/task";
import { Category } from "@/models/category";
import { User } from "@/models/user";

export async function GET() {
  try {
    await connectDB();

    const [
      plantCount,
      taskCount,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      categoryCount,
      userCount,
      plantQuantity,
    ] = await Promise.all([
      Plant.countDocuments(),

      Task.countDocuments(),

      Task.countDocuments({
        status: "completed",
      }),

      Task.countDocuments({
        status: "pending",
      }),

      Task.countDocuments({
        status: "in-progress",
      }),

      Category.countDocuments(),

      User.countDocuments(),

      Plant.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]),
    ]);

    const totalQuantity = plantQuantity[0]?.total ?? 0;

    const completionRate = taskCount
      ? Math.round((completedTasks / taskCount) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        plants: {
          records: plantCount,
          quantity: totalQuantity,
        },

        tasks: {
          total: taskCount,
          completed: completedTasks,
          pending: pendingTasks,
          inProgress: inProgressTasks,
          completionRate,
        },

        categories: categoryCount,

        users: userCount,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate report",
      },
      { status: 500 },
    );
  }
}
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { createAuthToken, verifyPassword } from "@/lib/auth";
import { User } from "@/models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = createAuthToken({
      id: String(user._id),
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to login user.",
      },
      { status: 500 },
    );
  }
}

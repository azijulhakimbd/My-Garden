
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  createAuthToken,
  hashPassword,
} from "@/lib/auth";
import { User } from "@/models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    // Basic validation
    if (!name || !email || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, valid email, and password (minimum 6 characters) are required.",
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User already exists with this email.",
        },
        { status: 409 },
      );
    }

    /*
     * IMPORTANT:
     *
     * Public registration can ONLY create a normal user.
     *
     * Do NOT take role from request.body.
     */
    const user = await User.create({
      name,
      email,
      passwordHash: hashPassword(password),

      // Every newly registered account is a user.
      role: "user",
    });

    /*
     * Create token with role.
     */
    const token = createAuthToken({
      id: String(user._id),
      email: user.email,
      name: user.name,
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",

        data: {
          user: {
            id: String(user._id),
            name: user.name,
            email: user.email,
            role: "user",
          },

          token,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "POST /api/auth/register error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user.",
      },
      { status: 500 },
    );
  }
}

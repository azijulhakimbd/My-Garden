import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { AIChat } from "@/models/ai-chat";

export async function GET() {
  try {
    await connectDB();

    const chats = await AIChat.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch AI chats",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.question?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Question is required",
        },
        { status: 400 },
      );
    }

    /*
     * এখানে তোমার existing Gemini/Garden AI logic বসবে।
     * আপাতত example response.
     */

    const answer =
      body.answer?.trim() ||
      "আপনার বাগানের জন্য নিয়মিত পানি দেওয়া, পর্যাপ্ত আলো এবং মাটির আর্দ্রতা পর্যবেক্ষণ করুন।";

    const chat = await AIChat.create({
      question: body.question.trim(),
      answer,
      provider: body.provider ?? "Garden AI",
      model: body.model ?? "",
    });

    return NextResponse.json(
      {
        success: true,
        data: chat,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "AI request failed",
      },
      { status: 500 },
    );
  }
}
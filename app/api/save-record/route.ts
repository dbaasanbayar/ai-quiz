import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { articleValue, summery, quiz } = body;

    // Save to Neon
    const savedRecord = await prisma.saverecord.create({
      data: {
        title: articleValue,
        content: summery,
        quizzes: quiz,
      },
    });
    console.log("Save summery to DB", savedRecord);
    return NextResponse.json(savedRecord);
  } catch (error) {
    console.error("Error saving record:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

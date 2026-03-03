import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { articleValue, contentValue, summary, quiz } = body;
console.log(body)
    // Save to Neon
    const savedRecord = await prisma.saverecord.create({
      data: {
        title: articleValue,
        content: contentValue,
        summary: summary,
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

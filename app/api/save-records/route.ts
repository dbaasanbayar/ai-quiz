import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { articleValue, contentValue, summary, quiz } = body;
console.log(body)
    const savedRecord = await prisma.saverecord.create({
      data: {
        title: articleValue,
        content: contentValue,
        summary: summary,
        quizzes: JSON.stringify(quiz),
        createdat: new Date(),
        updatedat: new Date(),
      },
    });
    console.log("Save summery to DB", JSON.stringify(savedRecord, null, 2));
    return NextResponse.json(savedRecord);
  } catch (error) {
    console.error("Error saving record:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

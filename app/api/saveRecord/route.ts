import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { articleValue, contentValue, generatedValue } = body;

    if (!articleValue || !contentValue) {
      return new NextResponse("Missing article or content", { status: 400 });
    }

    // Save to Neon
    const savedRecord = await prisma.saverecord.create({
      data: {
        article: articleValue,
        content: contentValue,
      },
    });
    return NextResponse.json(savedRecord);
  } catch (error) {
    console.error("Error saving record:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

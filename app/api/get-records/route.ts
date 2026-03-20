import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const records = await prisma.saverecord.findMany({
      orderBy: { createdat: "desc" }, // newest first
      select: {
        id: true,
        title: true,
        summary: true,
        createdat: true,
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
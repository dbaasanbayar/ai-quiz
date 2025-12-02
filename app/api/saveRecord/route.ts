import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { articleValue, contentValue } = body;

    if (!articleValue || !contentValue) {
      return new Response("Missing article or content", { status: 400 });
    }

    // Save to Prisma
    const savedRecord = await prisma.saverecord.create({
      data: {
        article: articleValue,
        content: contentValue,
      },
    });
    return Response.json(savedRecord);
  } catch (error) {
    console.error("Error saving record:", error);
    return new Response("Server error", { status: 500 });
  }
}

// export const GET = async () => {
//   try {
//     const res = await prisma.articles.findMany();
//     return NextResponse.json(res);
//   } catch (error) {
//     console.error("error,aldaa", error);
//   }
// };

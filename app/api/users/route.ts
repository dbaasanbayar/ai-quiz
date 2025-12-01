import { query } from "@/lib/connect_db";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     const res = await query("SELECT * FROM users");
//     console.log("response,hariu", res);

//     return NextResponse.json(res.rows);
//   } catch (error) {
//     console.error("error,aldaa", error);
//   }
// };

// export const user = await prisma.user.findMany();

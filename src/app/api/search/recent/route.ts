import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API tạo Recent Search
export async function POST(req: Request) {
  try {
    const { uid, keyword } = await req.json();

    const parsedUid = Number(uid);
    
    if (!parsedUid || !keyword) {
      return NextResponse.json({ error: "Missing or invalid uid or keyword" }, { status: 400 });
    }
    
    const recentSearch = await prisma.recentSearch.create({
      data: {
        uid: parsedUid,
        keyword,
      },
    });

    return NextResponse.json(recentSearch, { status: 201 });
  } catch (error) {
    console.error("Error creating recent search:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

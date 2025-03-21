import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API tạo Recent Search
export async function POST(req: Request) {
  try {
    const { uid, keyword } = await req.json();

    if (!uid || !keyword) {
      return NextResponse.json({ error: "Missing uid or keyword" }, { status: 400 });
    }

    // Thêm từ khóa tìm kiếm vào RecentSearch
    const recentSearch = await prisma.recentSearch.create({
      data: {
        uid,
        keyword,
      },
    });

    return NextResponse.json(recentSearch, { status: 201 });
  } catch (error) {
    console.error("Error creating recent search:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { uid, keyword } = await req.json();

    if (!uid || !keyword) {
      return NextResponse.json({ error: "Missing uid or keyword" }, { status: 400 });
    }

    // 🔹 Xóa bản ghi cũ nếu từ khóa đã tồn tại
    await prisma.recentSearch.deleteMany({
      where: { uid, keyword },
    });

    // 🔹 Thêm bản ghi mới
    const newSearch = await prisma.recentSearch.create({
      data: {
        uid,
        keyword,
      },
    });

    return NextResponse.json(newSearch, { status: 201 });
  } catch (error) {
    console.error("Error saving recent search:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

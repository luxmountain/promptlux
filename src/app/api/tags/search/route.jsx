import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query) return NextResponse.json({ matched_tags: [], total: 0 });

    const tags = await prisma.tags.findMany({
      where: {
        tag_content: {
          contains: query, // LIKE %query%
          mode: "insensitive", // Không phân biệt hoa thường
        },
      },
      orderBy: {
        tag_content: "asc", // Sắp xếp theo bảng chữ cái (có thể thay đổi nếu cần)
      },
    });

    return NextResponse.json({ matched_tags: tags, total: tags.length });
  } catch (error) {
    console.error("Error searching tags:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

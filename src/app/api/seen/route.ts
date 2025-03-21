import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { uid, pid } = await req.json(); // Nhận uid (người xem) và pid (bài viết)

    if (!uid || !pid) {
      return NextResponse.json({ message: "Missing uid or pid" }, { status: 400 });
    }

    // Kiểm tra xem user đã xem post này chưa
    const existingSeen = await prisma.seen.findUnique({
      where: { uid_pid: { uid, pid } },
    });

    if (!existingSeen) {
      // Nếu chưa xem, thêm mới vào bảng Seen
      await prisma.seen.create({
        data: { uid, pid },
      });

      // Tăng số lượt xem của bài viết
      await prisma.post.update({
        where: { pid },
        data: { seen_count: { increment: 1 } },
      });
    }

    return NextResponse.json({ message: "Seen recorded" }, { status: 200 });
  } catch (error) {
    console.error("Error creating seen:", error);
    return NextResponse.json({ message: "Error creating seen" }, { status: 500 });
  }
}

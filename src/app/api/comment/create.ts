import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, pid, comment, comment_replied_to_id } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!uid || !pid || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Kiểm tra bài viết có tồn tại không
    const postExists = await prisma.post.findUnique({ where: { pid } });

    if (!postExists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Tạo comment mới
    const newComment = await prisma.comment.create({
      data: {
        uid,
        pid,
        comment,
        comment_replied_to_id: comment_replied_to_id || null, // Nếu trả lời comment khác
      },
      include: {
        user: {
          select: { username: true, avatar_image: true },
        },
      },
    });

    return NextResponse.json({
      message: "Comment posted successfully",
      comment: newComment,
    }, { status: 201 });

  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

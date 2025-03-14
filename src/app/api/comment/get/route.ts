import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { pid } = await req.json();

    if (!pid) {
      return NextResponse.json({ message: "Missing pid" }, { status: 400 });
    }

    const postId = Number(pid);
    if (isNaN(postId) || postId <= 0) {
      return NextResponse.json({ message: "Invalid pid" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { pid: postId },
      select: {
        cid: true,
        comment: true,
        created_at: true,
        edited_at: true,
        user: {
          select: {
            uid: true,
            username: true,
            avatar_image: true,
          },
        },
      },
      orderBy: { created_at: "asc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching comments", error: error.message }, { status: 500 });
  }
}

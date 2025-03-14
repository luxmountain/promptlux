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

    const likes = await prisma.like.findMany({
      where: { pid: postId },
      select: {
        uid: true,
        user: {
          select: {
            username: true,
            avatar_image: true,
          },
        },
      },
    });

    return NextResponse.json({ likes, count: likes.length }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching likes", error: error.message }, { status: 500 });
  }
}

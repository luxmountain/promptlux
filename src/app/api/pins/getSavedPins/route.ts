import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ message: "Missing uid" }, { status: 400 });
    }

    const userId = Number(uid);
    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid uid" }, { status: 400 });
    }

    // Lấy danh sách bài viết đã lưu của user
    const savedPosts = await prisma.savedPost.findMany({
      where: { uid: userId },
      include: {
        Post: {
          include: {
            user: true,
            model: true,
          },
        },
      },
    });

    return NextResponse.json(savedPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return NextResponse.json(
      { message: "Error fetching saved posts", error: (error instanceof Error) ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

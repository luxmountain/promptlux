import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const uid = body?.uid;

    if (!uid) {
      return NextResponse.json({ message: "UID is required" }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: { uid: Number(uid) },
      include: {
        user: true,
        model: true,
        comments: true,
        likes: true,
        seen: true,
        post_tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

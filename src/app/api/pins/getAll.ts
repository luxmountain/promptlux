import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        model: true,
        comments: true,
        likes: true,
        seen: true,
        post_tags: { include: { tag: true } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching posts", error }, { status: 500 });
  }
}

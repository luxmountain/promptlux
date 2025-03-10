import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { pid: postId },
      include: { user: true, comments: true, likes: true, seen: true, post_tags: true },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching post", error }, { status: 500 });
  }
}

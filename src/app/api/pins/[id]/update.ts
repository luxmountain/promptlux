import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }

  try {
    const { description, prompt_used, image_url } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { pid: postId },
      data: {
        description,
        prompt_used,
        image_url,
        edited_at: new Date(),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ message: "Error updating post", error }, { status: 500 });
  }
}

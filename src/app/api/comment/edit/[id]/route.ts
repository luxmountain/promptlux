import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { comment } = await req.json();
  const commentId = parseInt(params.id, 10);

  if (isNaN(commentId)) {
    return NextResponse.json({ message: "Invalid comment ID" }, { status: 400 });
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { cid: commentId },
      data: { comment },
    });

    return NextResponse.json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    return NextResponse.json({ message: "Error updating comment", error: error.message }, { status: 500 });
  }
}

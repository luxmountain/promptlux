import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);
  if (isNaN(postId)) {
    return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
  }

  try {
    // Step 1: Delete all related records
    await prisma.like.deleteMany({ where: { pid: postId } });
    await prisma.seen.deleteMany({ where: { pid: postId } });
    await prisma.commentlike.deleteMany({
      where: { Comment: { pid: postId } },
    });
    await prisma.comment.deleteMany({ where: { pid: postId } });
    await prisma.post_tags.deleteMany({ where: { pid: postId } });
    await prisma.savedPost.deleteMany({ where: { pid: postId } });

    // Step 2: Now delete the post
    await prisma.post.delete({
      where: { pid: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting post", error }, { status: 500 });
  }
}

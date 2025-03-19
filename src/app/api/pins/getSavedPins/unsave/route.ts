import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { uid, pid } = await req.json();

    if (!uid || !pid) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const userId = Number(uid);
    const postId = Number(pid);
    if (isNaN(userId) || isNaN(postId)) {
      return NextResponse.json({ message: "uid and pid must be integers" }, { status: 400 });
    }

    // Unsave post
    await prisma.savedPost.delete({
      where: {
        uid_pid: {
          uid: userId,
          pid: postId,
        },
      },
    });

    return NextResponse.json({ message: "Post unsaved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error unsaving post:", error);
    return NextResponse.json(
        { message: "Error saving post", error: (error instanceof Error) ? error.message : "Unknown error" },
        { status: 500 }
      );
  }
}
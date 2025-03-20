import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { uid, cid } = await req.json();

    if (!uid || !cid) {
      return NextResponse.json({ message: "Missing uid or cid" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { uid } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({ where: { cid } });
    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    // Create the like
    const like = await prisma.commentlike.create({
      data: { uid, cid },
    });

    return NextResponse.json(like, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Error liking comment", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

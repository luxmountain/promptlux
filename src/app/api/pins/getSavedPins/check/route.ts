import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { uid, pid } = await req.json();

    if (!uid || !pid) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const savedPost = await prisma.savedPost.findUnique({
      where: {
        uid_pid: {
          uid: Number(uid),
          pid: Number(pid),
        },
      },
    });

    return NextResponse.json({ isSaved: !!savedPost });
  } catch (error) {
    console.error("Error checking saved post:", error);
    return NextResponse.json({ message: "Error checking saved post", error: error.message }, { status: 500 });
  }
}
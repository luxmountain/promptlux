import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { uid, pid } = await req.json();

    if (!uid || !pid) {
      return NextResponse.json({ message: "Missing uid or pid" }, { status: 400 });
    }

    const like = await prisma.like.create({
      data: {
        uid,
        pid,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error liking post", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}

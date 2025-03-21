import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const cid = Number(params.id);


    if (isNaN(cid)) {
      return NextResponse.json({ message: "Invalid comment id" }, { status: 400 });
    }

    const likeCount = await prisma.commentlike.count({
      where: {
        cid: cid,
      },
    });

    const users = await prisma.commentlike.findMany({
      where: {
        cid: cid,
      },
      select: {
        User: true,
      },
    });

    const userList = users.map((like) => like.User);

    return NextResponse.json({ likeCount, users: userList }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error fetching comment likes", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
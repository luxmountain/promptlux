import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const pid = Number(params.id);

    console.log("Checking like for uid:", uid, "and pid:", pid);

    if (!uid || isNaN(pid)) {
      return NextResponse.json({ message: "Missing or invalid uid or pid" }, { status: 400 });
    }

    const like = await prisma.like.findFirst({
      where: {
        uid: Number(uid),
        pid: pid,
      },
    });

    return NextResponse.json({ liked: !!like }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error checking like", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}

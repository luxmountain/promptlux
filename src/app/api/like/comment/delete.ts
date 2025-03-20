import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { uid, cid } = await req.json();

    if (!uid || !cid) {
      return NextResponse.json({ message: "Missing uid or cid" }, { status: 400 });
    }

    const deletedLike = await prisma.commentlike.deleteMany({ // ✅ Corrected model name
      where: {
        uid: Number(uid),
        cid: Number(cid),
      },
    });

    if (deletedLike.count === 0) {
      return NextResponse.json({ message: "Like not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Unlike successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error unliking comment", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const following = await prisma.follower.findMany({
      where: { following_user_id: uid },
      include: {
        followed: {
          select: { uid: true, username: true, avatar_image: true },
        },
      },
    });

    return NextResponse.json({ following: following.map(f => f.followed) });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching following", error: error.message }, { status: 500 });
  }
}

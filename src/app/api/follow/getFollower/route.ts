import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const followers = await prisma.follower.findMany({
      where: { followed_user_id: uid },
      include: {
        following: {
          select: { uid: true, username: true, avatar_image: true },
        },
      },
    });

    return NextResponse.json({ followers: followers.map(f => f.following) });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching followers", error: error.message }, { status: 500 });
  }
}

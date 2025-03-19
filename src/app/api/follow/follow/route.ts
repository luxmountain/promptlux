import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { followingUserId, followedUserId } = await req.json();

    if (!followingUserId || !followedUserId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check if already following
    const existingFollow = await prisma.follower.findUnique({
      where: { following_user_id_followed_user_id: { following_user_id: followingUserId, followed_user_id: followedUserId } },
    });

    if (existingFollow) {
      return NextResponse.json({ message: "Already following this user" }, { status: 400 });
    }

    // Follow user
    await prisma.follower.create({
      data: {
        following_user_id: followingUserId,
        followed_user_id: followedUserId,
      },
    });

    return NextResponse.json({ message: "Followed successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error following user", error }, { status: 500 });
  }
}

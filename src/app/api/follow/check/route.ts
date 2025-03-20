import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { followingUserId, followedUserId } = await req.json();

    if (!followingUserId || !followedUserId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Kiểm tra xem followingUserId có đang follow followedUserId không
    const existingFollow = await prisma.follower.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: followingUserId,
          followed_user_id: followedUserId,
        },
      },
    });

    return NextResponse.json({ isFollowing: !!existingFollow });
  } catch (error) {
    return NextResponse.json({ message: "Error checking follow status", error }, { status: 500 });
  }
}

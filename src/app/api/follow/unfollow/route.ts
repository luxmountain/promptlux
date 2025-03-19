import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { followingUserId, followedUserId } = await req.json();

    if (!followingUserId || !followedUserId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await prisma.follower.delete({
      where: { following_user_id_followed_user_id: { following_user_id: followingUserId, followed_user_id: followedUserId } },
    });

    return NextResponse.json({ message: "Unfollowed successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error unfollowing user", error }, { status: 500 });
  }
}

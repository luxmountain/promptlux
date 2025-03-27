import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    // 1. Find posts created by the user
    const userPosts = await prisma.post.findMany({ where: { uid: userId } });
    const postIds = userPosts.map(post => post.pid);

    if (postIds.length > 0) {
      // 2. Delete entries in Post_tags related to the posts
      await prisma.post_tags.deleteMany({ where: { pid: { in: postIds } } });

      // 3. Delete Seen entries related to the posts
      await prisma.seen.deleteMany({ where: { pid: { in: postIds } } });

      // 4. Delete Likes related to the posts
      await prisma.like.deleteMany({ where: { pid: { in: postIds } } });

      // 5. Delete Comments related to the posts
      await prisma.comment.deleteMany({ where: { pid: { in: postIds } } });
    }

    // 6. Delete other user-related data
    await prisma.commentlike.deleteMany({ where: { uid: userId } });
    await prisma.recentSearch.deleteMany({ where: { uid: userId } });
    await prisma.savedPost.deleteMany({ where: { uid: userId } });
    await prisma.follower.deleteMany({ where: { followed_user_id: userId } });
    await prisma.follower.deleteMany({ where: { following_user_id: userId } });

    // 7. Delete Posts created by the user
    await prisma.post.deleteMany({ where: { uid: userId } });

    // 8. Finally, delete the user
    await prisma.user.delete({ where: { uid: userId } });

    return NextResponse.json({ message: "User and all related data deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user and related data", error }, { status: 500 });
  }
}

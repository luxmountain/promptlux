import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const commentId = parseInt(params.id, 10); // Lấy ID comment từ params

  if (isNaN(commentId)) {
    return NextResponse.json({ message: "Invalid comment ID" }, { status: 400 });
  }

  try {
    // Xóa comment theo commentId
    await prisma.comment.delete({
      where: { cid: commentId },
    });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting comment", error: error.message }, { status: 500 });
  }
}

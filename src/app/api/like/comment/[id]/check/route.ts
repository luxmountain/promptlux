import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = Number(searchParams.get("uid")); // Chuyển uid thành số
    const cid = Number(params.id); // Chuyển cid thành số

    if (isNaN(uid) || isNaN(cid)) {
      return NextResponse.json({ message: "Thiếu hoặc sai định dạng thông tin cần thiết" }, { status: 400 });
    }

    // Kiểm tra xem user đã like chưa
    const isLiked = await prisma.commentlike.findFirst({
      where: { cid, uid },
    });

    return NextResponse.json({ liked: !!isLiked }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi kiểm tra like", error: error.message }, { status: 500 });
  }
}

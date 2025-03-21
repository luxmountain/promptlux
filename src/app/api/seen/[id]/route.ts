import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const pid = Number(params.id); // Extract pid from URL

    if (!pid) {
      return NextResponse.json({ message: "Missing or invalid pid" }, { status: 400 });
    }

    // Fetch users who have seen the post
    const seenList = await prisma.seen.findMany({
      where: { pid },
      include: {
        user: {
          select: { uid: true, username: true, avatar_image: true },
        },
      },
    });

    return NextResponse.json(seenList, { status: 200 });
  } catch (error) {
    console.error("Error fetching seen list:", error);
    return NextResponse.json({ message: "Error fetching seen list" }, { status: 500 });
  }
}

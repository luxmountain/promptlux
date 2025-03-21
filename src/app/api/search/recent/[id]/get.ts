import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const uid = Number(id);

    if (isNaN(uid)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const recentSearches = await prisma.recentSearch.findMany({
      where: { uid },
      orderBy: { searched_at: "desc" },
      take: 10,
    });

    return NextResponse.json(recentSearches, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent searches:", error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

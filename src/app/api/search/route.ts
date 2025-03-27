import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ tags: [], posts: [] });
    }

    // Tìm các tag phù hợp
    const tags = await prisma.tags.findMany({
      where: {
        tag_content: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: { tag_content: true },
    });

    // Tìm các bài post phù hợp theo title hoặc description
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          // { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      select: { title: true, description: true, pid: true },
    });

    return NextResponse.json({
      tags: tags.map((t) => t.tag_content),
      posts: posts.map((p) => ({ title: p.title, description: p.description, pid: p.pid })),
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

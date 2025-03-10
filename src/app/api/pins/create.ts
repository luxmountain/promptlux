import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { uid, description, prompt_used, mid, image_url } = await req.json();

    if (!uid || !description || !mid) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        uid,
        description,
        prompt_used,
        mid,
        image_url,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating post", error }, { status: 500 });
  }
}

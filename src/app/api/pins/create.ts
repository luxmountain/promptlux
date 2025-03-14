import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { uid, description, prompt_used, mid, image_url, title, tags } = await req.json();

    if (!uid || !description || !mid || !image_url || !title) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const userId = Number(uid);
    const modelId = Number(mid);
    if (isNaN(userId) || isNaN(modelId)) {
      return NextResponse.json({ message: "uid and mid must be integers" }, { status: 400 });
    }

    // Check if the model exists before inserting
    const modelExists = await prisma.model_Category.findUnique({
      where: { mid: modelId },
    });

    if (!modelExists) {
      return NextResponse.json({ message: "Model ID (mid) not found" }, { status: 400 });
    }

    // Create post
    const newPost = await prisma.post.create({
      data: {
        uid: userId,
        description,
        prompt_used,
        mid: modelId,
        image_url,
        title,
      },
    });

    // Create post_tags
    if (tags && tags.length > 0) {
      const postTags = tags.map((tag: { tid: number }) => ({
        pid: newPost.pid,
        tid: tag.tid,
      }));
      

      await prisma.post_tags.createMany({
        data: postTags,
      });
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Error creating post", error: error.message },
      { status: 500 }
    );
  }
}
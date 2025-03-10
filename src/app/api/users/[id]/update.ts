import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const userId = parseInt(params.id);
    const body = await req.json();
  
    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }
  
    try {
      const updatedUser = await prisma.user.update({
        where: { uid: userId },
        data: body,
      });
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
    }
  }
  
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const userId = parseInt(params.id);
  
    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }
  
    try {
      await prisma.user.delete({ where: { uid: userId } });
      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
    }
  }
  
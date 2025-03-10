import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { username, email, password } = await req.json();
  
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
  
    try {
      const newUser = await prisma.user.create({
        data: { username, email, password },
      });
      return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}
  
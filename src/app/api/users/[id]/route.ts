import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// 🟢 GET: Lấy thông tin user theo `uid`
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { uid } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched successfully", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error: error.message }, { status: 500 });
  }
}

// 🟡 POST: Tạo user mới
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { username, email, first_name, last_name, password, bio, avatar_image } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { username, email, first_name, last_name, password, bio, avatar_image },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
  }
}

// 🟠 PATCH: Cập nhật thông tin user
export async function PATCH(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { uid, ...updateData } = body;

    if (!uid) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { uid },
      data: updateData,
    });

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 });
  }
}

// 🔴 DELETE: Xóa user theo `uid`
export async function DELETE(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { uid } });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 });
  }
}

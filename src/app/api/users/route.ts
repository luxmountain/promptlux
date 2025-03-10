import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Lấy tất cả users hoặc 1 user cụ thể
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Lấy một user cụ thể
      const user: User | null = await prisma.user.findUnique({
        where: { uid: id },
      });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "User not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ message: "User fetched successfully!", user }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // Lấy danh sách tất cả users
      const users: User[] = await prisma.user.findMany();
      return new Response(
        JSON.stringify({ message: "Users fetched successfully!", users }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error fetching users", error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Tạo user mới
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const newUser: User = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        password: body.password, // Mã hóa mật khẩu nếu cần
        bio: body.bio,
        avatar_image: body.avatar_image,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully!", user: newUser }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error creating user", error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH: Cập nhật thông tin user
export async function PATCH(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedUser: User = await prisma.user.update({
      where: { uid: id },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ message: "User updated successfully!", user: updatedUser }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error updating user", error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE: Xóa user
export async function DELETE(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ message: "User ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await prisma.user.delete({
      where: { uid: id },
    });

    return new Response(
      JSON.stringify({ message: "User deleted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error deleting user", error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
}

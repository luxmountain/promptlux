import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    });

    return new Response(
      JSON.stringify({ message: "User created!", user }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating user", error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return new Response(
      JSON.stringify({ message: "Users fetched!", users }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching users", error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

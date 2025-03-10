import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const users: User[] = await prisma.user.findMany();

    return new Response(
      JSON.stringify({ message: "Users fetched!", users }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Error fetching users", error: errorMessage }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

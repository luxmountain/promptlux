import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Run a simple query to check DB connection
    await prisma.$queryRaw`SELECT 1`;

    return new Response(
      JSON.stringify({ message: "Connected to database: promptLux ✅" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to connect to database ❌",
        error: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

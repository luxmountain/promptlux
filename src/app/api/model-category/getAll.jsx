import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.model_Category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching model categories", error }, { status: 500 });
    }
}

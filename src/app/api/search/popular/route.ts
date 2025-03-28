import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { keyword } = await request.json();

        if (!keyword || typeof keyword !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Invalid keyword' },
                { status: 400 }
            );
        }

        // Check if the keyword already exists
        const existingKeyword = await prisma.popularsearch.findUnique({
            where: { keyword }
        });

        if (existingKeyword) {
            // If keyword exists, update the search count
            const updatedKeyword = await prisma.popularsearch.update({
                where: { keyword },
                data: { search_count: { increment: 1 }, updated_at: new Date() }
            });

            return NextResponse.json({ success: true, data: updatedKeyword });
        }

        // If keyword doesn't exist, create a new record
        const newKeyword = await prisma.popularsearch.create({
            data: {
                keyword,
                search_count: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return NextResponse.json({ success: true, data: newKeyword });
    } catch (error) {
        console.error('Error creating popular search:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
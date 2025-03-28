import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input') || '';

    try {
        // Query the database for matching keywords
        const keywords = await prisma.popularsearch.findMany({
            where: {
                keyword: {
                    contains: input,
                    mode: 'insensitive', // Case-insensitive search
                },
            },
            select: {
                keyword: true,
            },
        });

        return NextResponse.json({ success: true, data: keywords });
    } catch (error) {
        console.error('Error fetching popular keywords:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
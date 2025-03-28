import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Lấy 5 keyword có search_count cao nhất trong 30 ngày qua
        const keywords = await prisma.popularsearch.findMany({
            where: {
                updated_at: {
                    gte: thirtyDaysAgo, // Lọc những bản ghi trong 30 ngày qua
                },
            },
            orderBy: {
                search_count: 'desc', // Sắp xếp theo số lần tìm kiếm giảm dần
            },
            take: 5, // Giới hạn kết quả trả về là 5
            select: {
                keyword: true,
                search_count: true,
            },
        });

        // Lấy ảnh của post đầu tiên phù hợp với title hoặc description của từng keyword
        const keywordData = await Promise.all(
            keywords.map(async (item) => {
                const post = await prisma.post.findFirst({
                    where: {
                        OR: [
                            { title: { contains: item.keyword, mode: "insensitive" } },
                            { description: { contains: item.keyword, mode: "insensitive" } }
                        ],
                    },
                    select: {
                        image_url: true,
                    },
                });
                return {
                    ...item,
                    image_url: post?.image_url || null,
                };
            })
        );

        return NextResponse.json({ success: true, data: keywordData });
    } catch (error) {
        console.error('Error fetching top popular keywords:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

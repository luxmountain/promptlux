import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const uid = Number(params.id);
        const { searchParams } = new URL(req.url);
        const searchId = searchParams.get("searchId");

        if (isNaN(uid)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        if (searchId) {
            // Xóa một mục cụ thể
            const deletedSearch = await prisma.recentSearch.deleteMany({
                where: { id: Number(searchId), uid },
            });

            if (deletedSearch.count === 0) {
                return NextResponse.json({ message: "Search not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Search deleted successfully" }, { status: 200 });
        } else {
            // Xóa toàn bộ lịch sử tìm kiếm của user
            await prisma.recentSearch.deleteMany({ where: { uid } });
            return NextResponse.json({ message: "All searches deleted successfully" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error deleting recent search:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

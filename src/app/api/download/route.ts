import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");

    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(response.body, {
      headers: {
        "Content-Disposition": 'attachment; filename="downloaded_image.jpg"',
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    return NextResponse.json({ error: "Error downloading image" }, { status: 500 });
  }
}

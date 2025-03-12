import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

    const imgurRes = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: { Authorization: `Client-ID 9e07424818a32d1` },
      body: formData,
    });

    const data = await imgurRes.json();
    if (!data.success) throw new Error("Imgur upload failed");

    return NextResponse.json({ link: data.data.link }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
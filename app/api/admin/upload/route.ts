import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Soubor je povinný" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Nepodporovaný typ souboru. Povolené: JPEG, PNG, WebP, AVIF, MP4" },
        { status: 400 }
      );
    }

    // Max 50MB
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "Soubor je příliš velký (max 50MB)" }, { status: 400 });
    }

    const blob = await put(`kajo-studio/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Chyba při nahrávání" }, { status: 500 });
  }
}

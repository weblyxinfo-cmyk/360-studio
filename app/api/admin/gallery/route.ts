import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema/gallery-items";
import { galleryItemSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc } from "drizzle-orm";

function normalizeItem(row: Record<string, unknown>) {
  return {
    id: row.id ?? row.id,
    title: row.title ?? row.title,
    subtitle: row.subtitle ?? row.subtitle ?? null,
    tag: row.tag ?? row.tag ?? null,
    imageUrl: row.imageUrl ?? row.image_url ?? null,
    videoUrl: row.videoUrl ?? row.video_url ?? null,
    hasPlay: row.hasPlay ?? row.has_play ?? false,
    isVisible: row.isVisible ?? row.is_visible ?? true,
    sortOrder: row.sortOrder ?? row.sort_order ?? 0,
    gridSpan: row.gridSpan ?? row.grid_span ?? "1x1",
    createdAt: row.createdAt ?? row.created_at ?? null,
    updatedAt: row.updatedAt ?? row.updated_at ?? null,
  };
}

export async function GET() {
  try {
    const items = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
    const normalized = items.map((item) => normalizeItem(item as unknown as Record<string, unknown>));
    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Get gallery error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = galleryItemSchema.parse(body);

    const newItem = { id: nanoid(), ...data };
    await db.insert(galleryItems).values(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create gallery item error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

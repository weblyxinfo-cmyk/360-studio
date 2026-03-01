import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema/gallery-items";
import { galleryItemSchema } from "@/lib/validators";
import { eq } from "drizzle-orm";

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

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
    if (!item) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
    return NextResponse.json(normalizeItem(item as unknown as Record<string, unknown>));
  } catch (error) {
    console.error("Get gallery item error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = galleryItemSchema.partial().parse(body);

    await db.update(galleryItems).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(galleryItems.id, id));

    const [updated] = await db.select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
    return NextResponse.json(normalizeItem(updated as unknown as Record<string, unknown>));
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    console.error("Update gallery item error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery item error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

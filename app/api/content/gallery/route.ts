import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema/gallery-items";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const visibleItems = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.isVisible, true))
      .orderBy(asc(galleryItems.sortOrder));
    return NextResponse.json(visibleItems);
  } catch {
    return NextResponse.json([]);
  }
}

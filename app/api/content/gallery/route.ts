import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema/gallery-items";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const allItems = await db
      .select()
      .from(galleryItems)
      .orderBy(asc(galleryItems.sortOrder));
    const visibleItems = allItems.filter((item) => item.isVisible);
    return NextResponse.json(visibleItems);
  } catch (error) {
    console.error("Gallery API error:", error);
    return NextResponse.json([]);
  }
}

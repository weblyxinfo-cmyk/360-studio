import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema/gallery-items";
import { galleryItemSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
    return NextResponse.json(items);
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

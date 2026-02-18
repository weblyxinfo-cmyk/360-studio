import { NextResponse } from "next/server";
import { db } from "@/db";
import { availabilityPatterns } from "@/db/schema/availability";
import { availabilityPatternSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const patterns = await db.select().from(availabilityPatterns).orderBy(asc(availabilityPatterns.dayOfWeek));
    return NextResponse.json(patterns);
  } catch (error) {
    console.error("Get patterns error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = availabilityPatternSchema.parse(body);

    const newPattern = { id: nanoid(), ...data };
    await db.insert(availabilityPatterns).values(newPattern);
    return NextResponse.json(newPattern, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create pattern error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID je povinné" }, { status: 400 });

    await db.delete(availabilityPatterns).where(eq(availabilityPatterns.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete pattern error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

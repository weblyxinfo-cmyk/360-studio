import { NextResponse } from "next/server";
import { db } from "@/db";
import { availabilitySlots } from "@/db/schema/availability";
import { availabilitySlotSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc, and, gte, lte } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let query = db.select().from(availabilitySlots).orderBy(asc(availabilitySlots.date), asc(availabilitySlots.timeStart));

    if (from && to) {
      const slots = await db.select().from(availabilitySlots)
        .where(and(gte(availabilitySlots.date, from), lte(availabilitySlots.date, to)))
        .orderBy(asc(availabilitySlots.date), asc(availabilitySlots.timeStart));
      return NextResponse.json(slots);
    }

    const slots = await query;
    return NextResponse.json(slots);
  } catch (error) {
    console.error("Get availability error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = availabilitySlotSchema.parse(body);

    const newSlot = { id: nanoid(), ...data };
    await db.insert(availabilitySlots).values(newSlot);
    return NextResponse.json(newSlot, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create slot error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

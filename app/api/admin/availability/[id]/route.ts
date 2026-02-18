import { NextResponse } from "next/server";
import { db } from "@/db";
import { availabilitySlots } from "@/db/schema/availability";
import { eq } from "drizzle-orm";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(availabilitySlots).where(eq(availabilitySlots.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete slot error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    await db.update(availabilitySlots).set(body).where(eq(availabilitySlots.id, id));

    const [updated] = await db.select().from(availabilitySlots).where(eq(availabilitySlots.id, id)).limit(1);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update slot error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

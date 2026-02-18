import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    if (!booking) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    await db.update(bookings).set(updateData).where(eq(bookings.id, id));

    const [updated] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

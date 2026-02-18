import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    if (!booking) return NextResponse.json({ error: "Rezervace nenalezena" }, { status: 404 });

    // Return limited public info
    return NextResponse.json({
      id: booking.id,
      orderNumber: booking.orderNumber,
      eventDate: booking.eventDate,
      eventTimeStart: booking.eventTimeStart,
      eventTimeEnd: booking.eventTimeEnd,
      eventType: booking.eventType,
      status: booking.status,
      totalAmount: booking.totalAmount,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { payments } from "@/db/schema/payments";
import { availabilitySlots } from "@/db/schema/availability";
import { eq } from "drizzle-orm";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    if (!booking) return NextResponse.json({ error: "Rezervace nenalezena" }, { status: 404 });

    // Update booking status
    await db.update(bookings).set({
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    }).where(eq(bookings.id, id));

    // Free up availability slot
    await db.update(availabilitySlots).set({
      status: "available",
      bookingId: null,
    }).where(eq(availabilitySlots.bookingId, id));

    // Mark payment as cancelled if pending
    const bookingPayments = await db.select().from(payments).where(eq(payments.bookingId, id));
    for (const payment of bookingPayments) {
      if (payment.status === "pending") {
        await db.update(payments).set({
          status: "cancelled",
          updatedAt: new Date().toISOString(),
        }).where(eq(payments.id, payment.id));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

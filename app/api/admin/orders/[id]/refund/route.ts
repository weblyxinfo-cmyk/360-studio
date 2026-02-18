import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { bookings } from "@/db/schema/bookings";
import { eq } from "drizzle-orm";
import { refundPayment } from "@/lib/gopay";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { amount } = body; // amount in hellers, optional (full refund if not provided)

    const [payment] = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    if (!payment) return NextResponse.json({ error: "Platba nenalezena" }, { status: 404 });
    if (payment.status !== "paid") {
      return NextResponse.json({ error: "Lze refundovat pouze zaplacenou platbu" }, { status: 400 });
    }

    const refundAmount = amount || payment.amount;

    if (payment.gopayPaymentId) {
      await refundPayment(payment.gopayPaymentId, refundAmount);
    }

    const isFullRefund = refundAmount >= payment.amount;
    await db.update(payments).set({
      status: isFullRefund ? "refunded" : "partially_refunded",
      refundedAmount: (payment.refundedAmount || 0) + refundAmount,
      updatedAt: new Date().toISOString(),
    }).where(eq(payments.id, id));

    // Update booking status if full refund
    if (isFullRefund && payment.bookingId) {
      await db.update(bookings).set({
        status: "refunded",
        updatedAt: new Date().toISOString(),
      }).where(eq(bookings.id, payment.bookingId));
    }

    return NextResponse.json({ success: true, refundedAmount: refundAmount });
  } catch (error) {
    console.error("Refund error:", error);
    return NextResponse.json({ error: "Chyba při refundaci" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { bookings } from "@/db/schema/bookings";
import { vouchers } from "@/db/schema/vouchers";
import { getPaymentStatus } from "@/lib/gopay";
import { notifyPaymentReceived, sendBookingConfirmation } from "@/lib/notifications";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gopayPaymentId = String(body.id);

    // Verify with GoPay API
    const gopayStatus = await getPaymentStatus(gopayPaymentId);

    // Find our payment record
    const [payment] = await db.select().from(payments)
      .where(eq(payments.gopayPaymentId, gopayPaymentId)).limit(1);

    if (!payment) {
      console.error("Payment not found for GoPay ID:", gopayPaymentId);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Map GoPay states to our states
    let newStatus: "pending" | "paid" | "cancelled" | "refunded" | "partially_refunded" | "failed" = "pending";
    if (gopayStatus.state === "PAID") newStatus = "paid";
    else if (gopayStatus.state === "CANCELED" || gopayStatus.state === "TIMEOUTED") newStatus = "cancelled";
    else if (gopayStatus.state === "REFUNDED") newStatus = "refunded";
    else if (gopayStatus.state === "PARTIALLY_REFUNDED") newStatus = "partially_refunded";

    // Update payment
    await db.update(payments).set({
      gopayState: gopayStatus.state,
      status: newStatus,
      paidAt: newStatus === "paid" ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    }).where(eq(payments.id, payment.id));

    // Update booking if payment is for a booking
    if (payment.bookingId && newStatus === "paid") {
      await db.update(bookings).set({
        status: "paid",
        updatedAt: new Date().toISOString(),
      }).where(eq(bookings.id, payment.bookingId));

      // Send confirmation email
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, payment.bookingId)).limit(1);
      if (booking) {
        await sendBookingConfirmation(booking);
        await notifyPaymentReceived({
          orderNumber: booking.orderNumber,
          amount: payment.amount,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          paymentType: "booking",
        });
      }
    }

    // Update voucher if payment is for a voucher
    if (payment.voucherId && newStatus === "paid") {
      await db.update(vouchers).set({
        status: "active",
        updatedAt: new Date().toISOString(),
      }).where(eq(vouchers.id, payment.voucherId));

      const [voucher] = await db.select().from(vouchers).where(eq(vouchers.id, payment.voucherId)).limit(1);
      if (voucher) {
        await notifyPaymentReceived({
          orderNumber: voucher.code,
          amount: payment.amount,
          customerName: voucher.buyerName || "Zákazník",
          customerEmail: voucher.buyerEmail || "",
          paymentType: "voucher",
        });
      }
    }

    // Cancel booking/voucher if payment failed
    if (newStatus === "cancelled") {
      if (payment.bookingId) {
        await db.update(bookings).set({ status: "cancelled", updatedAt: new Date().toISOString() })
          .where(eq(bookings.id, payment.bookingId));
      }
      if (payment.voucherId) {
        await db.update(vouchers).set({ status: "cancelled", updatedAt: new Date().toISOString() })
          .where(eq(vouchers.id, payment.voucherId));
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("GoPay notify error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

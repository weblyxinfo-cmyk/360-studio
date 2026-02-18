import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { payments } from "@/db/schema/payments";
import { packages } from "@/db/schema/packages";
import { vouchers } from "@/db/schema/vouchers";
import { availabilitySlots } from "@/db/schema/availability";
import { bookingSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { generateOrderNumber } from "@/lib/utils";
import { createPayment } from "@/lib/gopay";
import { notifyNewBooking } from "@/lib/notifications";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // Get package for pricing
    const [pkg] = await db.select().from(packages).where(eq(packages.id, data.packageId)).limit(1);
    if (!pkg) return NextResponse.json({ error: "Balíček nenalezen" }, { status: 400 });

    let totalAmount = pkg.price;
    let discountAmount = 0;

    // Validate voucher if provided
    if (data.voucherCode) {
      const [voucher] = await db.select().from(vouchers)
        .where(eq(vouchers.code, data.voucherCode)).limit(1);

      if (!voucher || voucher.status !== "active") {
        return NextResponse.json({ error: "Neplatný voucher" }, { status: 400 });
      }

      if (voucher.validUntil && new Date(voucher.validUntil) < new Date()) {
        return NextResponse.json({ error: "Voucher expiroval" }, { status: 400 });
      }

      discountAmount = voucher.amount;
      totalAmount = Math.max(0, totalAmount - discountAmount);
    }

    const bookingId = nanoid();
    const orderNumber = generateOrderNumber();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz";

    // Create booking record
    await db.insert(bookings).values({
      id: bookingId,
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      packageId: data.packageId,
      eventDate: data.eventDate,
      eventTimeStart: data.eventTimeStart,
      eventTimeEnd: data.eventTimeEnd,
      eventType: data.eventType,
      eventLocation: data.eventLocation,
      eventNotes: data.eventNotes,
      totalAmount,
      voucherCode: data.voucherCode,
      discountAmount,
      status: totalAmount === 0 ? "paid" : "pending_payment",
    });

    // Mark availability slot as booked
    await db.insert(availabilitySlots).values({
      id: nanoid(),
      date: data.eventDate,
      timeStart: data.eventTimeStart,
      timeEnd: data.eventTimeEnd,
      status: "booked",
      bookingId,
    });

    // Mark voucher as redeemed
    if (data.voucherCode) {
      await db.update(vouchers)
        .set({ status: "redeemed", updatedAt: new Date().toISOString() })
        .where(eq(vouchers.code, data.voucherCode));
    }

    // Notify admin
    await notifyNewBooking({
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      eventDate: data.eventDate,
      eventTimeStart: data.eventTimeStart,
      eventTimeEnd: data.eventTimeEnd,
      eventType: data.eventType,
      eventLocation: data.eventLocation,
      totalAmount,
    });

    // If fully paid by voucher, return success
    if (totalAmount === 0) {
      return NextResponse.json({
        bookingId,
        orderNumber,
        status: "paid",
        redirectUrl: `${siteUrl}/booking/${bookingId}/success`,
      });
    }

    // Create GoPay payment
    try {
      const gopayResponse = await createPayment({
        amount: totalAmount,
        orderNumber,
        description: `Rezervace 360° Photobooth — ${pkg.name}`,
        returnUrl: `${siteUrl}/api/payments/gopay/return?bookingId=${bookingId}`,
        notifyUrl: `${siteUrl}/api/payments/gopay/notify`,
        payerEmail: data.customerEmail,
        payerFirstName: data.customerName.split(" ")[0],
        payerLastName: data.customerName.split(" ").slice(1).join(" "),
      });

      // Create payment record
      await db.insert(payments).values({
        id: nanoid(),
        paymentType: "booking",
        bookingId,
        gopayPaymentId: String(gopayResponse.id),
        gopayState: gopayResponse.state,
        amount: totalAmount,
        currency: "CZK",
        status: "pending",
        gatewayUrl: gopayResponse.gw_url,
      });

      return NextResponse.json({
        bookingId,
        orderNumber,
        status: "pending_payment",
        gatewayUrl: gopayResponse.gw_url,
      });
    } catch (gopayError) {
      console.error("GoPay error:", gopayError);
      // Still return booking info even if GoPay fails
      return NextResponse.json({
        bookingId,
        orderNumber,
        status: "pending_payment",
        error: "Platební brána momentálně nedostupná. Budeme vás kontaktovat.",
      });
    }
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

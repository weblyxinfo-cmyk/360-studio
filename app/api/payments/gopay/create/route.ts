import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { vouchers } from "@/db/schema/vouchers";
import { packages } from "@/db/schema/packages";
import { nanoid } from "nanoid";
import { generateOrderNumber } from "@/lib/utils";
import { createPayment } from "@/lib/gopay";
import { eq } from "drizzle-orm";

// For voucher purchase
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageId, buyerName, buyerEmail, recipientName, recipientEmail, personalMessage, amount } = body;

    if (!buyerEmail || !amount) {
      return NextResponse.json({ error: "Email a částka jsou povinné" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz";
    const voucherId = nanoid();
    const orderNumber = generateOrderNumber();

    // Generate voucher code
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "KAJO-";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    code += "-";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];

    // Create voucher record (pending payment)
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    await db.insert(vouchers).values({
      id: voucherId,
      code,
      packageId: packageId || null,
      recipientName: recipientName || null,
      recipientEmail: recipientEmail || null,
      buyerName: buyerName || null,
      buyerEmail,
      personalMessage: personalMessage || null,
      amount,
      status: "pending_payment",
      validFrom: new Date().toISOString(),
      validUntil: validUntil.toISOString(),
    });

    // Get package name for description
    let description = "Dárkový voucher — 360° Photobooth";
    if (packageId) {
      const [pkg] = await db.select().from(packages).where(eq(packages.id, packageId)).limit(1);
      if (pkg) description = `Dárkový voucher — ${pkg.name}`;
    }

    // Create GoPay payment
    const gopayResponse = await createPayment({
      amount,
      orderNumber,
      description,
      returnUrl: `${siteUrl}/api/payments/gopay/return?voucherId=${voucherId}`,
      notifyUrl: `${siteUrl}/api/payments/gopay/notify`,
      payerEmail: buyerEmail,
      payerFirstName: buyerName?.split(" ")[0],
      payerLastName: buyerName?.split(" ").slice(1).join(" "),
    });

    // Create payment record
    await db.insert(payments).values({
      id: nanoid(),
      paymentType: "voucher",
      voucherId,
      gopayPaymentId: String(gopayResponse.id),
      gopayState: gopayResponse.state,
      amount,
      currency: "CZK",
      status: "pending",
      gatewayUrl: gopayResponse.gw_url,
    });

    return NextResponse.json({
      voucherId,
      code,
      gatewayUrl: gopayResponse.gw_url,
    });
  } catch (error) {
    console.error("Create voucher payment error:", error);
    return NextResponse.json({ error: "Chyba při vytváření platby" }, { status: 500 });
  }
}

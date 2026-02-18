import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { getPaymentStatus } from "@/lib/gopay";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [payment] = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    if (!payment) return NextResponse.json({ error: "Platba nenalezena" }, { status: 404 });

    // If we have a GoPay ID, check live status
    if (payment.gopayPaymentId) {
      try {
        const gopayStatus = await getPaymentStatus(payment.gopayPaymentId);
        return NextResponse.json({
          paymentId: payment.id,
          status: payment.status,
          gopayState: gopayStatus.state,
          amount: payment.amount,
        });
      } catch {
        // Fall through to return cached status
      }
    }

    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      gopayState: payment.gopayState,
      amount: payment.amount,
    });
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

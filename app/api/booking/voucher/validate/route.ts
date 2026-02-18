import { NextResponse } from "next/server";
import { db } from "@/db";
import { vouchers } from "@/db/schema/vouchers";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) return NextResponse.json({ error: "Kód je povinný" }, { status: 400 });

    const [voucher] = await db.select().from(vouchers)
      .where(eq(vouchers.code, code.toUpperCase())).limit(1);

    if (!voucher) return NextResponse.json({ valid: false, error: "Voucher nenalezen" });

    if (voucher.status !== "active") {
      return NextResponse.json({ valid: false, error: "Voucher není aktivní" });
    }

    if (voucher.validUntil && new Date(voucher.validUntil) < new Date()) {
      return NextResponse.json({ valid: false, error: "Voucher expiroval" });
    }

    return NextResponse.json({
      valid: true,
      amount: voucher.amount,
      packageId: voucher.packageId,
    });
  } catch (error) {
    console.error("Validate voucher error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

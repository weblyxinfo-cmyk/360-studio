import { NextResponse } from "next/server";
import { db } from "@/db";
import { vouchers } from "@/db/schema/vouchers";
import { voucherSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { desc } from "drizzle-orm";

function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KAJO-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  code += "-";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function GET() {
  try {
    const allVouchers = await db.select().from(vouchers).orderBy(desc(vouchers.createdAt));
    return NextResponse.json(allVouchers);
  } catch (error) {
    console.error("Get vouchers error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = voucherSchema.parse(body);

    const newVoucher = {
      id: nanoid(),
      code: generateVoucherCode(),
      ...data,
    };

    await db.insert(vouchers).values(newVoucher);
    return NextResponse.json(newVoucher, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create voucher error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

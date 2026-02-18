import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [payment] = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    if (!payment) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
    return NextResponse.json(payment);
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

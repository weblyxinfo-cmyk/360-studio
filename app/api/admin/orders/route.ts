import { NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema/payments";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allPayments = await db.select().from(payments).orderBy(desc(payments.createdAt));
    return NextResponse.json(allPayments);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

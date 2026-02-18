import { NextResponse } from "next/server";
import { db } from "@/db";
import { vouchers } from "@/db/schema/vouchers";
import { voucherSchema } from "@/lib/validators";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [voucher] = await db.select().from(vouchers).where(eq(vouchers.id, id)).limit(1);
    if (!voucher) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
    return NextResponse.json(voucher);
  } catch (error) {
    console.error("Get voucher error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = voucherSchema.partial().parse(body);

    await db.update(vouchers).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(vouchers.id, id));

    const [updated] = await db.select().from(vouchers).where(eq(vouchers.id, id)).limit(1);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    console.error("Update voucher error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(vouchers).where(eq(vouchers.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete voucher error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

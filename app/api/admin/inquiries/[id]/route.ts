import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema/inquiries";
import { eq } from "drizzle-orm";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validStatuses = ["new", "contacted", "closed"];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Neplatný stav" }, { status: 400 });
    }

    const updateData: Record<string, string> = {};
    if (body.status) updateData.status = body.status;

    await db.update(inquiries).set(updateData).where(eq(inquiries.id, id));

    const [updated] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    if (!updated) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update inquiry error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(inquiries).where(eq(inquiries.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema/reviews";
import { reviewSchema } from "@/lib/validators";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
    if (!review) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });
    return NextResponse.json(review);
  } catch (error) {
    console.error("Get review error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = reviewSchema.partial().parse(body);

    await db.update(reviews).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(reviews.id, id));

    const [updated] = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    console.error("Update review error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(reviews).where(eq(reviews.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

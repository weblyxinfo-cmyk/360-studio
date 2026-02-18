import { NextResponse } from "next/server";
import { db } from "@/db";
import { packages, packageFeatures } from "@/db/schema/packages";
import { packageSchema } from "@/lib/validators";
import { eq, asc } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
    if (!pkg) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

    const features = await db
      .select()
      .from(packageFeatures)
      .where(eq(packageFeatures.packageId, id))
      .orderBy(asc(packageFeatures.sortOrder));

    return NextResponse.json({ ...pkg, features });
  } catch (error) {
    console.error("Get package error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = packageSchema.partial().parse(body);

    await db.update(packages).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(packages.id, id));

    const [updated] = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    console.error("Update package error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(packages).where(eq(packages.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete package error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

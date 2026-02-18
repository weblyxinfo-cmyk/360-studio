import { NextResponse } from "next/server";
import { db } from "@/db";
import { packageFeatures } from "@/db/schema/packages";
import { packageFeatureSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { eq, asc } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const features = await db
      .select()
      .from(packageFeatures)
      .where(eq(packageFeatures.packageId, id))
      .orderBy(asc(packageFeatures.sortOrder));
    return NextResponse.json(features);
  } catch (error) {
    console.error("Get features error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = packageFeatureSchema.parse(body);

    const newFeature = { id: nanoid(), packageId: id, ...data };
    await db.insert(packageFeatures).values(newFeature);
    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    console.error("Create feature error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const features: { text: string; sortOrder: number }[] = body;

    // Replace all features for this package
    await db.delete(packageFeatures).where(eq(packageFeatures.packageId, id));

    for (const feature of features) {
      await db.insert(packageFeatures).values({
        id: nanoid(),
        packageId: id,
        text: feature.text,
        sortOrder: feature.sortOrder,
      });
    }

    const updated = await db
      .select()
      .from(packageFeatures)
      .where(eq(packageFeatures.packageId, id))
      .orderBy(asc(packageFeatures.sortOrder));

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update features error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

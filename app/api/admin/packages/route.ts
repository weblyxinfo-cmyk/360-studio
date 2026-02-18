import { NextResponse } from "next/server";
import { db } from "@/db";
import { packages, packageFeatures } from "@/db/schema/packages";
import { packageSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allPackages = await db.select().from(packages).orderBy(asc(packages.sortOrder));

    const result = await Promise.all(
      allPackages.map(async (pkg) => {
        const features = await db
          .select()
          .from(packageFeatures)
          .where(eq(packageFeatures.packageId, pkg.id))
          .orderBy(asc(packageFeatures.sortOrder));
        return { ...pkg, features };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get packages error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = packageSchema.parse(body);

    const newPackage = { id: nanoid(), ...data };
    await db.insert(packages).values(newPackage);
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create package error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

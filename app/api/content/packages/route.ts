import { NextResponse } from "next/server";
import { db } from "@/db";
import { packages, packageFeatures } from "@/db/schema/packages";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const visiblePackages = await db
      .select()
      .from(packages)
      .where(eq(packages.isVisible, true))
      .orderBy(asc(packages.sortOrder));

    const result = await Promise.all(
      visiblePackages.map(async (pkg) => {
        const features = await db
          .select()
          .from(packageFeatures)
          .where(eq(packageFeatures.packageId, pkg.id))
          .orderBy(asc(packageFeatures.sortOrder));
        return { ...pkg, features };
      })
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json([]);
  }
}

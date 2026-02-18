import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema/reviews";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const allReviews = await db
      .select()
      .from(reviews)
      .orderBy(asc(reviews.sortOrder));
    const visibleReviews = allReviews.filter((r) => r.isVisible);
    return NextResponse.json(visibleReviews);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, dbUrl: process.env.TURSO_DATABASE_URL?.substring(0, 30) }, { status: 500 });
  }
}

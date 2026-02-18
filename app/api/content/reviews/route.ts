import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema/reviews";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const visibleReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.isVisible, true))
      .orderBy(asc(reviews.sortOrder));
    return NextResponse.json(visibleReviews);
  } catch {
    return NextResponse.json([]);
  }
}

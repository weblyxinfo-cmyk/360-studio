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
    console.error("Reviews API error:", error);
    return NextResponse.json([]);
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema/reviews";
import { reviewSchema } from "@/lib/validators";
import { nanoid } from "nanoid";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const allReviews = await db.select().from(reviews).orderBy(asc(reviews.sortOrder));
    return NextResponse.json(allReviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = reviewSchema.parse(body);

    const newReview = {
      id: nanoid(),
      ...data,
    };

    await db.insert(reviews).values(newReview);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Neplatná data", details: error }, { status: 400 });
    }
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

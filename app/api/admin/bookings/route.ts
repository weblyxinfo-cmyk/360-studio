import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allBookings = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json(allBookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

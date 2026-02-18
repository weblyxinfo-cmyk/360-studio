import { NextResponse } from "next/server";
import { db } from "@/db";
import { availabilitySlots, availabilityPatterns } from "@/db/schema/availability";
import { eq, and, gte, lte, asc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // YYYY-MM format

    if (!month) {
      return NextResponse.json({ error: "month parameter required (YYYY-MM)" }, { status: 400 });
    }

    const [year, mon] = month.split("-").map(Number);
    const firstDay = `${year}-${String(mon).padStart(2, "0")}-01`;
    const lastDay = new Date(year, mon, 0);
    const lastDayStr = `${year}-${String(mon).padStart(2, "0")}-${String(lastDay.getDate()).padStart(2, "0")}`;

    // Get explicit slots for this month
    const slots = await db.select().from(availabilitySlots)
      .where(and(gte(availabilitySlots.date, firstDay), lte(availabilitySlots.date, lastDayStr)))
      .orderBy(asc(availabilitySlots.date));

    // Get active patterns
    const patterns = await db.select().from(availabilityPatterns)
      .where(eq(availabilityPatterns.isActive, true));

    // Build available dates from patterns (for dates without explicit slots)
    const explicitDates = new Set(slots.map((s) => s.date));
    const availableDates: { date: string; timeStart: string; timeEnd: string; source: string }[] = [];

    // Add explicit available slots
    for (const slot of slots) {
      if (slot.status === "available") {
        availableDates.push({
          date: slot.date,
          timeStart: slot.timeStart,
          timeEnd: slot.timeEnd,
          source: "slot",
        });
      }
    }

    // Add pattern-based availability for dates without explicit slots
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(year, mon - 1, d);
      const dateStr = `${year}-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      if (dateObj < today) continue; // skip past dates
      if (explicitDates.has(dateStr)) continue; // skip dates with explicit slots

      const dayOfWeek = dateObj.getDay();
      const matchingPatterns = patterns.filter((p) => p.dayOfWeek === dayOfWeek);

      for (const pattern of matchingPatterns) {
        availableDates.push({
          date: dateStr,
          timeStart: pattern.timeStart,
          timeEnd: pattern.timeEnd,
          source: "pattern",
        });
      }
    }

    // Sort by date
    availableDates.sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(availableDates);
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

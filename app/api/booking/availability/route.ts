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

    // Build daySummary: per-day counts of total/available/booked/blocked
    const daySummary: Record<string, { total: number; available: number; booked: number; blocked: number }> = {};

    // Count explicit slots per day
    for (const slot of slots) {
      if (!daySummary[slot.date]) {
        daySummary[slot.date] = { total: 0, available: 0, booked: 0, blocked: 0 };
      }
      daySummary[slot.date].total++;
      if (slot.status === "available") daySummary[slot.date].available++;
      else if (slot.status === "booked") daySummary[slot.date].booked++;
      else if (slot.status === "blocked") daySummary[slot.date].blocked++;
    }

    // Add pattern-based days (without explicit slots) — all slots available
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(year, mon - 1, d);
      const dateStr = `${year}-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      if (dateObj < today) continue;
      if (explicitDates.has(dateStr)) continue;

      const dayOfWeek = dateObj.getDay();
      const matchingPatterns = patterns.filter((p) => p.dayOfWeek === dayOfWeek);
      if (matchingPatterns.length > 0) {
        daySummary[dateStr] = { total: matchingPatterns.length, available: matchingPatterns.length, booked: 0, blocked: 0 };
      }
    }

    return NextResponse.json({ available: availableDates, daySummary });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

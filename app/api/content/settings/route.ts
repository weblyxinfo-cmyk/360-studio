import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema/settings";
import { inArray } from "drizzle-orm";

// Public endpoint — only exposes specific non-sensitive settings
const PUBLIC_KEYS = ["faq", "coverage", "contact_email", "contact_phone", "contact_address"];

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, PUBLIC_KEYS));

    const result: Record<string, { value: string; type: string }> = {};
    for (const s of rows) {
      result[s.key] = { value: s.value, type: s.type };
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Get public settings error:", error);
    return NextResponse.json({}, { status: 200 });
  }
}

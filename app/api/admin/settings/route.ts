import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema/settings";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allSettings = await db.select().from(settings);
    const result: Record<string, { value: string; type: string; description: string | null }> = {};
    for (const s of allSettings) {
      result[s.key] = { value: s.value, type: s.type, description: s.description };
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const entries: { key: string; value: string; type?: string; description?: string }[] = body;

    for (const entry of entries) {
      const existing = await db.select().from(settings).where(eq(settings.key, entry.key)).limit(1);

      if (existing.length > 0) {
        await db.update(settings).set({
          value: entry.value,
          ...(entry.type && { type: entry.type }),
          ...(entry.description && { description: entry.description }),
        }).where(eq(settings.key, entry.key));
      } else {
        await db.insert(settings).values({
          key: entry.key,
          value: entry.value,
          type: entry.type || "string",
          description: entry.description || null,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema/inquiries";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    console.error("Get inquiries error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

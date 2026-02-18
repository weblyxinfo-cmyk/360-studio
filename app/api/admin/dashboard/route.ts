import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { reviews } from "@/db/schema/reviews";
import { vouchers } from "@/db/schema/vouchers";
import { payments } from "@/db/schema/payments";
import { count, eq, sql, desc } from "drizzle-orm";

export async function GET() {
  try {
    const [bookingCount] = await db.select({ count: count() }).from(bookings);
    const [reviewCount] = await db.select({ count: count() }).from(reviews).where(eq(reviews.isVisible, true));
    const [voucherCount] = await db.select({ count: count() }).from(vouchers).where(eq(vouchers.status, "active"));
    const [revenueResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments)
      .where(eq(payments.status, "paid"));

    const recentBookings = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    return NextResponse.json({
      stats: {
        totalBookings: bookingCount?.count ?? 0,
        totalReviews: reviewCount?.count ?? 0,
        activeVouchers: voucherCount?.count ?? 0,
        totalRevenue: revenueResult?.total ?? 0,
      },
      recentBookings,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Interní chyba" }, { status: 500 });
  }
}

import AdminShell from "@/components/admin/AdminShell";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { reviews } from "@/db/schema/reviews";
import { vouchers } from "@/db/schema/vouchers";
import { payments } from "@/db/schema/payments";
import { count, eq, sql } from "drizzle-orm";

async function getDashboardStats() {
  try {
    const [bookingCount] = await db.select({ count: count() }).from(bookings);
    const [reviewCount] = await db.select({ count: count() }).from(reviews).where(eq(reviews.isVisible, true));
    const [voucherCount] = await db.select({ count: count() }).from(vouchers).where(eq(vouchers.status, "active"));
    const [revenueResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments)
      .where(eq(payments.status, "paid"));

    return {
      totalBookings: bookingCount?.count ?? 0,
      totalReviews: reviewCount?.count ?? 0,
      activeVouchers: voucherCount?.count ?? 0,
      totalRevenue: revenueResult?.total ?? 0,
    };
  } catch {
    return {
      totalBookings: 0,
      totalReviews: 0,
      activeVouchers: 0,
      totalRevenue: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Přehled vašeho studia</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Celkem rezervací</div>
          <div className="admin-stat-value">{stats.totalBookings}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Recenzí</div>
          <div className="admin-stat-value">{stats.totalReviews}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Aktivních voucherů</div>
          <div className="admin-stat-value">{stats.activeVouchers}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Příjmy</div>
          <div className="admin-stat-value">
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
              minimumFractionDigits: 0,
            }).format(stats.totalRevenue / 100)}
          </div>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>Nedávné rezervace</h2>
        </div>
        <div className="admin-empty">
          <h3>Zatím žádné rezervace</h3>
          <p>Rezervace se zde objeví, jakmile si zákazníci začnou rezervovat.</p>
        </div>
      </div>
    </AdminShell>
  );
}

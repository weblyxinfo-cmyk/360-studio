import AdminShell from "@/components/admin/AdminShell";
import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { reviews } from "@/db/schema/reviews";
import { vouchers } from "@/db/schema/vouchers";
import { payments } from "@/db/schema/payments";
import { packages } from "@/db/schema/packages";
import { count, desc, eq, sql } from "drizzle-orm";

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

async function getRecentBookings() {
  try {
    const recent = await db
      .select({
        id: bookings.id,
        orderNumber: bookings.orderNumber,
        customerName: bookings.customerName,
        customerEmail: bookings.customerEmail,
        eventDate: bookings.eventDate,
        status: bookings.status,
        totalAmount: bookings.totalAmount,
        packageName: packages.name,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .leftJoin(packages, eq(bookings.packageId, packages.id))
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    return recent;
  } catch {
    return [];
  }
}

const statusLabels: Record<string, { label: string; className: string }> = {
  pending_payment: { label: "Čeká na platbu", className: "admin-badge warning" },
  paid: { label: "Zaplaceno", className: "admin-badge success" },
  confirmed: { label: "Potvrzeno", className: "admin-badge success" },
  in_progress: { label: "Probíhá", className: "admin-badge info" },
  completed: { label: "Dokončeno", className: "admin-badge" },
  cancelled: { label: "Zrušeno", className: "admin-badge danger" },
  refunded: { label: "Vráceno", className: "admin-badge danger" },
};

export default async function AdminDashboard() {
  const [stats, recentBookings] = await Promise.all([
    getDashboardStats(),
    getRecentBookings(),
  ]);

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
        {recentBookings.length === 0 ? (
          <div className="admin-empty">
            <h3>Zatím žádné rezervace</h3>
            <p>Rezervace se zde objeví, jakmile si zákazníci začnou rezervovat.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Objednávka</th>
                <th>Zákazník</th>
                <th>Datum akce</th>
                <th>Balíček</th>
                <th>Stav</th>
                <th>Částka</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => {
                const status = statusLabels[booking.status] ?? {
                  label: booking.status,
                  className: "admin-badge",
                };
                return (
                  <tr key={booking.id}>
                    <td className="font-mono">{booking.orderNumber}</td>
                    <td>{booking.customerName}</td>
                    <td>{new Date(booking.eventDate).toLocaleDateString("cs-CZ")}</td>
                    <td>{booking.packageName ?? "—"}</td>
                    <td>
                      <span className={status.className}>{status.label}</span>
                    </td>
                    <td>
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        minimumFractionDigits: 0,
                      }).format(booking.totalAmount / 100)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

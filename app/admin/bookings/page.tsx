"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Calendar, Eye, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface Booking {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  packageId: string | null;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventType: string | null;
  eventLocation: string | null;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
  pending_payment: { label: "Čeká na platbu", badge: "admin-badge-gold" },
  paid: { label: "Zaplaceno", badge: "admin-badge-green" },
  confirmed: { label: "Potvrzeno", badge: "admin-badge-blue" },
  in_progress: { label: "Probíhá", badge: "admin-badge-blue" },
  completed: { label: "Dokončeno", badge: "admin-badge-green" },
  cancelled: { label: "Zrušeno", badge: "admin-badge-red" },
  refunded: { label: "Refundováno", badge: "admin-badge-gray" },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(data); setLoading(false); });
  }, []);

  async function handleCancel(id: string) {
    if (!confirm("Opravdu zrušit tuto rezervaci?")) return;
    await fetch(`/api/admin/bookings/${id}/cancel`, { method: "POST" });
    const res = await fetch("/api/admin/bookings");
    setBookings(await res.json());
  }

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1>Rezervace</h1>
        <p>Správa rezervací a termínů</p>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : bookings.length === 0 ? (
          <div className="admin-empty">
            <Calendar size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <h3>Zatím žádné rezervace</h3>
            <p>Rezervace se zde objeví po objednávkách zákazníků.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Objednávka</th>
                <th>Zákazník</th>
                <th>Datum akce</th>
                <th>Čas</th>
                <th>Typ</th>
                <th>Částka</th>
                <th>Stav</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td><code style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>{b.orderNumber}</code></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.customerName}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{b.customerEmail}</div>
                  </td>
                  <td>{new Date(b.eventDate).toLocaleDateString("cs-CZ")}</td>
                  <td>{b.eventTimeStart} – {b.eventTimeEnd}</td>
                  <td>{b.eventType || "—"}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(b.totalAmount)}</td>
                  <td>
                    <span className={`admin-badge ${statusLabels[b.status]?.badge || "admin-badge-gray"}`}>
                      {statusLabels[b.status]?.label || b.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/bookings/${b.id}`} className="admin-btn admin-btn-outline admin-btn-sm">
                        <Eye size={14} />
                      </Link>
                      {!["cancelled", "refunded", "completed"].includes(b.status) && (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleCancel(b.id)}>
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

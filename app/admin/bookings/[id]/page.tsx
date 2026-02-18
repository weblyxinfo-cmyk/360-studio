"use client";

import { useState, useEffect, use } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ArrowLeft, Save } from "lucide-react";
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
  eventNotes: string | null;
  totalAmount: number;
  voucherCode: string | null;
  discountAmount: number | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBooking(data);
        setStatus(data.status);
        setAdminNotes(data.adminNotes || "");
      });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes }),
    });
    setSaving(false);
  }

  if (!booking) return <AdminShell><div className="admin-empty"><p>Načítání...</p></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Link href="/admin/bookings" style={{ color: "var(--color-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <ArrowLeft size={14} /> Zpět na rezervace
          </Link>
          <h1>Rezervace {booking.orderNumber}</h1>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? "Ukládám..." : "Uložit"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Zákazník</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div><span style={{ color: "var(--color-muted)" }}>Jméno:</span> {booking.customerName}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Email:</span> {booking.customerEmail}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Telefon:</span> {booking.customerPhone || "—"}</div>
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Akce</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div><span style={{ color: "var(--color-muted)" }}>Datum:</span> {new Date(booking.eventDate).toLocaleDateString("cs-CZ")}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Čas:</span> {booking.eventTimeStart} – {booking.eventTimeEnd}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Typ:</span> {booking.eventType || "—"}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Místo:</span> {booking.eventLocation || "—"}</div>
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Platba</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div><span style={{ color: "var(--color-muted)" }}>Částka:</span> <strong>{formatCurrency(booking.totalAmount)}</strong></div>
            {booking.voucherCode && <div><span style={{ color: "var(--color-muted)" }}>Voucher:</span> <code>{booking.voucherCode}</code></div>}
            {booking.discountAmount && booking.discountAmount > 0 && (
              <div><span style={{ color: "var(--color-muted)" }}>Sleva:</span> -{formatCurrency(booking.discountAmount)}</div>
            )}
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Správa</h3>
          <div className="admin-form-group" style={{ marginBottom: "1rem" }}>
            <label>Stav</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending_payment">Čeká na platbu</option>
              <option value="paid">Zaplaceno</option>
              <option value="confirmed">Potvrzeno</option>
              <option value="in_progress">Probíhá</option>
              <option value="completed">Dokončeno</option>
              <option value="cancelled">Zrušeno</option>
              <option value="refunded">Refundováno</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Admin poznámky</label>
            <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} style={{ height: 80, resize: "none" }} />
          </div>
        </div>
      </div>

      {booking.eventNotes && (
        <div className="admin-table-wrapper" style={{ padding: "1.5rem", marginTop: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "0.75rem" }}>Poznámky zákazníka</h3>
          <p style={{ color: "var(--color-muted-light)", fontSize: "0.9rem" }}>{booking.eventNotes}</p>
        </div>
      )}
    </AdminShell>
  );
}

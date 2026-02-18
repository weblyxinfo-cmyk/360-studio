"use client";

import { useState, useEffect, use } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface BookingInfo {
  id: string;
  orderNumber: string;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventType: string | null;
  status: string;
  totalAmount: number;
}

const statusConfig: Record<string, { icon: typeof Clock; label: string; color: string }> = {
  pending_payment: { icon: Clock, label: "Čeká na platbu", color: "var(--color-gold)" },
  paid: { icon: CheckCircle, label: "Zaplaceno", color: "#22c55e" },
  confirmed: { icon: CheckCircle, label: "Potvrzeno", color: "#22c55e" },
  in_progress: { icon: AlertCircle, label: "Probíhá", color: "#3b82f6" },
  completed: { icon: CheckCircle, label: "Dokončeno", color: "#22c55e" },
  cancelled: { icon: XCircle, label: "Zrušeno", color: "#ef4444" },
  refunded: { icon: XCircle, label: "Refundováno", color: "#9ca3af" },
};

export default function BookingStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  useEffect(() => {
    fetch(`/api/booking/${id}`).then((r) => r.json()).then(setBooking);
  }, [id]);

  if (!booking) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-muted)" }}>Načítání...</p>
      </div>
    );
  }

  const config = statusConfig[booking.status] || statusConfig.pending_payment;
  const StatusIcon = config.icon;

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: "32rem" }}>
        <StatusIcon size={64} style={{ margin: "0 auto", color: config.color }} />
        <h1 style={{ marginTop: "1.5rem", fontFamily: "var(--font-heading)", fontSize: "1.875rem", fontWeight: 700 }}>
          {config.label}
        </h1>

        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--color-surface)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-muted)" }}>Objednávka:</span>
              <code style={{ color: "var(--color-gold)" }}>{booking.orderNumber}</code>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-muted)" }}>Datum:</span>
              <strong>{new Date(booking.eventDate).toLocaleDateString("cs-CZ")}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-muted)" }}>Čas:</span>
              <strong>{booking.eventTimeStart} – {booking.eventTimeEnd}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--color-muted)" }}>Částka:</span>
              <strong>{formatCurrency(booking.totalAmount)}</strong>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </div>
  );
}

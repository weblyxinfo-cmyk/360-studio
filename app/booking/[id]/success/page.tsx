"use client";

import { useState, useEffect, use } from "react";
import { CheckCircle } from "lucide-react";
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

export default function BookingSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  useEffect(() => {
    fetch(`/api/booking/${id}`).then((r) => r.json()).then(setBooking);
  }, [id]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "0 1.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: "32rem" }}>
        <CheckCircle size={64} style={{ margin: "0 auto", color: "var(--color-gold)" }} />
        <h1 style={{ marginTop: "1.5rem", fontFamily: "var(--font-heading)", fontSize: "1.875rem", fontWeight: 700 }}>
          Rezervace potvrzena!
        </h1>
        <p style={{ marginTop: "1rem", color: "var(--color-muted)" }}>
          Děkujeme za Vaši rezervaci. Potvrzení jsme Vám zaslali na email.
        </p>

        {booking && (
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
        )}

        <div style={{ marginTop: "2rem" }}>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </div>
  );
}

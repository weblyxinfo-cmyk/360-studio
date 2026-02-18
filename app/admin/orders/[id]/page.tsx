"use client";

import { useState, useEffect, use } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface Payment {
  id: string;
  paymentType: string;
  bookingId: string | null;
  voucherId: string | null;
  gopayPaymentId: string | null;
  gopayState: string | null;
  amount: number;
  currency: string;
  status: string;
  refundedAmount: number | null;
  gatewayUrl: string | null;
  paidAt: string | null;
  createdAt: string;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`).then((r) => r.json()).then(setPayment);
  }, [id]);

  if (!payment) return <AdminShell><div className="admin-empty"><p>Načítání...</p></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <Link href="/admin/orders" style={{ color: "var(--color-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          <ArrowLeft size={14} /> Zpět na objednávky
        </Link>
        <h1>Platba {payment.id.slice(0, 8)}...</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Detail platby</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div><span style={{ color: "var(--color-muted)" }}>ID:</span> {payment.id}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Typ:</span> {payment.paymentType === "booking" ? "Rezervace" : "Voucher"}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Částka:</span> <strong>{formatCurrency(payment.amount)}</strong></div>
            <div><span style={{ color: "var(--color-muted)" }}>Měna:</span> {payment.currency}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Stav:</span> {payment.status}</div>
            {payment.refundedAmount && payment.refundedAmount > 0 && (
              <div><span style={{ color: "var(--color-muted)" }}>Refundováno:</span> {formatCurrency(payment.refundedAmount)}</div>
            )}
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>GoPay</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
            <div><span style={{ color: "var(--color-muted)" }}>GoPay ID:</span> {payment.gopayPaymentId || "—"}</div>
            <div><span style={{ color: "var(--color-muted)" }}>GoPay stav:</span> {payment.gopayState || "—"}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Zaplaceno:</span> {payment.paidAt ? new Date(payment.paidAt).toLocaleString("cs-CZ") : "—"}</div>
            <div><span style={{ color: "var(--color-muted)" }}>Vytvořeno:</span> {new Date(payment.createdAt).toLocaleString("cs-CZ")}</div>
            {payment.bookingId && (
              <div>
                <Link href={`/admin/bookings/${payment.bookingId}`} style={{ color: "var(--color-gold)" }}>
                  Zobrazit rezervaci
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

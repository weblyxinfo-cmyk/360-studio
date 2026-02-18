"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { CreditCard, Eye, RotateCcw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface Payment {
  id: string;
  paymentType: string;
  bookingId: string | null;
  voucherId: string | null;
  gopayPaymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  refundedAmount: number | null;
  paidAt: string | null;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
  pending: { label: "Čeká", badge: "admin-badge-gold" },
  paid: { label: "Zaplaceno", badge: "admin-badge-green" },
  cancelled: { label: "Zrušeno", badge: "admin-badge-red" },
  refunded: { label: "Refundováno", badge: "admin-badge-gray" },
  partially_refunded: { label: "Částečně ref.", badge: "admin-badge-blue" },
  failed: { label: "Selhalo", badge: "admin-badge-red" },
};

export default function OrdersPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => { setPayments(data); setLoading(false); });
  }, []);

  async function handleRefund(id: string) {
    if (!confirm("Opravdu provést plný refund?")) return;
    await fetch(`/api/admin/orders/${id}/refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const res = await fetch("/api/admin/orders");
    setPayments(await res.json());
  }

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1>Objednávky</h1>
        <p>Přehled plateb a transakcí</p>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : payments.length === 0 ? (
          <div className="admin-empty">
            <CreditCard size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <h3>Zatím žádné platby</h3>
            <p>Platby se zde objeví po prvních transakcích.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Typ</th>
                <th>GoPay ID</th>
                <th>Částka</th>
                <th>Stav</th>
                <th>Zaplaceno</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td><code style={{ fontSize: "0.8rem" }}>{p.id.slice(0, 8)}...</code></td>
                  <td>
                    <span className={`admin-badge ${p.paymentType === "booking" ? "admin-badge-blue" : "admin-badge-gold"}`}>
                      {p.paymentType === "booking" ? "Rezervace" : "Voucher"}
                    </span>
                  </td>
                  <td><code style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{p.gopayPaymentId || "—"}</code></td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(p.amount)}</td>
                  <td>
                    <span className={`admin-badge ${statusLabels[p.status]?.badge || "admin-badge-gray"}`}>
                      {statusLabels[p.status]?.label || p.status}
                    </span>
                  </td>
                  <td>{p.paidAt ? new Date(p.paidAt).toLocaleString("cs-CZ") : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/orders/${p.id}`} className="admin-btn admin-btn-outline admin-btn-sm">
                        <Eye size={14} />
                      </Link>
                      {p.status === "paid" && (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleRefund(p.id)}>
                          <RotateCcw size={14} />
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

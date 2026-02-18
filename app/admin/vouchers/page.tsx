"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Pencil, Trash2, X, Copy } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Voucher {
  id: string;
  code: string;
  packageId: string | null;
  recipientName: string | null;
  recipientEmail: string | null;
  buyerName: string | null;
  buyerEmail: string | null;
  personalMessage: string | null;
  amount: number;
  status: string;
  validFrom: string | null;
  validUntil: string | null;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
  pending_payment: { label: "Čeká na platbu", badge: "admin-badge-gold" },
  active: { label: "Aktivní", badge: "admin-badge-green" },
  redeemed: { label: "Uplatněn", badge: "admin-badge-blue" },
  expired: { label: "Expirován", badge: "admin-badge-gray" },
  cancelled: { label: "Zrušen", badge: "admin-badge-red" },
};

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Voucher | null>(null);
  const [form, setForm] = useState({
    recipientName: "", recipientEmail: "", buyerName: "", buyerEmail: "",
    personalMessage: "", amount: 0, status: "active" as string,
    validUntil: "",
  });

  useEffect(() => { fetchVouchers(); }, []);

  async function fetchVouchers() {
    const res = await fetch("/api/admin/vouchers");
    setVouchers(await res.json());
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ recipientName: "", recipientEmail: "", buyerName: "", buyerEmail: "", personalMessage: "", amount: 0, status: "active", validUntil: "" });
    setShowModal(true);
  }

  function openEdit(v: Voucher) {
    setEditing(v);
    setForm({
      recipientName: v.recipientName || "", recipientEmail: v.recipientEmail || "",
      buyerName: v.buyerName || "", buyerEmail: v.buyerEmail || "",
      personalMessage: v.personalMessage || "", amount: v.amount, status: v.status,
      validUntil: v.validUntil || "",
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      recipientName: form.recipientName || undefined,
      recipientEmail: form.recipientEmail || undefined,
      buyerName: form.buyerName || undefined,
      buyerEmail: form.buyerEmail || undefined,
      personalMessage: form.personalMessage || undefined,
      validUntil: form.validUntil || undefined,
    };

    if (editing) {
      await fetch(`/api/admin/vouchers/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/admin/vouchers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setShowModal(false);
    fetchVouchers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat tento voucher?")) return;
    await fetch(`/api/admin/vouchers/${id}`, { method: "DELETE" });
    fetchVouchers();
  }

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Vouchery</h1>
          <p>Správa dárkových poukazů</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Vytvořit voucher
        </button>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : vouchers.length === 0 ? (
          <div className="admin-empty">
            <h3>Zatím žádné vouchery</h3>
            <p>Vytvořte první voucher kliknutím na tlačítko výše.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kód</th>
                <th>Příjemce</th>
                <th>Kupující</th>
                <th>Částka</th>
                <th>Stav</th>
                <th>Platnost do</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <code style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>{v.code}</code>
                      <button onClick={() => navigator.clipboard.writeText(v.code)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: 0 }}>
                        <Copy size={12} />
                      </button>
                    </div>
                  </td>
                  <td>{v.recipientName || "—"}</td>
                  <td>{v.buyerName || "—"}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(v.amount)}</td>
                  <td>
                    <span className={`admin-badge ${statusLabels[v.status]?.badge || "admin-badge-gray"}`}>
                      {statusLabels[v.status]?.label || v.status}
                    </span>
                  </td>
                  <td>{v.validUntil ? new Date(v.validUntil).toLocaleDateString("cs-CZ") : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(v)}><Pencil size={14} /></button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(v.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editing ? "Upravit voucher" : "Nový voucher"}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Jméno příjemce</label>
                    <input value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label>Email příjemce</label>
                    <input type="email" value={form.recipientEmail} onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Jméno kupujícího</label>
                    <input value={form.buyerName} onChange={(e) => setForm({ ...form, buyerName: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label>Email kupujícího</label>
                    <input type="email" value={form.buyerEmail} onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Osobní zpráva</label>
                  <textarea value={form.personalMessage} onChange={(e) => setForm({ ...form, personalMessage: e.target.value })} style={{ height: 80, resize: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Částka (v haléřích)</label>
                    <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} min={100} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Stav</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option value="active">Aktivní</option>
                      <option value="pending_payment">Čeká na platbu</option>
                      <option value="redeemed">Uplatněn</option>
                      <option value="expired">Expirován</option>
                      <option value="cancelled">Zrušen</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Platnost do</label>
                    <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Zrušit</button>
                <button type="submit" className="admin-btn admin-btn-primary">{editing ? "Uložit" : "Vytvořit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

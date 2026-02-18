"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";

interface Review {
  id: string;
  name: string;
  initials: string;
  text: string;
  rating: number;
  eventType: string | null;
  city: string | null;
  isVisible: boolean;
  sortOrder: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState({
    name: "", initials: "", text: "", rating: 5,
    eventType: "", city: "", isVisible: true, sortOrder: 0,
  });

  useEffect(() => { fetchReviews(); }, []);

  async function fetchReviews() {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: "", initials: "", text: "", rating: 5, eventType: "", city: "", isVisible: true, sortOrder: 0 });
    setShowModal(true);
  }

  function openEdit(review: Review) {
    setEditing(review);
    setForm({
      name: review.name, initials: review.initials, text: review.text,
      rating: review.rating, eventType: review.eventType || "",
      city: review.city || "", isVisible: review.isVisible, sortOrder: review.sortOrder,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, eventType: form.eventType || undefined, city: form.city || undefined };

    if (editing) {
      await fetch(`/api/admin/reviews/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setShowModal(false);
    fetchReviews();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat tuto recenzi?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  }

  async function toggleVisibility(review: Review) {
    await fetch(`/api/admin/reviews/${review.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !review.isVisible }),
    });
    fetchReviews();
  }

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Recenze</h1>
          <p>Správa zákaznických recenzí</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Přidat recenzi
        </button>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : reviews.length === 0 ? (
          <div className="admin-empty">
            <h3>Zatím žádné recenze</h3>
            <p>Přidejte první recenzi kliknutím na tlačítko výše.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Jméno</th>
                <th>Text</th>
                <th>Hodnocení</th>
                <th>Akce / Město</th>
                <th>Viditelnost</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div className="admin-user-avatar" style={{ width: 36, height: 36, fontSize: "0.75rem" }}>{r.initials}</div>
                      {r.name}
                    </div>
                  </td>
                  <td style={{ maxWidth: 300 }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.text}</div>
                  </td>
                  <td style={{ color: "var(--color-gold)" }}>{"★".repeat(r.rating)}</td>
                  <td>{[r.eventType, r.city].filter(Boolean).join(", ") || "—"}</td>
                  <td>
                    <button className={`admin-badge ${r.isVisible ? "admin-badge-green" : "admin-badge-gray"}`} onClick={() => toggleVisibility(r)} style={{ cursor: "pointer", border: "none" }}>
                      {r.isVisible ? "Viditelná" : "Skrytá"}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(r)}><Pencil size={14} /></button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(r.id)}><Trash2 size={14} /></button>
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
              <h2>{editing ? "Upravit recenzi" : "Nová recenze"}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Jméno</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Iniciály</label>
                    <input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} maxLength={3} required style={{ width: 80 }} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Text recenze</label>
                  <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required style={{ height: 100, resize: "none" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Hodnocení (1-5)</label>
                    <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
                  </div>
                  <div className="admin-form-group">
                    <label>Typ akce</label>
                    <input value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} placeholder="Svatba, Narozeniny..." />
                  </div>
                  <div className="admin-form-group">
                    <label>Město</label>
                    <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Praha, Brno..." />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Pořadí</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
                  </div>
                  <div className="admin-form-group" style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0.4rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
                      Viditelná na webu
                    </label>
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

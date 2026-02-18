"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, X, Clock } from "lucide-react";

interface Slot {
  id: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: string;
  bookingId: string | null;
  blockReason: string | null;
}

interface Pattern {
  id: string;
  dayOfWeek: number;
  timeStart: string;
  timeEnd: string;
  isActive: boolean;
}

const dayNames = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showPatternModal, setShowPatternModal] = useState(false);
  const [slotForm, setSlotForm] = useState({ date: "", timeStart: "10:00", timeEnd: "12:00", status: "available" as string, blockReason: "" });
  const [patternForm, setPatternForm] = useState({ dayOfWeek: 1, timeStart: "09:00", timeEnd: "21:00", isActive: true });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const [slotsRes, patternsRes] = await Promise.all([
      fetch("/api/admin/availability"),
      fetch("/api/admin/availability/patterns"),
    ]);
    setSlots(await slotsRes.json());
    setPatterns(await patternsRes.json());
    setLoading(false);
  }

  async function handleCreateSlot(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/availability", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...slotForm, blockReason: slotForm.blockReason || undefined }),
    });
    setShowSlotModal(false);
    fetchData();
  }

  async function handleDeleteSlot(id: string) {
    await fetch(`/api/admin/availability/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleCreatePattern(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/availability/patterns", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patternForm),
    });
    setShowPatternModal(false);
    fetchData();
  }

  async function handleDeletePattern(id: string) {
    await fetch(`/api/admin/availability/patterns?id=${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1>Dostupnost</h1>
        <p>Správa termínů a opakujících se vzorů</p>
      </div>

      {/* Patterns section */}
      <div className="admin-table-wrapper" style={{ marginBottom: "2rem" }}>
        <div className="admin-table-header">
          <h2>Opakující se vzory</h2>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowPatternModal(true)}>
            <Plus size={14} /> Přidat vzor
          </button>
        </div>
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : patterns.length === 0 ? (
          <div className="admin-empty"><h3>Žádné vzory</h3><p>Přidejte opakující se dostupnost.</p></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Den</th><th>Od</th><th>Do</th><th>Aktivní</th><th>Akce</th></tr></thead>
            <tbody>
              {patterns.map((p) => (
                <tr key={p.id}>
                  <td>{dayNames[p.dayOfWeek]}</td>
                  <td>{p.timeStart}</td>
                  <td>{p.timeEnd}</td>
                  <td><span className={`admin-badge ${p.isActive ? "admin-badge-green" : "admin-badge-gray"}`}>{p.isActive ? "Ano" : "Ne"}</span></td>
                  <td><button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeletePattern(p.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slots section */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>Konkrétní sloty</h2>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowSlotModal(true)}>
            <Plus size={14} /> Přidat slot
          </button>
        </div>
        {slots.length === 0 ? (
          <div className="admin-empty">
            <Clock size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <h3>Žádné konkrétní sloty</h3>
            <p>Sloty se vytvoří automaticky z vzorů nebo je přidejte ručně.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Datum</th><th>Od</th><th>Do</th><th>Stav</th><th>Důvod blokace</th><th>Akce</th></tr></thead>
            <tbody>
              {slots.map((s) => (
                <tr key={s.id}>
                  <td>{new Date(s.date).toLocaleDateString("cs-CZ")}</td>
                  <td>{s.timeStart}</td>
                  <td>{s.timeEnd}</td>
                  <td>
                    <span className={`admin-badge ${s.status === "available" ? "admin-badge-green" : s.status === "booked" ? "admin-badge-blue" : "admin-badge-red"}`}>
                      {s.status === "available" ? "Volný" : s.status === "booked" ? "Obsazený" : "Blokovaný"}
                    </span>
                  </td>
                  <td>{s.blockReason || "—"}</td>
                  <td><button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeleteSlot(s.id)}><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slot modal */}
      {showSlotModal && (
        <div className="admin-modal-overlay" onClick={() => setShowSlotModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Nový slot</h2>
              <button className="admin-modal-close" onClick={() => setShowSlotModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateSlot}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label>Datum</label>
                  <input type="date" value={slotForm.date} onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Od</label>
                    <input type="time" value={slotForm.timeStart} onChange={(e) => setSlotForm({ ...slotForm, timeStart: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Do</label>
                    <input type="time" value={slotForm.timeEnd} onChange={(e) => setSlotForm({ ...slotForm, timeEnd: e.target.value })} required />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Stav</label>
                  <select value={slotForm.status} onChange={(e) => setSlotForm({ ...slotForm, status: e.target.value })}>
                    <option value="available">Volný</option>
                    <option value="blocked">Blokovaný</option>
                  </select>
                </div>
                {slotForm.status === "blocked" && (
                  <div className="admin-form-group">
                    <label>Důvod blokace</label>
                    <input value={slotForm.blockReason} onChange={(e) => setSlotForm({ ...slotForm, blockReason: e.target.value })} />
                  </div>
                )}
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowSlotModal(false)}>Zrušit</button>
                <button type="submit" className="admin-btn admin-btn-primary">Vytvořit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pattern modal */}
      {showPatternModal && (
        <div className="admin-modal-overlay" onClick={() => setShowPatternModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Nový vzor</h2>
              <button className="admin-modal-close" onClick={() => setShowPatternModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreatePattern}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label>Den v týdnu</label>
                  <select value={patternForm.dayOfWeek} onChange={(e) => setPatternForm({ ...patternForm, dayOfWeek: Number(e.target.value) })}>
                    {dayNames.map((d, i) => <option key={i} value={i}>{d}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Od</label>
                    <input type="time" value={patternForm.timeStart} onChange={(e) => setPatternForm({ ...patternForm, timeStart: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Do</label>
                    <input type="time" value={patternForm.timeEnd} onChange={(e) => setPatternForm({ ...patternForm, timeEnd: e.target.value })} required />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowPatternModal(false)}>Zrušit</button>
                <button type="submit" className="admin-btn admin-btn-primary">Vytvořit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

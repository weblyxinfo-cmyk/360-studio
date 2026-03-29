"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { MessageSquare, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  eventType: string;
  packageType: string | null;
  eventDate: string | null;
  eventLocation: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
  new: { label: "Nová", badge: "admin-badge-gold" },
  contacted: { label: "Kontaktováno", badge: "admin-badge-blue" },
  closed: { label: "Uzavřeno", badge: "admin-badge-gray" },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function fetchData() {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((data) => setInquiries(Array.isArray(data) ? data : []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchData(); }, []);

  async function handleStatusChange(id: string, status: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Opravdu smazat tuto poptávku?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1>Poptávky</h1>
        <p>Přijaté poptávky z kontaktního formuláře</p>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : inquiries.length === 0 ? (
          <div className="admin-empty">
            <MessageSquare size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <h3>Zatím žádné poptávky</h3>
            <p>Poptávky se zde objeví po odeslání formuláře zákazníkem.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Jméno</th>
                <th>Kontakt</th>
                <th>Typ akce</th>
                <th>Balíček</th>
                <th>Datum</th>
                <th>Místo</th>
                <th>Stav</th>
                <th>Přijato</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <>
                  <tr key={inq.id}>
                    <td style={{ fontWeight: 600 }}>
                      {inq.name}
                      {inq.message && (
                        <button
                          onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", marginLeft: "0.3rem", verticalAlign: "middle" }}
                        >
                          {expandedId === inq.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: "0.85rem" }}>{inq.email}</div>
                      {inq.phone && <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{inq.phone}</div>}
                    </td>
                    <td>{inq.eventType}</td>
                    <td>{inq.packageType || "—"}</td>
                    <td>{inq.eventDate || "—"}</td>
                    <td>{inq.eventLocation || "—"}</td>
                    <td>
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`admin-badge ${statusLabels[inq.status]?.badge || "admin-badge-gray"}`}
                        style={{ cursor: "pointer", border: "none", background: "inherit", color: "inherit", fontSize: "inherit", fontWeight: "inherit", padding: "0.25rem 0.5rem" }}
                      >
                        <option value="new">Nová</option>
                        <option value="contacted">Kontaktováno</option>
                        <option value="closed">Uzavřeno</option>
                      </select>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("cs-CZ") : "—"}
                    </td>
                    <td>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(inq.id)}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                  {expandedId === inq.id && inq.message && (
                    <tr key={`${inq.id}-msg`}>
                      <td colSpan={9} style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.02)", fontSize: "0.9rem", color: "var(--color-muted-light)" }}>
                        <strong style={{ color: "var(--color-foreground)" }}>Zpráva:</strong> {inq.message}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { MessageSquare } from "lucide-react";

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

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((data) => setInquiries(Array.isArray(data) ? data : []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td style={{ fontWeight: 600 }}>{inq.name}</td>
                  <td>
                    <div style={{ fontSize: "0.85rem" }}>{inq.email}</div>
                    {inq.phone && <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{inq.phone}</div>}
                  </td>
                  <td>{inq.eventType}</td>
                  <td>{inq.packageType || "—"}</td>
                  <td>{inq.eventDate || "—"}</td>
                  <td>{inq.eventLocation || "—"}</td>
                  <td>
                    <span className={`admin-badge ${statusLabels[inq.status]?.badge || "admin-badge-gray"}`}>
                      {statusLabels[inq.status]?.label || inq.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("cs-CZ") : "—"}
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

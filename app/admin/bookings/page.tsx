"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Calendar, Eye, XCircle, Link2, Copy, Check } from "lucide-react";
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
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; badge: string }> = {
  pending_payment: { label: "Čeká na platbu", badge: "admin-badge-gold" },
  paid: { label: "Zaplaceno", badge: "admin-badge-green" },
  confirmed: { label: "Potvrzeno", badge: "admin-badge-blue" },
  in_progress: { label: "Probíhá", badge: "admin-badge-blue" },
  completed: { label: "Dokončeno", badge: "admin-badge-green" },
  cancelled: { label: "Zrušeno", badge: "admin-badge-red" },
  refunded: { label: "Refundováno", badge: "admin-badge-gray" },
};

interface PackageOption {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [genForm, setGenForm] = useState({ date: "", timeStart: "16:00", timeEnd: "18:00", packageId: "", customerName: "", customerEmail: "" });
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [packageOptions, setPackageOptions] = useState<PackageOption[]>([]);

  useEffect(() => {
    fetchBookings();
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const res = await fetch("/api/booking/packages");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPackageOptions(data);
        setGenForm((prev) => ({ ...prev, packageId: data[0].id }));
      }
    } catch { /* ignore */ }
  }

  async function fetchBookings() {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id: string) {
    if (!confirm("Opravdu zrušit tuto rezervaci?")) return;
    await fetch(`/api/admin/bookings/${id}/cancel`, { method: "POST" });
    fetchBookings();
  }

  function generateLink() {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      date: genForm.date,
      timeStart: genForm.timeStart,
      timeEnd: genForm.timeEnd,
      package: genForm.packageId,
      name: genForm.customerName,
      email: genForm.customerEmail,
    });
    const link = `${baseUrl}/booking?${params.toString()}`;
    setGeneratedLink(link);
    setCopied(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AdminShell>
      <div className="admin-page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1>Rezervace</h1>
            <p>Správa rezervací a termínů</p>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowGenerator(!showGenerator)}
          >
            <Link2 size={16} /> {showGenerator ? "Zavřít" : "Vytvořit odkaz pro platbu"}
          </button>
        </div>
      </div>

      {/* Link Generator */}
      {showGenerator && (
        <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "rgba(200,169,110,0.05)", borderRadius: "12px", border: "1px solid rgba(200,169,110,0.15)" }}>
          <h3 style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}>
            Generátor platebního odkazu
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: "1.5rem" }}>
            Vyplňte údaje zákazníka a vygenerujte odkaz na platbu. Odkaz pošlete zákazníkovi e-mailem.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Jméno zákazníka</label>
              <input value={genForm.customerName} onChange={(e) => setGenForm({ ...genForm, customerName: e.target.value })} placeholder="Jan Novák" />
            </div>
            <div className="form-group">
              <label>E-mail zákazníka</label>
              <input type="email" value={genForm.customerEmail} onChange={(e) => setGenForm({ ...genForm, customerEmail: e.target.value })} placeholder="jan@email.cz" />
            </div>
            <div className="form-group">
              <label>Datum akce</label>
              <input type="date" value={genForm.date} onChange={(e) => setGenForm({ ...genForm, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Balíček</label>
              <select value={genForm.packageId} onChange={(e) => setGenForm({ ...genForm, packageId: e.target.value })}>
                {packageOptions.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — {(pkg.price / 100).toLocaleString("cs-CZ")} Kč ({pkg.duration})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Čas od</label>
              <input type="time" value={genForm.timeStart} onChange={(e) => setGenForm({ ...genForm, timeStart: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Čas do</label>
              <input type="time" value={genForm.timeEnd} onChange={(e) => setGenForm({ ...genForm, timeEnd: e.target.value })} />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              className="admin-btn admin-btn-primary"
              onClick={generateLink}
              disabled={!genForm.date || !genForm.customerName || !genForm.customerEmail}
            >
              Vygenerovat odkaz
            </button>
          </div>
          {generatedLink && (
            <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <input
                readOnly
                value={generatedLink}
                style={{ flex: 1, background: "transparent", border: "none", color: "var(--color-gold)", fontSize: "0.85rem", outline: "none" }}
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={copyLink}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Zkopírováno!" : "Kopírovat"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : bookings.length === 0 ? (
          <div className="admin-empty">
            <Calendar size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
            <h3>Zatím žádné rezervace</h3>
            <p>Rezervace se zde objeví po objednávkách zákazníků.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Objednávka</th>
                <th>Zákazník</th>
                <th>Datum akce</th>
                <th>Čas</th>
                <th>Typ</th>
                <th>Částka</th>
                <th>Stav</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td><code style={{ color: "var(--color-gold)", fontSize: "0.85rem" }}>{b.orderNumber}</code></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.customerName}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{b.customerEmail}</div>
                  </td>
                  <td>{new Date(b.eventDate).toLocaleDateString("cs-CZ")}</td>
                  <td>{b.eventTimeStart} – {b.eventTimeEnd}</td>
                  <td>{b.eventType || "—"}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(b.totalAmount)}</td>
                  <td>
                    <span className={`admin-badge ${statusLabels[b.status]?.badge || "admin-badge-gray"}`}>
                      {statusLabels[b.status]?.label || b.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/bookings/${b.id}`} className="admin-btn admin-btn-outline admin-btn-sm">
                        <Eye size={14} />
                      </Link>
                      {!["cancelled", "refunded", "completed"].includes(b.status) && (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleCancel(b.id)}>
                          <XCircle size={14} />
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

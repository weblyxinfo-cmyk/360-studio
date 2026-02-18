"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, { value: string; type: string; description: string | null }>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [faqJson, setFaqJson] = useState("");
  const [coverageJson, setCoverageJson] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((data) => {
      setSettings(data);
      setContactEmail(data.contact_email?.value || "");
      setContactPhone(data.contact_phone?.value || "");
      setFaqJson(data.faq?.value ? JSON.stringify(JSON.parse(data.faq.value), null, 2) : "[]");
      setCoverageJson(data.coverage?.value ? JSON.stringify(JSON.parse(data.coverage.value), null, 2) : "[]");
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      JSON.parse(faqJson);
      JSON.parse(coverageJson);
    } catch {
      alert("Neplatný JSON formát!");
      setSaving(false);
      return;
    }

    await fetch("/api/admin/settings", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        { key: "contact_email", value: contactEmail, type: "string", description: "Kontaktní email" },
        { key: "contact_phone", value: contactPhone, type: "string", description: "Kontaktní telefon" },
        { key: "faq", value: faqJson, type: "json", description: "FAQ items" },
        { key: "coverage", value: coverageJson, type: "json", description: "Coverage areas" },
      ]),
    });
    setSaving(false);
  }

  if (loading) return <AdminShell><div className="admin-empty"><p>Načítání...</p></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Nastavení</h1>
          <p>Konfigurace webu</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? "Ukládám..." : "Uložit vše"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Kontaktní údaje</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label>Email</label>
              <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Telefon</label>
              <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>FAQ (JSON)</h3>
          <div className="admin-form-group">
            <label>FAQ položky [{"{"}&quot;q&quot;: &quot;...&quot;, &quot;a&quot;: &quot;...&quot;{"}"}]</label>
            <textarea
              value={faqJson}
              onChange={(e) => setFaqJson(e.target.value)}
              style={{ height: 250, resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }}
            />
          </div>
        </div>

        <div className="admin-table-wrapper" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>Pokrytí (JSON)</h3>
          <div className="admin-form-group">
            <label>Regiony [{"{"}&quot;name&quot;: &quot;...&quot;, &quot;badge&quot;: &quot;...&quot;{"}"}]</label>
            <textarea
              value={coverageJson}
              onChange={(e) => setCoverageJson(e.target.value)}
              style={{ height: 200, resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }}
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

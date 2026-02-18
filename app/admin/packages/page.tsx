"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Pencil, Trash2, X, Star, List } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PackageFeature {
  id: string;
  text: string;
  sortOrder: number;
}

interface Package {
  id: string;
  slug: string;
  name: string;
  duration: string;
  price: number;
  priceNote: string | null;
  isFeatured: boolean;
  featuredLabel: string | null;
  isVisible: boolean;
  sortOrder: number;
  features: PackageFeature[];
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [editingFeatures, setEditingFeatures] = useState<Package | null>(null);
  const [features, setFeatures] = useState<{ text: string; sortOrder: number }[]>([]);
  const [form, setForm] = useState({
    slug: "", name: "", duration: "", price: 0, priceNote: "",
    isFeatured: false, featuredLabel: "", isVisible: true, sortOrder: 0,
  });

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    const res = await fetch("/api/admin/packages");
    const data = await res.json();
    setPackages(data);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ slug: "", name: "", duration: "", price: 0, priceNote: "", isFeatured: false, featuredLabel: "", isVisible: true, sortOrder: 0 });
    setShowModal(true);
  }

  function openEdit(pkg: Package) {
    setEditing(pkg);
    setForm({
      slug: pkg.slug, name: pkg.name, duration: pkg.duration, price: pkg.price,
      priceNote: pkg.priceNote || "", isFeatured: pkg.isFeatured,
      featuredLabel: pkg.featuredLabel || "", isVisible: pkg.isVisible, sortOrder: pkg.sortOrder,
    });
    setShowModal(true);
  }

  function openFeatures(pkg: Package) {
    setEditingFeatures(pkg);
    setFeatures(pkg.features.map((f) => ({ text: f.text, sortOrder: f.sortOrder })));
    setShowFeaturesModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      priceNote: form.priceNote || undefined,
      featuredLabel: form.featuredLabel || undefined,
    };

    if (editing) {
      await fetch(`/api/admin/packages/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/admin/packages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setShowModal(false);
    fetchPackages();
  }

  async function handleSaveFeatures(e: React.FormEvent) {
    e.preventDefault();
    if (!editingFeatures) return;
    await fetch(`/api/admin/packages/${editingFeatures.id}/features`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(features),
    });
    setShowFeaturesModal(false);
    fetchPackages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat tento balíček?")) return;
    await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    fetchPackages();
  }

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Balíčky</h1>
          <p>Správa cenových balíčků</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Přidat balíček
        </button>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : packages.length === 0 ? (
          <div className="admin-empty">
            <h3>Zatím žádné balíčky</h3>
            <p>Přidejte první balíček kliknutím na tlačítko výše.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Doba trvání</th>
                <th>Cena</th>
                <th>Funkcí</th>
                <th>Stav</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontWeight: 600 }}>{pkg.name}</span>
                      {pkg.isFeatured && <Star size={14} style={{ color: "var(--color-gold)" }} />}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{pkg.slug}</div>
                  </td>
                  <td>{pkg.duration}</td>
                  <td style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    {pkg.price > 0 ? formatCurrency(pkg.price) : "Na dotaz"}
                  </td>
                  <td>{pkg.features.length}</td>
                  <td>
                    <span className={`admin-badge ${pkg.isVisible ? "admin-badge-green" : "admin-badge-gray"}`}>
                      {pkg.isVisible ? "Viditelný" : "Skrytý"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openFeatures(pkg)} title="Funkce">
                        <List size={14} />
                      </button>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(pkg)}>
                        <Pencil size={14} />
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(pkg.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Package modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editing ? "Upravit balíček" : "Nový balíček"}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Název</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Slug</label>
                    <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required placeholder="zakladni" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Doba trvání</label>
                    <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required placeholder="2 hodiny zábavy" />
                  </div>
                  <div className="admin-form-group">
                    <label>Cena (v haléřích)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min={0} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Poznámka k ceně</label>
                  <input value={form.priceNote} onChange={(e) => setForm({ ...form, priceNote: e.target.value })} placeholder="Ideální pro..." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Pořadí</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
                  </div>
                  <label style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", cursor: "pointer", paddingBottom: "0.4rem" }}>
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                    Zvýrazněný
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", cursor: "pointer", paddingBottom: "0.4rem" }}>
                    <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
                    Viditelný
                  </label>
                </div>
                {form.isFeatured && (
                  <div className="admin-form-group">
                    <label>Label zvýraznění</label>
                    <input value={form.featuredLabel} onChange={(e) => setForm({ ...form, featuredLabel: e.target.value })} placeholder="NEJOBLÍBENĚJŠÍ" />
                  </div>
                )}
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Zrušit</button>
                <button type="submit" className="admin-btn admin-btn-primary">{editing ? "Uložit" : "Vytvořit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Features modal */}
      {showFeaturesModal && editingFeatures && (
        <div className="admin-modal-overlay" onClick={() => setShowFeaturesModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Funkce: {editingFeatures.name}</h2>
              <button className="admin-modal-close" onClick={() => setShowFeaturesModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveFeatures}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                      value={f.text}
                      onChange={(e) => {
                        const updated = [...features];
                        updated[i].text = e.target.value;
                        setFeatures(updated);
                      }}
                      style={{ flex: 1, padding: "0.6rem 0.8rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "var(--color-foreground)", fontSize: "0.9rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setFeatures([...features, { text: "", sortOrder: features.length + 1 }])}
                >
                  <Plus size={14} /> Přidat funkci
                </button>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowFeaturesModal(false)}>Zrušit</button>
                <button type="submit" className="admin-btn admin-btn-primary">Uložit funkce</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

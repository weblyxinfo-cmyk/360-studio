"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Pencil, Trash2, Upload, X, Eye, EyeOff } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string | null;
  tag: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  hasPlay: boolean;
  isVisible: boolean;
  sortOrder: number;
  gridSpan: string | null;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", tag: "", imageUrl: "", videoUrl: "",
    hasPlay: false, isVisible: true, sortOrder: 0, gridSpan: "1x1",
  });

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: "", subtitle: "", tag: "", imageUrl: "", videoUrl: "", hasPlay: false, isVisible: true, sortOrder: 0, gridSpan: "1x1" });
    setShowModal(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({
      title: item.title, subtitle: item.subtitle || "", tag: item.tag || "",
      imageUrl: item.imageUrl || "", videoUrl: item.videoUrl || "",
      hasPlay: item.hasPlay, isVisible: item.isVisible,
      sortOrder: item.sortOrder, gridSpan: item.gridSpan || "1x1",
    });
    setShowModal(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setForm((f) => ({ ...f, imageUrl: data.url }));
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      subtitle: form.subtitle || undefined,
      tag: form.tag || undefined,
      imageUrl: form.imageUrl || undefined,
      videoUrl: form.videoUrl || undefined,
    };

    if (editing) {
      await fetch(`/api/admin/gallery/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setShowModal(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu smazat tuto položku?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchItems();
  }

  return (
    <AdminShell>
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Galerie</h1>
          <p>Správa fotek a videí z akcí</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Přidat položku
        </button>
      </div>

      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-empty"><p>Načítání...</p></div>
        ) : items.length === 0 ? (
          <div className="admin-empty">
            <h3>Galerie je prázdná</h3>
            <p>Přidejte první položku kliknutím na tlačítko výše.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Náhled</th>
                <th>Název</th>
                <th>Tag</th>
                <th>Typ</th>
                <th>Viditelnost</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.imageUrl ? (
                      <div style={{ width: 60, height: 40, borderRadius: 8, overflow: "hidden", background: "var(--color-surface)" }}>
                        <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ width: 60, height: 40, borderRadius: 8, background: "rgba(200,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Upload size={16} style={{ color: "var(--color-gold)", opacity: 0.5 }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{item.subtitle}</div>}
                  </td>
                  <td>{item.tag && <span className="admin-badge admin-badge-gold">{item.tag}</span>}</td>
                  <td>{item.hasPlay ? "Video" : "Foto"}</td>
                  <td>
                    <span className={`admin-badge ${item.isVisible ? "admin-badge-green" : "admin-badge-gray"}`}>
                      {item.isVisible ? "Viditelná" : "Skrytá"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(item)}><Pencil size={14} /></button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
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
              <h2>{editing ? "Upravit položku" : "Nová položka"}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label>Název</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label>Podnázev</label>
                  <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Tag</label>
                    <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Video, Svatba..." />
                  </div>
                  <div className="admin-form-group">
                    <label>Grid span</label>
                    <select value={form.gridSpan} onChange={(e) => setForm({ ...form, gridSpan: e.target.value })}>
                      <option value="1x1">1x1</option>
                      <option value="2x2">2x2 (velký)</option>
                      <option value="2x1">2x1 (široký)</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Obrázek</label>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="URL nebo nahrajte soubor" style={{ flex: 1 }} />
                    <label className="admin-btn admin-btn-outline admin-btn-sm" style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
                      <Upload size={14} /> {uploading ? "Nahrávám..." : "Nahrát"}
                      <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
                    </label>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Video URL</label>
                  <input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://..." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Pořadí</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
                  </div>
                  <label style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", cursor: "pointer", paddingBottom: "0.4rem" }}>
                    <input type="checkbox" checked={form.hasPlay} onChange={(e) => setForm({ ...form, hasPlay: e.target.checked })} />
                    Play tlačítko
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", cursor: "pointer", paddingBottom: "0.4rem" }}>
                    <input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
                    Viditelná
                  </label>
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

"use client";

import { useState, useEffect } from "react";

interface PackageData {
  id: string;
  name: string;
  duration: string;
  price: number;
  priceNote: string | null;
}

export default function VoucherPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({
    buyerName: "", buyerEmail: "",
    recipientName: "", recipientEmail: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  useEffect(() => {
    fetch("/api/content/packages")
      .then((r) => r.json())
      .then((data: PackageData[]) => {
        // Only show packages with a price (not "Na dotaz" ones)
        const available = data.filter((p) => p.price > 0);
        setPackages(available);
        if (available.length > 0) setSelected(available[0].id);
      })
      .catch(() => setPackages([]))
      .finally(() => setPackagesLoading(false));
  }, []);

  const selectedPkg = packages.find((p) => p.id === selected);
  const priceDisplay = selectedPkg ? (selectedPkg.price / 100).toLocaleString("cs-CZ") : "0";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPkg) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/payments/gopay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selected,
          amount: selectedPkg.price,
          buyerName: form.buyerName,
          buyerEmail: form.buyerEmail,
          recipientName: form.recipientName || undefined,
          recipientEmail: form.recipientEmail || undefined,
          personalMessage: form.message || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.gatewayUrl) {
          window.location.href = data.gatewayUrl;
          return;
        }
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)", color: "var(--color-foreground)" }}>
      <nav className="site-nav">
        <a href="/" className="logo">KAJO <span>STUDIO</span> 360</a>
        <a href="/" style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>Zpět na hlavní stránku</a>
      </nav>

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <div className="section-label">Dárkový poukaz</div>
        <h1 className="section-title" style={{ marginBottom: "1rem" }}>
          Darujte zážitek<br />na 360 fotoboothu
        </h1>
        <p className="section-desc" style={{ marginBottom: "3rem" }}>
          Vyberte balíček, vyplňte údaje a zaplaťte online. Voucher s unikátním kódem přijde do 24 hodin na e-mail.
        </p>

        {/* Package selection */}
        {packagesLoading ? (
          <div style={{ textAlign: "center", color: "var(--color-muted)", padding: "3rem 0" }}>Načítání balíčků...</div>
        ) : packages.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--color-muted)", padding: "3rem 0" }}>Momentálně nejsou dostupné žádné balíčky.</div>
        ) : (
          <>
            <div className="voucher-pkg-grid" style={{ display: "grid", gridTemplateColumns: packages.length > 1 ? "repeat(2, 1fr)" : "1fr", gap: "1rem", marginBottom: "2.5rem" }}>
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelected(pkg.id)}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "12px",
                    border: selected === pkg.id ? "2px solid var(--color-gold)" : "2px solid rgba(255,255,255,0.1)",
                    background: selected === pkg.id ? "rgba(200,169,110,0.1)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--color-foreground)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: "0.8rem", color: "var(--color-gold)", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{pkg.name}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>{(pkg.price / 100).toLocaleString("cs-CZ")} Kč</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.3rem" }}>{pkg.duration}</div>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: "1.5rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Údaje kupujícího</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="buyerName">Vaše jméno</label>
                  <input id="buyerName" type="text" required value={form.buyerName} onChange={(e) => setForm({ ...form, buyerName: e.target.value })} placeholder="Jan Novák" />
                </div>
                <div className="form-group">
                  <label htmlFor="buyerEmail">Váš e-mail</label>
                  <input id="buyerEmail" type="email" required value={form.buyerEmail} onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })} placeholder="jan@email.cz" />
                </div>
              </div>

              <h3 style={{ marginBottom: "1.5rem", marginTop: "2rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Údaje obdarovaného</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="recipientName">Jméno obdarovaného</label>
                  <input id="recipientName" type="text" value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} placeholder="Jméno (nepovinné)" />
                </div>
                <div className="form-group">
                  <label htmlFor="recipientEmail">E-mail obdarovaného</label>
                  <input id="recipientEmail" type="email" value={form.recipientEmail} onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })} placeholder="E-mail (nepovinné)" />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "0.5rem" }}>
                <label htmlFor="message">Osobní věnování</label>
                <textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Všechno nejlepší k narozeninám! S láskou..." />
              </div>

              <div className="voucher-payment-box" style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(200,169,110,0.08)", borderRadius: "12px", border: "1px solid rgba(200,169,110,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Celkem k úhradě</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--color-gold)" }}>{priceDisplay} Kč</div>
                </div>
                <button type="submit" className="btn-primary voucher-payment-btn" disabled={status === "sending"} style={{ minWidth: "200px" }}>
                  {status === "sending" ? "Přesměrovávám na platbu..." : "Zaplatit a odeslat voucher"}
                </button>
              </div>

              {status === "error" && (
                <div className="form-error" style={{ marginTop: "1rem" }}>
                  Platební brána není momentálně dostupná. Kontaktujte nás prosím přímo na info@kajostudio360.cz
                </div>
              )}
            </form>

            <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.85rem", color: "var(--color-muted)" }}>
              Platba kartou přes zabezpečenou bránu GoPay. Voucher přijde do 24 hodin po zaplacení.
              <br />Platnost 12 měsíců od zakoupení.
            </p>
          </>
        )}
      </section>
    </div>
  );
}

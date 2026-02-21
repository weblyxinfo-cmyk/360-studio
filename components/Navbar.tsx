"use client";

import { useState } from "react";

const links = [
  { href: "#jak-to-funguje", label: "Jak to funguje" },
  { href: "#balicky", label: "Balíčky" },
  { href: "#galerie", label: "Galerie" },
  { href: "#vouchery", label: "Vouchery" },
  { href: "#recenze", label: "Recenze" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="site-nav">
        <a href="/" className="logo">
          KAJO <span>STUDIO</span> 360
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-socials" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a href="#" aria-label="Instagram" style={{ color: "#E1306C", fontSize: "0.85rem", fontWeight: 600 }}>IG</a>
          <a href="#" aria-label="Facebook" style={{ color: "#1877F2", fontSize: "0.85rem", fontWeight: 600 }}>FB</a>
          <a href="#" aria-label="TikTok" style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>TT</a>
        </div>
        <a href="#kontakt" className="nav-cta">
          Chci nabídku
        </a>
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {mobileOpen && (
        <div className="nav-mobile" onClick={() => setMobileOpen(false)}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="btn-primary" style={{ marginTop: "1rem" }}>
            Chci nabídku
          </a>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";

const links = [
  { href: "#jak-to-funguje", label: "Jak to funguje" },
  { href: "#balicky", label: "Balicky" },
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
        <a href="#kontakt" className="nav-cta">
          Chci nabidku
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
            Chci nabidku
          </a>
        </div>
      )}
    </>
  );
}

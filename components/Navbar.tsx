"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#jak-to-funguje", label: "Jak to funguje" },
  { href: "#balicky", label: "Balíčky" },
  { href: "#galerie", label: "Galerie" },
  { href: "#vouchery", label: "Vouchery" },
  { href: "#recenze", label: "Recenze" },
  { href: "#faq", label: "FAQ" },
  { href: "#poptat", label: "Kontakt" },
];

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17V12a4.83 4.83 0 01-3.77-1.54V6.69h3.77z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`site-nav${scrolled ? " nav-scrolled" : ""}`}>
        <a href="/" className="logo">
          KAJO<span>360</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-socials">
          <a href="https://www.instagram.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#E1306C" }}><IconInstagram /></a>
          <a href="https://www.facebook.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#1877F2" }}><IconFacebook /></a>
          <a href="https://www.tiktok.com/@kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "#fff" }}><IconTikTok /></a>
        </div>
        <a href="#poptat" className="nav-cta">
          Chci nabídku
        </a>
        <button
          className={`nav-mobile-btn${mobileOpen ? " is-open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {mobileOpen && (
        <div className="nav-mobile" onClick={() => setMobileOpen(false)}>
          <div className="nav-mobile-inner" onClick={(e) => e.stopPropagation()}>
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#poptat" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: "0.5rem" }}>
              Chci nabídku
            </a>
            <div className="nav-mobile-socials">
              <a href="https://www.instagram.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#E1306C" }}><IconInstagram /></a>
              <a href="https://www.facebook.com/kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#1877F2" }}><IconFacebook /></a>
              <a href="https://www.tiktok.com/@kajostudio360" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "#fff" }}><IconTikTok /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

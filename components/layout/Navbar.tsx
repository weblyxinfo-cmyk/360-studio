"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-gold/10 transition-all duration-300"
      style={{
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <nav
        className="flex items-center justify-between px-6 py-4 lg:px-12"
        aria-label="Hlavní navigace"
      >
        {/* Logo */}
        <a href="#" className="font-heading text-xl font-extrabold tracking-wide">
          KAJO{" "}
          <span className="text-gold">STUDIO</span>{" "}
          360
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-xs uppercase tracking-wider text-muted font-medium transition-colors hover:text-gold after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="#kontakt">Chci nabídku</Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
          aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col items-center justify-center gap-8 pt-20">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-2xl font-semibold text-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button href="#kontakt" onClick={() => setIsOpen(false)}>
                Chci nabídku
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

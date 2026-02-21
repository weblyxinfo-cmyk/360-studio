"use client";

import { useState } from "react";

interface FAQItem { q: string; a: string; }

const fallbackFaqs: FAQItem[] = [
  { q: "Kolik místa fotobooth potřebuje?", a: "Booth potřebuje prostor přibližně 3x3 metry. Poradíme Vám s rozmístěním na Vaší akci." },
  { q: "Potřebujete přístup k elektřině?", a: "Ano, potřebujeme standardní elektrickou zásuvku 230V v dosahu do 10 metrů od místa instalace." },
  { q: "Jak dlouho trvá instalace?", a: "Instalace trvá přibližně 30-45 minut. Přijedeme s dostatečným předstihem před začátkem akce." },
  { q: "Jak hosté získají svá videa?", a: "Každý host si stáhne video okamžitě přes QR kód přímo na svůj telefon. Po akci obdržíte kompletní galerii." },
  { q: "Fungujete i mimo velká města?", a: "Ano, jezdíme po celé ČR. Doprava je v ceně v rámci našich hlavních regionů, ostatní lokality dle dohody." },
];

export default function FAQ({ data }: { data?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = data && data.length > 0 ? data : fallbackFaqs;

  return (
    <section className="site-section" id="faq">
      <div className="section-label">Časté dotazy</div>
      <h2 className="section-title">Vše, co potřebujete vědět</h2>
      <div className="faq-grid">
        {faqs.map((faq, i) => (
          <div
            className={`faq-item${openIndex === i ? " open" : ""}`}
            key={i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="faq-q">
              {faq.q}
              <span className="faq-q-icon">+</span>
            </div>
            <div className="faq-a">{faq.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

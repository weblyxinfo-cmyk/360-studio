"use client";

import { useState } from "react";

interface FAQItem { q: string; a: string; }

const fallbackFaqs: FAQItem[] = [
  { q: "Kolik mista fotobooth potrebuje?", a: "Booth potrebuje prostor priblizne 3x3 metry. Poradime Vam s rozmistenim na Vasi akci." },
  { q: "Potrebujete pristup k elektrine?", a: "Ano, potrebujeme standardni elektrickou zasuvku 230V v dosahu do 10 metru od mista instalace." },
  { q: "Jak dlouho trva instalace?", a: "Instalace trva priblizne 30-45 minut. Prijedeme s dostatecnym predstihem pred zacatkem akce." },
  { q: "Lze personalizovat pozadi a overlay?", a: "Ano, v Premium balicku zahrnujeme vlastni branding - logo, barvy, pozadi i textove overlaye podle Vasich prani." },
  { q: "Jak hoste ziskaji sva videa?", a: "Kazdy host si stahne video okamzite pres QR kod primo na svuj telefon. Po akci obdrzite kompletni galerii." },
  { q: "Fungujete i mimo velka mesta?", a: "Ano, jezdime po cele CR. Doprava je v cene v ramci nasich hlavnich regionu, ostatni lokality dle dohody." },
];

export default function FAQ({ data }: { data?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = data && data.length > 0 ? data : fallbackFaqs;

  return (
    <section className="site-section" id="faq">
      <div className="section-label">Caste dotazy</div>
      <h2 className="section-title">Vse, co potrebujete vedet</h2>
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

"use client";

import { useState, type FormEvent } from "react";

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

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          eventType: data.get("eventType"),
          packageType: data.get("packageType"),
          eventDate: data.get("date"),
          eventLocation: data.get("location"),
          message: data.get("message") || "Prosím o nezávaznou nabídku.",
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="site-section" id="poptat">
      <div className="section-label">Poptávka</div>
      <h2 className="section-title">
        Poptat 360°
        <br />
        photobooth
      </h2>
      <p className="section-desc">
        Vyplňte formulář a my se Vám ozveme do 24 hodin s nabídkou šitou na míru.
        Platíte až po potvrzení termínu.
      </p>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Jméno a příjmení *</label>
              <input id="name" name="name" type="text" placeholder="Vaše jméno" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
              <input id="email" name="email" type="email" placeholder="vas@email.cz" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Telefon *</label>
              <input id="phone" name="phone" type="tel" placeholder="+420 ..." required />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Typ akce *</label>
              <select id="eventType" name="eventType" required>
                <option value="">Vyberte typ akce...</option>
                <option value="svatba">Svatba</option>
                <option value="narozeniny">Narozeniny</option>
                <option value="firemni">Firemní akce</option>
                <option value="ples">Ples / Gala</option>
                <option value="jine">Jiné</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferovaný termín *</label>
              <input id="date" name="date" type="date" required />
            </div>
            <div className="form-group">
              <label htmlFor="packageType">Balíček</label>
              <select id="packageType" name="packageType">
                <option value="">Nevím, poraďte mi</option>
                <option value="zakladni">Základní (7 990 Kč / 1h)</option>
                <option value="premium">Premium (12 990 Kč / 2h)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Místo konání</label>
              <input id="location" name="location" type="text" placeholder="Město nebo adresa" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Poznámka</label>
            <textarea
              id="message"
              name="message"
              placeholder="Máte speciální požadavky? Napište nám..."
            />
          </div>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Odesílám..." : "Odeslat poptávku"}
          </button>
          {status === "success" && (
            <div className="form-success">
              Děkujeme! Ověříme dostupnost termínu a ozveme se Vám do 24 hodin.
              Pokud je to urgentní, volejte na 777 987 543.
            </div>
          )}
          {status === "error" && (
            <div className="form-error">
              Nastala chyba. Zkuste to prosím znovu nebo nás kontaktujte přímo na info@kajostudio360.cz
            </div>
          )}
        </form>
        <div className="contact-info">
          <div className="contact-block">
            <h4>Telefon</h4>
            <a href="tel:+420777987543">Kateřina Vítková — 777 987 543</a>
            <br />
            <a href="tel:+420730172812">Josef Perný — 730 172 812</a>
          </div>
          <div className="contact-block">
            <h4>E-mail</h4>
            <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>
          </div>
          <div className="contact-block">
            <h4>Adresa</h4>
            <p>
              <strong style={{ fontSize: "1.1rem" }}>KAJO Studio 360</strong>
              <br />
              Československé armády 1175
              <br />
              Slavkov u Brna 684 01
            </p>
          </div>
          <div className="contact-block">
            <h4>Sociální sítě</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram" style={{ color: "#E1306C" }}><IconInstagram /></a>
              <a href="#" className="social-link" aria-label="Facebook" style={{ color: "#1877F2" }}><IconFacebook /></a>
              <a href="#" className="social-link" aria-label="TikTok" style={{ color: "#fff" }}><IconTikTok /></a>
            </div>
          </div>
          <div className="contact-response-box">
            <h4>Rychlá odpověď</h4>
            <p>
              Na každou poptávku odpovídáme do 24 hodin. Většinou se ozveme
              ještě tentýž den.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

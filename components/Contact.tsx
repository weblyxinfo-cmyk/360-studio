"use client";

import { useState, type FormEvent } from "react";

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
          date: data.get("date"),
          location: data.get("location"),
          message: data.get("message"),
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
    <section className="site-section" id="kontakt">
      <div className="section-label">Poptavka</div>
      <h2 className="section-title">
        Mate zajem?
        <br />
        Ozvete se nam
      </h2>
      <p className="section-desc">
        Vyplnte formular a my se Vam co nejdrive ozveme s nabidkou sitou na miru.
        Platite az po potvrzeni terminu.
      </p>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Jmeno</label>
              <input id="name" name="name" type="text" placeholder="Vase jmeno" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="vas@email.cz" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input id="phone" name="phone" type="tel" placeholder="+420 ..." />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Typ akce</label>
              <select id="eventType" name="eventType">
                <option value="">Vyberte typ akce...</option>
                <option value="svatba">Svatba</option>
                <option value="narozeniny">Narozeniny</option>
                <option value="firemni">Firemni akce</option>
                <option value="ples">Ples / Gala</option>
                <option value="jine">Jine</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Datum akce</label>
              <input id="date" name="date" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="location">Misto konani</label>
              <input id="location" name="location" type="text" placeholder="Mesto nebo adresa" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Zprava</label>
            <textarea
              id="message"
              name="message"
              placeholder="Popiste nam Vasi predstavu..."
            />
          </div>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Odesilam..." : "Odeslat poptavku"}
          </button>
          {status === "success" && (
            <div className="form-success">
              Dekujeme! Vase poptavka byla odeslana. Ozveme se Vam do 24 hodin.
            </div>
          )}
          {status === "error" && (
            <div className="form-error">
              Nastala chyba. Zkuste to prosim znovu nebo nas kontaktujte primo.
            </div>
          )}
        </form>
        <div className="contact-info">
          <div className="contact-block">
            <h4>E-mail</h4>
            <a href="mailto:info@kajostudio360.cz">info@kajostudio360.cz</a>
          </div>
          <div className="contact-block">
            <h4>Adresa</h4>
            <p>
              <strong style={{ fontSize: "1.1rem" }}>KAJO Studio 360</strong>
              <br />
              Ceskoslovenske armady 1175
              <br />
              Slavkov u Brna 684 01
            </p>
          </div>
          <div className="contact-block">
            <h4>Socialni site</h4>
            <div className="social-links">
              <a href="#" className="social-link" style={{ color: "#E1306C" }}>IG</a>
              <a href="#" className="social-link" style={{ color: "#1877F2" }}>FB</a>
              <a href="#" className="social-link" style={{ color: "#000" }}>TT</a>
            </div>
          </div>
          <div className="contact-response-box">
            <h4>Rychla odpoved</h4>
            <p>
              Snazime se odpovedet jeste v den Vasi zpravy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

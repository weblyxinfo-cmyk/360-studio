"use client";

import { useState, useEffect } from "react";

function getConsent(): string | null {
  const match = document.cookie.split("; ").find((c) => c.startsWith("cookie-consent="));
  return match ? match.split("=")[1] : null;
}

function setConsent(value: string) {
  document.cookie =
    `cookie-consent=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function accept() {
    setConsent("accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p>
          Tento web používá cookies pro správné fungování a analýzu návštěvnosti (Google Analytics).
          Více informací v{" "}
          <a href="/cookies">zásadách cookies</a> a{" "}
          <a href="/ochrana-osobnich-udaju">ochraně osobních údajů</a>.
        </p>
        <button onClick={accept} className="btn-primary cookie-btn">
          Rozumím
        </button>
      </div>
    </div>
  );
}

export default function Vouchers() {
  return (
    <section className="site-section" id="vouchery">
      <div className="section-label">Dárkové poukazy</div>
      <h2 className="section-title">
        Darujte zážitek, který
        <br />
        nikdo nečeká
      </h2>
      <p className="section-desc">
        Online nákup voucheru na pronájem 360 fotoboothu. Perfektní dárek na
        svatbu, narozeniny nebo firemní akci.
      </p>
      <div className="voucher-card">
        <div className="voucher-visual">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
            <img
              src="/images/vouchers/voucher-2h.jpg"
              alt="Dárkový poukaz na 2 hodiny pronájmu Fotospin 360"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            />
            <img
              src="/images/vouchers/voucher-1h.jpg"
              alt="Dárkový poukaz na 1 hodinu pronájmu Fotospin 360"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            />
          </div>
        </div>
        <div className="voucher-info">
          <h3>Nákup za pár kliků</h3>
          <p>
            Vyberte balíček, zaplaťte online a voucher s unikátním kódem Vám
            přijde okamžitě na e-mail jako PDF ke stažení nebo vytištění.
          </p>
          <ul className="voucher-perks">
            <li>Okamžité doručení na e-mail</li>
            <li>Platnost 12 měsíců od nákupu</li>
            <li>Elegantní PDF design k tisku</li>
            <li>Bezpečná platba kartou</li>
            <li>Osobní věnování na přání</li>
          </ul>
          <a
            href="/voucher"
            className="btn-primary"
            style={{ display: "inline-block", textAlign: "center" }}
          >
            Koupit voucher
          </a>
        </div>
      </div>
    </section>
  );
}

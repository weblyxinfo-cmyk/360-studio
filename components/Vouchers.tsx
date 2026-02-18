export default function Vouchers() {
  return (
    <section className="site-section" id="vouchery">
      <div className="section-label">Darkove poukazy</div>
      <h2 className="section-title">
        Darujte zazitek, ktery
        <br />
        nikdo neceka
      </h2>
      <p className="section-desc">
        Online nakup voucheru na pronajem 360 fotoboothu. Perfektni darek na
        svatbu, narozeniny nebo firemni akci.
      </p>
      <div className="voucher-card">
        <div className="voucher-visual">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
            <img
              src="/images/vouchers/voucher-2h.jpg"
              alt="Darkovy poukaz na 2 hodiny pronajmu Fotospin 360"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            />
            <img
              src="/images/vouchers/voucher-1h.jpg"
              alt="Darkovy poukaz na 1 hodinu pronajmu Fotospin 360"
              style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            />
          </div>
        </div>
        <div className="voucher-info">
          <h3>Nakup za par kliku</h3>
          <p>
            Vyberte balicek, zapladte online a voucher s unikatnim kodem Vam
            prijde okamzite na e-mail jako PDF ke stazeni nebo vytisteni.
          </p>
          <ul className="voucher-perks">
            <li>Okamzite doruceni na e-mail</li>
            <li>Platnost 12 mesicu od nakupu</li>
            <li>Elegantni PDF design k tisku</li>
            <li>Bezpecna platba kartou</li>
            <li>Osobni venovani na prani</li>
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

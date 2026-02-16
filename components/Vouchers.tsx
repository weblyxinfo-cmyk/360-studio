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
          <div className="voucher-mock">
            <div className="voucher-mock-logo">
              KAJO{" "}
              <span style={{ color: "var(--color-gold)" }}>STUDIO</span> 360
            </div>
            <div className="voucher-mock-title">Darkovy voucher</div>
            <div className="voucher-mock-desc">
              Pronajem 360 fotoboothu
              <br />
              na akci dle vlastniho vyberu
            </div>
            <div className="voucher-mock-code">KAJO-2026-XXXX</div>
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

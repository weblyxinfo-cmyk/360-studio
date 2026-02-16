export default function Packages() {
  return (
    <section className="site-section" id="balicky">
      <div className="section-label">Cenik</div>
      <h2 className="section-title">
        Vyberte si balicek
        <br />
        podle Vasi akce
      </h2>
      <p className="section-desc">
        Kazdy balicek zahrnuje kompletni servis vcetne obsluhy, rekvizit a
        okamziteho sdileni videi.
      </p>
      <div className="packages-grid">
        {/* Zakladni */}
        <div className="package">
          <div className="package-icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Zakladni</h3>
          <div className="package-duration">1 hodina zabavy</div>
          <div className="package-price">
            X XXX Kc <span>/ akce</span>
          </div>
          <p className="package-note">Idealni pro mensi oslavy a narozeniny</p>
          <ul className="package-features">
            <li>Profesionalni obsluha</li>
            <li>Neomezeny pocet natoceni</li>
            <li>Rekvizity a doplnky</li>
            <li>Okamzite sdileni pres QR kod</li>
            <li>Digitalni galerie videi</li>
            <li>Instalace a odvoz v cene</li>
          </ul>
          <a href="#kontakt" className="btn-outline">
            Mam zajem
          </a>
        </div>

        {/* Premium */}
        <div className="package featured">
          <div className="package-icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Premium</h3>
          <div className="package-duration">2 hodiny zabavy</div>
          <div className="package-price">
            X XXX Kc <span>/ akce</span>
          </div>
          <p className="package-note">
            Perfektni pro svatby a firemni akce
          </p>
          <ul className="package-features">
            <li>Vse ze zakladniho balicku</li>
            <li>Vlastni branding (logo, barvy)</li>
            <li>Slow-motion efekty</li>
            <li>Premiove pozadi dle vyberu</li>
            <li>USB s videy po akci</li>
            <li>Prioritni terminy</li>
          </ul>
          <a href="#kontakt" className="btn-primary">
            Mam zajem
          </a>
        </div>
      </div>
    </section>
  );
}

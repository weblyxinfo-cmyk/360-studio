interface PackageFeature { text: string; }
interface PackageData {
  id: string; name: string; slug?: string; duration: string; price: number;
  priceNote: string | null; isFeatured: boolean; featuredLabel: string | null;
  features: PackageFeature[];
}

function PackageIcon({ pkg }: { pkg: PackageData }) {
  if (pkg.slug === "corporate" || pkg.name === "CORPORATE") {
    return <><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" strokeLinejoin="round" /></>;
  }
  if (pkg.isFeatured) {
    return <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />;
  }
  return <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />;
}

export default function Packages({ data }: { data?: PackageData[] }) {
  if (data && data.length > 0) {
    return (
      <section className="site-section" id="balicky">
        <div className="section-label">Ceník</div>
        <h2 className="section-title">Vyberte si balíček<br />podle Vaší akce</h2>
        <p className="section-desc">Každý balíček zahrnuje kompletní servis včetně obsluhy, rekvizit a okamžitého sdílení videí.</p>
        <div className="packages-grid">
          {data.map((pkg) => (
            <div className={`package${pkg.isFeatured ? " featured" : ""}`} key={pkg.id}>
              <div className="package-icon">
                <svg viewBox="0 0 24 24">
                  <PackageIcon pkg={pkg} />
                </svg>
              </div>
              <h3>{pkg.name}</h3>
              <div className="package-duration">{pkg.duration}</div>
              <div className={`package-price${pkg.price === 0 ? " package-price-text" : ""}`}>
                {pkg.price > 0 ? <>{(pkg.price / 100).toLocaleString("cs-CZ")} Kč <span>/ akce</span></> : <>Na dotaz</>}
              </div>
              {pkg.priceNote && <p className="package-note">{pkg.priceNote}</p>}
              <ul className="package-features">
                {pkg.features.map((f, i) => <li key={i}>{f.text}</li>)}
              </ul>
              <a href="#poptat" className={pkg.isFeatured ? "btn-primary" : "btn-outline"}>Poptat tento balíček</a>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="site-section" id="balicky">
      <div className="section-label">Ceník</div>
      <h2 className="section-title">Vyberte si balíček<br />podle Vaší akce</h2>
      <p className="section-desc">Každý balíček zahrnuje kompletní servis včetně obsluhy, rekvizit a okamžitého sdílení videí.</p>
      <div className="packages-grid">
        <div className="package">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>START</h3>
          <div className="package-duration">1 hodina zábavy</div>
          <div className="package-price">7 990 Kč <span>/ akce</span></div>
          <p className="package-note">Ideální pro menší oslavy a narozeniny</p>
          <ul className="package-features">
            <li>Profesionální obsluha</li>
            <li>Neomezený počet natočení</li>
            <li>Rekvizity a doplňky</li>
            <li>Okamžité sdílení přes QR kód</li>
            <li>Digitální galerie videí</li>
            <li>Instalace a odvoz v ceně</li>
          </ul>
          <a href="#poptat" className="btn-outline">Poptat tento balíček</a>
        </div>
        <div className="package featured">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>DOUBLE FUN</h3>
          <div className="package-duration">2 hodiny zábavy</div>
          <div className="package-price">12 990 Kč <span>/ akce</span></div>
          <p className="package-note">Perfektní pro svatby a firemní akce</p>
          <ul className="package-features">
            <li>Vše ze START balíčku</li>
            <li>Vlastní branding (logo, barvy)</li>
            <li>Slow-motion efekty</li>
            <li>Prémiové pozadí dle výběru</li>
            <li>USB s videy po akci</li>
            <li>Prioritní termíny</li>
          </ul>
          <a href="#poptat" className="btn-primary">Poptat tento balíček</a>
        </div>
        <div className="package">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>CORPORATE</h3>
          <div className="package-duration">2 hodiny provozu</div>
          <div className="package-price">18 500 Kč <span>/ akce</span></div>
          <p className="package-note">Firemní akce – každé video se stává propagací značky.</p>
          <ul className="package-features">
            <li>2 hodiny provozu</li>
            <li>Kompletní branding (logo ve videu)</li>
            <li>Animovaný overlay a grafika na míru</li>
            <li>QR + email sdílení</li>
            <li>Archiv všech videí</li>
            <li>Konzultace vizuálu před akcí</li>
            <li>Instalace &amp; demontáž</li>
            <li>Doprava v ceně</li>
          </ul>
          <a href="#poptat" className="btn-outline">Poptat tento balíček</a>
        </div>
        <div className="package">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>VIP 360 Exclusive</h3>
          <div className="package-duration">Dle dohody</div>
          <div className="package-price">Na dotaz</div>
          <p className="package-note">Pro nejnáročnější klienty a exkluzivní eventy</p>
          <ul className="package-features">
            <li>Vše z DOUBLE FUN balíčku</li>
            <li>Neomezená doba pronájmu</li>
            <li>Individuální grafický návrh</li>
            <li>Dedikovaný koordinátor</li>
            <li>Přednostní technická podpora</li>
            <li>Kompletní post-produkce</li>
          </ul>
          <a href="#poptat" className="btn-outline">Poptat tento balíček</a>
        </div>
      </div>
    </section>
  );
}

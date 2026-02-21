interface PackageFeature { text: string; }
interface PackageData {
  id: string; name: string; duration: string; price: number;
  priceNote: string | null; isFeatured: boolean; featuredLabel: string | null;
  features: PackageFeature[];
}

export default function Packages({ data }: { data?: PackageData[] }) {
  if (data && data.length > 0) {
    return (
      <section className="site-section" id="balicky">
        <div className="section-label">Cenik</div>
        <h2 className="section-title">Vyberte si balicek<br />podle Vasi akce</h2>
        <p className="section-desc">Kazdy balicek zahrnuje kompletni servis vcetne obsluhy, rekvizit a okamziteho sdileni videi.</p>
        <div className="packages-grid">
          {data.map((pkg) => (
            <div className={`package${pkg.isFeatured ? " featured" : ""}`} key={pkg.id}>
              <div className="package-icon">
                <svg viewBox="0 0 24 24">
                  {pkg.isFeatured
                    ? <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />}
                </svg>
              </div>
              <h3>{pkg.name}</h3>
              <div className="package-duration">{pkg.duration}</div>
              <div className="package-price">
                {pkg.price > 0 ? `${(pkg.price / 100).toLocaleString("cs-CZ")} Kc` : "X XXX Kc"} <span>/ akce</span>
              </div>
              {pkg.priceNote && <p className="package-note">{pkg.priceNote}</p>}
              <ul className="package-features">
                {pkg.features.map((f, i) => <li key={i}>{f.text}</li>)}
              </ul>
              <a href="/booking" className={pkg.isFeatured ? "btn-primary" : "btn-outline"}>Rezervovat</a>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="site-section" id="balicky">
      <div className="section-label">Cenik</div>
      <h2 className="section-title">Vyberte si balicek<br />podle Vasi akce</h2>
      <p className="section-desc">Kazdy balicek zahrnuje kompletni servis vcetne obsluhy, rekvizit a okamziteho sdileni videi.</p>
      <div className="packages-grid">
        <div className="package">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>START</h3>
          <div className="package-duration">1 hodina zabavy</div>
          <div className="package-price">X XXX Kc <span>/ akce</span></div>
          <p className="package-note">Idealni volba pro mensi oslavy a kratsi akce.</p>
          <ul className="package-features">
            <li>Profesionalni obsluha</li>
            <li>Neomezeny pocet natoceni</li>
            <li>Zabavne Rekvizity</li>
            <li>Barevna LED svetla</li>
            <li>Okamzite sdileni pres QR kod</li>
            <li>Digitalni galerie videi</li>
            <li>Doprava a instalace v cene</li>
          </ul>
          <a href="/booking" className="btn-outline">Rezervovat</a>
        </div>
        <div className="package featured">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>DOUBLE FUN</h3>
          <div className="package-duration">2 hodiny zabavy</div>
          <div className="package-price">X XXX Kc <span>/ akce</span></div>
          <p className="package-note">Perfektni reseni pro svatby a vetsi oslavy.</p>
          <ul className="package-features">
            <li>Profesionalni obsluha</li>
            <li>Neomezeny pocet natoceni</li>
            <li>Zabavne Rekvizity</li>
            <li>Barevna LED svetla</li>
            <li>Okamzite sdileni pres QR kod</li>
            <li>Digitalni galerie videi</li>
            <li>Doprava a instalace v cene</li>
          </ul>
          <a href="/booking" className="btn-primary">Rezervovat</a>
        </div>
        <div className="package">
          <div className="package-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <h3>VIP 360 Exclusive</h3>
          <div className="package-duration">Na miru (vice hodin nebo dni)</div>
          <div className="package-price">Dle dohody</div>
          <p className="package-note">Premiova varianta pro narocnejsi akce a vicedeni eventy.</p>
          <ul className="package-features">
            <li>Profesionalni obsluha</li>
            <li>Neomezeny pocet natoceni</li>
            <li>Zabavne Rekvizity</li>
            <li>Barevna LED svetla</li>
            <li>Okamzite sdileni pres QR kod</li>
            <li>Digitalni galerie videi</li>
            <li>Doprava a instalace v cene</li>
            <li>Prednostni termin</li>
            <li>VIP zabrany (sloupky s paskou)</li>
            <li>Asistent navic pri vetsi akci</li>
            <li>Moznost prodlouzeni primo na miste</li>
          </ul>
          <a href="/booking" className="btn-outline">Rezervovat</a>
        </div>
      </div>
    </section>
  );
}

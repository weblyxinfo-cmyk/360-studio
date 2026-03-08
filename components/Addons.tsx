export default function Addons() {
  return (
    <section className="site-section" id="doplnky">
      <div className="section-label">Doplňky</div>
      <h2 className="section-title">Přidejte ke svému balíčku</h2>
      <p className="section-desc">Doplňky zvyšují zážitek a přidávají Vaší akci jedinečnost.</p>
      <div className="addons-grid">
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Každá další hodina</h4>
          <div className="addon-price">+ 2 900 Kč</div>
        </div>
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Luxusní backdrop</h4>
          <div className="addon-price">+ 2 500 Kč</div>
        </div>
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>LED světelná stěna</h4>
          <div className="addon-price">+ 3 500 Kč</div>
        </div>
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Konfety / speciální efekt</h4>
          <div className="addon-price">+ 1 900 Kč</div>
        </div>
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Expresní dodání do 24 h</h4>
          <div className="addon-price">+ 1 500 Kč</div>
        </div>
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Asistent navíc při velké akci</h4>
          <div className="addon-price">+ 2 000 Kč</div>
        </div>
      </div>
    </section>
  );
}

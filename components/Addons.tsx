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
        <div className="addon-card">
          <div className="addon-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 5-4 7c-2.5-2-4-5-4-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h4>Mlhovač</h4>
          <div className="addon-price">+ 1 000 Kč</div>
        </div>
      </div>
    </section>
  );
}

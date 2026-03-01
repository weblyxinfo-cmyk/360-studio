export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-ring" />
      <div className="hero-ring hero-ring-2" />
      <div className="hero-content">
        <div className="hero-badge">360 Fotobooth na Vaší akci</div>
        <h1>
          Zážitek, který
          <br />
          se <em>točí</em> kolem Vás
        </h1>
        <p className="hero-sub">
          Pronájem prémiového 360 fotoboothu na svatby, narozeniny, firemní akce
          a další události po celé ČR.
        </p>
        <p className="hero-sub" style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.5rem" }}>
          Odpovídáme do 24 hodin. Platíte až po potvrzení termínu.
        </p>
        <div className="hero-actions">
          <a href="#poptat" className="btn-primary">
            Nezávazně poptat termín
          </a>
          <a href="#jak-to-funguje" className="btn-outline">
            Jak to funguje
          </a>
        </div>
      </div>
      <a href="#jak-to-funguje" className="hero-scroll">
        Scroll
        <div className="scroll-line" />
      </a>
    </section>
  );
}

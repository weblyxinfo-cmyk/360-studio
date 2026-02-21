export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-ring" />
      <div className="hero-ring hero-ring-2" />
      <div className="hero-content">
        <div className="hero-badge">360 Fotobooth na Vasi akci</div>
        <h1>
          Zazitek, ktery
          <br />
          se <em>toci</em> kolem Vas
        </h1>
        <img
          src="/images/logo-kajo.png"
          alt="KAJO Studio 360"
          style={{ maxWidth: "200px", margin: "1.5rem auto" }}
        />
        <p className="hero-sub">
          Pronajem premioveho 360 fotobothu na svatby, narozeniny, firemni akce
          a dalsi udalosti.
        </p>
        <div className="hero-actions">
          <a href="#kontakt" className="btn-primary">
            Nezavazna poptavka
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

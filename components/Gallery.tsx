const items = [
  {
    tag: "Video",
    title: "Svatebni 360 zazitek",
    sub: "Romanticka atmosfera zachycena v pohybu",
    hasPlay: true,
    hasParticles: true,
  },
  {
    tag: "Narozeniny",
    title: "Oslava 30. narozenin",
    sub: "Party plna energie a zabavy",
  },
  {
    tag: "Firemni akce",
    title: "Teambuilding 2025",
    sub: "Kreativni zabava pro cely tym",
  },
  {
    tag: "Video",
    title: "Firemni vanocni vecirek",
    sub: "Elegance a zabava v jednom",
    hasPlay: true,
  },
  {
    tag: "Ples",
    title: "Reprezentacni ples",
    sub: "Exkluzivni momenty na plese",
  },
];

export default function Gallery() {
  return (
    <section className="site-section" id="galerie">
      <div className="gallery-header">
        <div className="section-label">Galerie</div>
        <h2 className="section-title">
          Podivejte se, jak
          <br />
          to vypada v akci
        </h2>
        <p className="section-desc">
          Ukazky z realnych akci. Brzy zde najdete fotky a videa z nasich 360
          booth zazitku.
        </p>
      </div>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <div className="gallery-item" key={i}>
            <div className="g-bg" />
            {item.hasParticles && (
              <div className="g-particles">
                <div className="g-particle" />
                <div className="g-particle" />
                <div className="g-particle" />
                <div className="g-particle" />
                <div className="g-particle" />
              </div>
            )}
            {item.hasPlay && <div className="g-play" />}
            <div className="g-content">
              <div className="g-tag">{item.tag}</div>
              <div className="g-title">{item.title}</div>
              <div className="g-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

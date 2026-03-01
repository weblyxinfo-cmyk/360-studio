interface GalleryItemData {
  id: string;
  title: string;
  subtitle: string | null;
  tag: string | null;
  imageUrl: string | null;
  hasPlay: boolean;
  gridSpan: string | null;
}

const fallbackItems = [
  { id: "1", tag: "Party", title: "Večírek plný energie", subtitle: "Nezastavitelná zábava na parketu", hasPlay: false, imageUrl: "/images/gallery/party-vecirek.jpg", gridSpan: "2x2" },
  { id: "2", tag: "Svatba", title: "Svatební 360 zážitek", subtitle: "Romantická atmosféra zachycená v pohybu", hasPlay: false, imageUrl: "/images/gallery/svatba.jpg", gridSpan: "1x1" },
  { id: "3", tag: "Gala", title: "Červený koberec", subtitle: "Exkluzivní momenty na gala večeru", hasPlay: false, imageUrl: "/images/gallery/gala-cerveny-koberec.jpg", gridSpan: "1x1" },
  { id: "4", tag: "Letní party", title: "Letní party pod hvězdami", subtitle: "Konfety, světýlka a super nálada", hasPlay: false, imageUrl: "/images/gallery/letni-party.jpg", gridSpan: "1x1" },
  { id: "5", tag: "Neon", title: "Neon party s mazlíčkem", subtitle: "Zábava pro všechny včetně čtyřnohých kamarádů", hasPlay: false, imageUrl: "/images/gallery/neon-party.jpg", gridSpan: "1x1" },
  { id: "6", tag: "Rodina", title: "Rodinný den", subtitle: "Krásné momenty s celou rodinou", hasPlay: false, imageUrl: "/images/gallery/rodinny-den.jpg", gridSpan: "1x1" },
  { id: "7", tag: "Festival", title: "Letní festival", subtitle: "Barvy, slunce a skvělá nálada", hasPlay: false, imageUrl: "/images/gallery/letni-festival.jpg", gridSpan: "1x1" },
  { id: "8", tag: "Street", title: "Street dance session", subtitle: "Energie a pohyb v ulicích", hasPlay: false, imageUrl: "/images/gallery/street-dance.jpg", gridSpan: "1x1" },
];

export default function Gallery({ data }: { data?: GalleryItemData[] }) {
  const items = data && data.length > 0 ? data : fallbackItems;

  return (
    <section className="site-section" id="galerie">
      <div className="gallery-header">
        <div className="section-label">Galerie</div>
        <h2 className="section-title">
          Podívejte se, jak
          <br />
          to vypadá v akci
        </h2>
        <p className="section-desc">
          Ukázky z reálných akcí. Brzy zde najdete fotky a videa z našich 360
          booth zážitků.
        </p>
      </div>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <div className="gallery-item" key={item.id}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            ) : (
              <div className="g-bg" />
            )}
            {i === 0 && (
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
              {item.tag && <div className="g-tag">{item.tag}</div>}
              <div className="g-title">{item.title}</div>
              {item.subtitle && <div className="g-sub">{item.subtitle}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

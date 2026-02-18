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
  { id: "1", tag: "Party", title: "Vecirek plny energie", subtitle: "Nezastavitelna zabava na parketu", hasPlay: false, imageUrl: "/images/gallery/party-vecirek.jpg", gridSpan: "2x2" },
  { id: "2", tag: "Svatba", title: "Svatebni 360 zazitek", subtitle: "Romanticka atmosfera zachycena v pohybu", hasPlay: false, imageUrl: "/images/gallery/svatba.jpg", gridSpan: "1x1" },
  { id: "3", tag: "Gala", title: "Cerveny koberec", subtitle: "Exkluzivni momenty na gala veceru", hasPlay: false, imageUrl: "/images/gallery/gala-cerveny-koberec.jpg", gridSpan: "1x1" },
  { id: "4", tag: "Letni party", title: "Letni party pod hvezdami", subtitle: "Konfety, svetylka a super nalada", hasPlay: false, imageUrl: "/images/gallery/letni-party.jpg", gridSpan: "1x1" },
  { id: "5", tag: "Neon", title: "Neon party s mazlikem", subtitle: "Zabava pro vsechny vcetne ctyrnohych kamaradu", hasPlay: false, imageUrl: "/images/gallery/neon-party.jpg", gridSpan: "1x1" },
  { id: "6", tag: "Rodina", title: "Rodinny den", subtitle: "Krasne momenty s celou rodinou", hasPlay: false, imageUrl: "/images/gallery/rodinny-den.jpg", gridSpan: "1x1" },
  { id: "7", tag: "Festival", title: "Letni festival", subtitle: "Barvy, slunce a skvela nalada", hasPlay: false, imageUrl: "/images/gallery/letni-festival.jpg", gridSpan: "1x1" },
  { id: "8", tag: "Street", title: "Street dance session", subtitle: "Energie a pohyb v ulicich", hasPlay: false, imageUrl: "/images/gallery/street-dance.jpg", gridSpan: "1x1" },
];

export default function Gallery({ data }: { data?: GalleryItemData[] }) {
  const items = data && data.length > 0 ? data : fallbackItems;

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
          <div className="gallery-item" key={item.id}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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

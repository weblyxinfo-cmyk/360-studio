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
  { id: "1", tag: "Video", title: "Svatebni 360 zazitek", subtitle: "Romanticka atmosfera zachycena v pohybu", hasPlay: true, imageUrl: null, gridSpan: "2x2" },
  { id: "2", tag: "Narozeniny", title: "Oslava 30. narozenin", subtitle: "Party plna energie a zabavy", hasPlay: false, imageUrl: null, gridSpan: "1x1" },
  { id: "3", tag: "Firemni akce", title: "Teambuilding 2025", subtitle: "Kreativni zabava pro cely tym", hasPlay: false, imageUrl: null, gridSpan: "1x1" },
  { id: "4", tag: "Video", title: "Firemni vanocni vecirek", subtitle: "Elegance a zabava v jednom", hasPlay: true, imageUrl: null, gridSpan: "1x1" },
  { id: "5", tag: "Ples", title: "Reprezentacni ples", subtitle: "Exkluzivni momenty na plese", hasPlay: false, imageUrl: null, gridSpan: "1x1" },
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

const reviews = [
  {
    text: "\u201eFotobooth byl absolutni hit nasi svatby! Hoste se bavili cely vecer a videa jsou naprosto uzasna. Jednoznacne nejlepsi investice do zabavy.\u201c",
    initials: "KN",
    name: "Katerina N.",
    event: "Svatba, Praha",
  },
  {
    text: "\u201eObjednali jsme na firemni vanocni vecirek a kolegove byli nadseni. Profesionalni pristup, skvela kvalita videi. Urcite objedname znovu!\u201c",
    initials: "MT",
    name: "Martin T.",
    event: "Firemni akce, Brno",
  },
  {
    text: "\u201eManzel mel padesatiny a chtela jsem neco specialniho. 360 booth predcil vsechna ocekavani. Dekujeme za perfektni servis!\u201c",
    initials: "LP",
    name: "Lucie P.",
    event: "Narozeniny, Ostrava",
  },
];

export default function Reviews() {
  return (
    <section className="site-section" id="recenze">
      <div className="section-label">Reference</div>
      <h2 className="section-title">Co rikaji nasi klienti</h2>
      <p className="section-desc">
        Spokojenost hostu je pro nas vzdy na prvnim miste.
      </p>
      <div className="reviews-grid">
        {reviews.map((r) => (
          <div className="review" key={r.initials}>
            <div className="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>{r.text}</p>
            <div className="review-author">
              <div className="review-avatar">{r.initials}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-event">{r.event}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

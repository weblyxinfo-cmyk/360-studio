interface ReviewData {
  id: string;
  name: string;
  initials: string;
  text: string;
  rating: number;
  eventType: string | null;
  city: string | null;
}

const fallbackReviews = [
  { id: "1", text: "Fotobooth byl absolutni hit nasi svatby! Hoste se bavili cely vecer a videa jsou naprosto uzasna. Jednoznacne nejlepsi investice do zabavy.", initials: "KN", name: "Katerina N.", eventType: "Svatba", city: "Praha", rating: 5 },
  { id: "2", text: "Objednali jsme na firemni vanocni vecirek a kolegove byli nadseni. Profesionalni pristup, skvela kvalita videi. Urcite objedname znovu!", initials: "MT", name: "Martin T.", eventType: "Firemni akce", city: "Brno", rating: 5 },
  { id: "3", text: "Manzel mel padesatiny a chtela jsem neco specialniho. 360 booth predcil vsechna ocekavani. Dekujeme za perfektni servis!", initials: "LP", name: "Lucie P.", eventType: "Narozeniny", city: "Ostrava", rating: 5 },
];

export default function Reviews({ data }: { data?: ReviewData[] }) {
  const reviews = data && data.length > 0 ? data : fallbackReviews;

  return (
    <section className="site-section" id="recenze">
      <div className="section-label">Reference</div>
      <h2 className="section-title">Co rikaji nasi klienti</h2>
      <p className="section-desc">
        Spokojenost hostu je pro nas vzdy na prvnim miste.
      </p>
      <div className="reviews-grid">
        {reviews.map((r) => (
          <div className="review" key={r.id || r.initials}>
            <div className="review-stars">{"★".repeat(r.rating)}</div>
            <p>&ldquo;{r.text}&rdquo;</p>
            <div className="review-author">
              <div className="review-avatar">{r.initials}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-event">{[r.eventType, r.city].filter(Boolean).join(", ")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

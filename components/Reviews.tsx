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
  { id: "1", text: "Fotobooth byl absolutní hit naší svatby! Hosté se bavili celý večer a videa jsou naprosto úžasná. Jednoznačně nejlepší investice do zábavy.", initials: "KN", name: "Kateřina N.", eventType: "Svatba", city: "Praha", rating: 5 },
  { id: "2", text: "Objednali jsme na firemní vánoční večírek a kolegové byli nadšení. Profesionální přístup, skvělá kvalita videí. Určitě objednáme znovu!", initials: "MT", name: "Martin T.", eventType: "Firemní akce", city: "Brno", rating: 5 },
  { id: "3", text: "Manžel měl padesátiny a chtěla jsem něco speciálního. 360 booth předčil všechna očekávání. Děkujeme za perfektní servis!", initials: "LP", name: "Lucie P.", eventType: "Narozeniny", city: "Ostrava", rating: 5 },
];

export default function Reviews({ data }: { data?: ReviewData[] }) {
  const reviews = data && data.length > 0 ? data : fallbackReviews;

  return (
    <section className="site-section" id="recenze">
      <div className="section-label">Reference</div>
      <h2 className="section-title">Co říkají naši klienti</h2>
      <p className="section-desc">
        Spokojenost hostů je pro nás vždy na prvním místě.
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

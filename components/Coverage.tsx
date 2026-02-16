const cities = [
  { name: "Praha a Stredocesky kraj", badge: "Hlavni region" },
  { name: "Brno a Jihomoravsky kraj", badge: "Hlavni region" },
  { name: "Ostrava a Moravskoslezsky kraj", badge: "Dostupne" },
  { name: "Plzen a Zapadni Cechy", badge: "Dostupne" },
  { name: "Olomouc a okoli", badge: "Dostupne" },
  { name: "Liberec, Hradec Kralove", badge: "Na poptavku" },
];

export default function Coverage() {
  return (
    <section className="site-section" id="pokryti">
      <div className="section-label">Pusobnost</div>
      <h2 className="section-title">
        Kde vsude
        <br />
        nas najdete
      </h2>
      <p className="section-desc">
        Pusobime po cele Ceske republice s hlavnim zamerenim na nasledujici
        regiony.
      </p>
      <div className="coverage-content">
        <div className="map-placeholder">
          <div className="map-dot" />
          <div className="map-dot" />
          <div className="map-dot" />
          <div className="map-dot" />
          <div className="map-dot" />
          <div className="map-label">Interaktivni mapa</div>
        </div>
        <div>
          <ul className="coverage-cities">
            {cities.map((city) => (
              <li key={city.name}>
                {city.name} <span>{city.badge}</span>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              marginTop: "1.5rem",
            }}
          >
            Doprava v hlavnich regionech je v cene. Ostatni lokality dle
            individualni dohody.
          </p>
        </div>
      </div>
    </section>
  );
}

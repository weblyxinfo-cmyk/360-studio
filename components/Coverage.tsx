"use client";

import dynamic from "next/dynamic";

const CoverageMap = dynamic(() => import("./CoverageMap"), { ssr: false });

interface CoverageCity { name: string; badge: string; }

const fallbackCities: CoverageCity[] = [
  { name: "Brno", badge: "Hlavní region" },
  { name: "Zlín", badge: "Hlavní region" },
  { name: "Olomouc", badge: "Dostupné" },
  { name: "Kroměříž", badge: "Dostupné" },
  { name: "Přerov", badge: "Dostupné" },
  { name: "Vyškov", badge: "Dostupné" },
  { name: "Kuřim", badge: "Dostupné" },
  { name: "Jihlava", badge: "Dostupné" },
  { name: "Velké Meziříčí", badge: "Dostupné" },
  { name: "Boskovice", badge: "Dostupné" },
  { name: "Břeclav", badge: "Dostupné" },
  { name: "Hodonín", badge: "Dostupné" },
  { name: "Mikulov", badge: "Dostupné" },
  { name: "Znojmo", badge: "Na poptávku" },
];

export default function Coverage({ data }: { data?: CoverageCity[] }) {
  const cities = data && data.length > 0 ? data : fallbackCities;

  return (
    <section className="site-section" id="pokryti">
      <div className="section-label">Působnost</div>
      <h2 className="section-title">
        Kde všude
        <br />
        nás najdete
      </h2>
      <p className="section-desc">
        Působíme především v Jihomoravském, Olomouckém a Zlínském kraji a na Vysočině. Další lokality dle dohody.
      </p>
      <div className="coverage-content">
        <CoverageMap />
        <div>
          <ul className="coverage-cities">
            {cities.map((city) => (
              <li key={city.name}>
                {city.name} <span>{city.badge}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "1.5rem" }}>
            Doprava v hlavních čtyřech regionech je v ceně. Ostatní lokality dle individuální dohody.
          </p>
        </div>
      </div>
    </section>
  );
}

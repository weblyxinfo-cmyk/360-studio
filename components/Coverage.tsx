"use client";

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

// Approximate positions on an SVG map (x, y) — scaled to 500x400 viewBox
// Based on real geographic coordinates of Czech cities projected to SVG
const cityDots: { name: string; x: number; y: number }[] = [
  { name: "Brno", x: 280, y: 220 },
  { name: "Zlín", x: 370, y: 200 },
  { name: "Olomouc", x: 350, y: 140 },
  { name: "Kroměříž", x: 340, y: 180 },
  { name: "Přerov", x: 355, y: 155 },
  { name: "Vyškov", x: 310, y: 200 },
  { name: "Kuřim", x: 265, y: 210 },
  { name: "Jihlava", x: 175, y: 190 },
  { name: "Velké Meziříčí", x: 220, y: 195 },
  { name: "Boskovice", x: 280, y: 165 },
  { name: "Břeclav", x: 310, y: 280 },
  { name: "Hodonín", x: 345, y: 260 },
  { name: "Mikulov", x: 290, y: 295 },
  { name: "Znojmo", x: 230, y: 290 },
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
        Působíme především na Moravě a v Jihočeských krajích. Další lokality dle dohody.
      </p>
      <div className="coverage-content">
        <div className="map-placeholder" style={{ background: "transparent", border: "none", position: "relative" }}>
          <svg viewBox="0 0 500 380" style={{ width: "100%", height: "auto", maxWidth: "500px" }}>
            {/* Simplified outline of Moravia/South CZ region */}
            <path
              d="M100,120 C120,80 170,60 220,50 C270,40 320,55 370,70 C410,82 440,100 460,140 C470,170 465,200 450,230 C430,265 400,290 370,310 C340,325 300,340 260,340 C220,335 180,320 150,295 C120,270 105,240 95,210 C88,180 90,150 100,120 Z"
              fill="rgba(200,169,110,0.08)"
              stroke="rgba(200,169,110,0.3)"
              strokeWidth="1.5"
            />
            {/* City dots */}
            {cityDots.map((dot) => (
              <g key={dot.name}>
                {/* Glow effect */}
                <circle cx={dot.x} cy={dot.y} r="12" fill="rgba(200,169,110,0.15)" />
                <circle cx={dot.x} cy={dot.y} r="5" fill="var(--color-gold, #c8a96e)" />
                {/* City label */}
                <text
                  x={dot.x}
                  y={dot.y - 14}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.8)"
                  fontSize="10"
                  fontFamily="var(--font-body, sans-serif)"
                >
                  {dot.name}
                </text>
              </g>
            ))}
            {/* Brno highlight — larger dot */}
            <circle cx={280} cy={220} r="8" fill="none" stroke="var(--color-gold, #c8a96e)" strokeWidth="2" opacity="0.6">
              <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div>
          <ul className="coverage-cities">
            {cities.map((city) => (
              <li key={city.name}>
                {city.name} <span>{city.badge}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "1.5rem" }}>
            Doprava v hlavních regionech je v ceně. Ostatní lokality dle individuální dohody.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    num: "01",
    title: "Kontaktujte nás",
    desc: "Vyplňte poptávkový formulář s datem, místem a typem akce. Ozveme se do 24 hodin.",
  },
  {
    num: "02",
    title: "Domluvíme detaily",
    desc: "Pomůžeme Vám vybrat balíček, přizpůsobíme vše podle Vašich přání a doladíme detaily Vaší akce.",
  },
  {
    num: "03",
    title: "Přijedeme a nastavíme",
    desc: "Náš tým dorazí s předstihem, nainstaluje booth a zajistí, že vše funguje na 100%.",
  },
  {
    num: "04",
    title: "Užijte si zábavu",
    desc: "Vaši hosté se baví, my obsluhujeme booth.",
  },
];

export default function HowItWorks() {
  return (
    <section className="site-section" id="jak-to-funguje">
      <div className="section-label">Jak to funguje</div>
      <h2 className="section-title">
        Čtyři kroky
        <br />k zábavě
      </h2>
      <p className="section-desc">
        Celý proces je maximálně jednoduchý. Vy si užíváte akci, my se postaráme
        o zbytek.
      </p>
      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step" key={step.num}>
            <div className="step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

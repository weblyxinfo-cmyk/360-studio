const steps = [
  {
    num: "01",
    title: "Kontaktujte nas",
    desc: "Vyplnte poptavkovy formular s datem, mistem a typem akce. Ozveme se do 24 hodin.",
  },
  {
    num: "02",
    title: "Domluvime detaily",
    desc: "Pomuzeme Vam vybrat balicek, prizpusobime vse podle Vasich prani a doladime detaily Vasi akce.",
  },
  {
    num: "03",
    title: "Prijedeme a nastavime",
    desc: "Nas tym dorazi s predstihem, nainstaluje booth a zajisti, ze vse funguje na 100%.",
  },
  {
    num: "04",
    title: "Uzijte si zabavu",
    desc: "Vasi hoste se bavi, my obsluhujeme booth.",
  },
];

export default function HowItWorks() {
  return (
    <section className="site-section" id="jak-to-funguje">
      <div className="section-label">Jak to funguje</div>
      <h2 className="section-title">
        Ctyri kroky
        <br />k zabave
      </h2>
      <p className="section-desc">
        Cely proces je maximalne jednoduchy. Vy si uzivate akci, my se postarame
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

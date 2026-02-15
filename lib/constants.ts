export const SITE = {
  name: "Kajo Studio 360",
  url: "https://kajostudio.cz",
  email: "info@kajostudio360.cz",
  phone: "+420 XXX XXX XXX",
  address: "Kajo Studio 360\nUlice 123, Město",
  instagram: "https://instagram.com/kajostudio360",
  tiktok: "https://tiktok.com/@kajostudio360",
  facebook: "https://facebook.com/kajostudio360",
};

export const NAV_LINKS = [
  { label: "Jak to funguje", href: "#jak-to-funguje" },
  { label: "Balíčky", href: "#balicky" },
  { label: "Galerie", href: "#galerie" },
  { label: "Vouchery", href: "#vouchery" },
  { label: "Recenze", href: "#recenze" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export const STEPS = [
  {
    number: "01",
    title: "Kontaktujte nás",
    description:
      "Vyplňte poptávkový formulář s datem, místem a typem akce. Ozveme se do 24 hodin.",
  },
  {
    number: "02",
    title: "Domluvíme detaily",
    description:
      "Vybereme balíček, domluvíme personalizaci a upřesníme vše potřebné pro Vaši akci.",
  },
  {
    number: "03",
    title: "Přijedeme a nastavíme",
    description:
      "Náš tým dorazí s předstihem, nainstaluje booth a zajistí, že vše funguje na 100%.",
  },
  {
    number: "04",
    title: "Užijte si zábavu",
    description:
      "Vaši hosté se baví, my obsluhujeme booth. Videa dostanete ihned v digitální galerii.",
  },
];

export const PACKAGES = [
  {
    name: "Základní",
    price: "X XXX Kč",
    priceSuffix: "/ akce",
    duration: "1 hodina zábavy",
    note: "Ideální pro menší oslavy a narozeniny",
    icon: "bolt" as const,
    features: [
      "Profesionální obsluha",
      "Neomezený počet natočení",
      "Rekvizity a doplňky",
      "Okamžité sdílení přes QR kód",
      "Digitální galerie videí",
      "Instalace a odvoz v ceně",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "X XXX Kč",
    priceSuffix: "/ akce",
    duration: "2 hodiny zábavy",
    note: "Perfektní pro svatby a firemní akce",
    icon: "star" as const,
    badge: "NEJOBLÍBENĚJŠÍ",
    features: [
      "Vše ze základního balíčku",
      "Vlastní branding (logo, barvy)",
      "Slow-motion efekty",
      "Prémiové pozadí dle výběru",
      "USB s videy po akci",
      "Prioritní termíny",
    ],
    highlighted: true,
  },
];

export const GALLERY_ITEMS = [
  {
    tag: "Video",
    title: "Svatební 360 zážitek",
    description: "Romantická atmosféra zachycená v pohybu",
    gradient: "from-gold/20 to-gold/5",
  },
  {
    tag: "Narozeniny",
    title: "Oslava 30. narozenin",
    description: "Party plná energie a zábavy",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    tag: "Firemní akce",
    title: "Teambuilding 2025",
    description: "Kreativní zábava pro celý tým",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    tag: "Video",
    title: "Firemní vánoční večírek",
    description: "Elegance a zábava v jednom",
    gradient: "from-gold/15 to-amber-500/5",
  },
  {
    tag: "Ples",
    title: "Reprezentační ples",
    description: "Exkluzivní momenty na plese",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
];

export const REVIEWS = [
  {
    name: "Kateřina N.",
    initials: "KN",
    event: "Svatba, Praha",
    rating: 5,
    text: "Fotobooth byl absolutní hit naší svatby! Hosté se bavili celý večer a videa jsou naprosto úžasná. Jednoznačně nejlepší investice do zábavy.",
  },
  {
    name: "Martin T.",
    initials: "MT",
    event: "Firemní akce, Brno",
    rating: 5,
    text: "Objednali jsme na firemní vánoční večírek a kolegové byli nadšení. Profesionální přístup, skvělá kvalita videí. Určitě objednáme znovu!",
  },
  {
    name: "Lucie P.",
    initials: "LP",
    event: "Narozeniny, Ostrava",
    rating: 5,
    text: "Manžel měl padesátiny a chtěla jsem něco speciálního. 360 booth předčil všechna očekávání. Děkujeme za perfektní servis!",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Kolik místa fotobooth potřebuje?",
    answer:
      "Booth potřebuje prostor přibližně 3×3 metry. Poradíme Vám s rozmístěním na Vaší akci.",
  },
  {
    question: "Potřebujete přístup k elektřině?",
    answer:
      "Ano, potřebujeme standardní elektrickou zásuvku 230V v dosahu do 10 metrů od místa instalace.",
  },
  {
    question: "Jak dlouho trvá instalace?",
    answer:
      "Instalace trvá přibližně 30–45 minut. Přijedeme s dostatečným předstihem před začátkem akce.",
  },
  {
    question: "Lze personalizovat pozadí a overlay?",
    answer:
      "Ano, v Premium balíčku zahrnujeme vlastní branding — logo, barvy, pozadí i textové overlaye podle Vašich přání.",
  },
  {
    question: "Jak hosté získají svá videa?",
    answer:
      "Každý host si stáhne video okamžitě přes QR kód přímo na svůj telefon. Po akci obdržíte kompletní galerii.",
  },
  {
    question: "Fungujete i mimo velká města?",
    answer:
      "Ano, jezdíme po celé ČR. Doprava je v ceně v rámci našich hlavních regionů, ostatní lokality dle dohody.",
  },
];

export const COVERAGE_CITIES = [
  { name: "Praha a Středočeský kraj", badge: "Hlavní region", type: "primary" as const },
  { name: "Brno a Jihomoravský kraj", badge: "Hlavní region", type: "primary" as const },
  { name: "Ostrava a Moravskoslezský kraj", badge: "Dostupné", type: "available" as const },
  { name: "Plzeň a Západní Čechy", badge: "Dostupné", type: "available" as const },
  { name: "Olomouc a okolí", badge: "Dostupné", type: "available" as const },
  { name: "Liberec, Hradec Králové", badge: "Na poptávku", type: "onRequest" as const },
];

export const VOUCHER_BENEFITS = [
  "Okamžité doručení na e-mail",
  "Platnost 12 měsíců od nákupu",
  "Elegantní PDF design k tisku",
  "Bezpečná platba kartou",
  "Osobní věnování na přání",
];

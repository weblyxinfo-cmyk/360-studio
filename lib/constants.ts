export const SITE = {
  name: "Kajo Studio 360",
  url: "https://kajostudio.cz",
  email: "info@kajostudio.cz",
  phone: "+420 777 888 999",
  instagram: "https://instagram.com/kajostudio360",
  tiktok: "https://tiktok.com/@kajostudio360",
  facebook: "https://facebook.com/kajostudio360",
};

export const NAV_LINKS = [
  { label: "Jak to funguje", href: "#jak-to-funguje" },
  { label: "Balíčky", href: "#balicky" },
  { label: "Galerie", href: "#galerie" },
  { label: "Recenze", href: "#recenze" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

export const STEPS = [
  {
    number: "01",
    title: "Kontaktujte nás",
    description:
      "Napište nám nebo zavolejte. Probereme vaši akci, termín a představy.",
  },
  {
    number: "02",
    title: "Připravíme vše",
    description:
      "Přivezeme 360° photobooth, nastavíme osvětlení a připravíme rekvizity.",
  },
  {
    number: "03",
    title: "Točí se!",
    description:
      "Hosté vstoupí na plošinu a během pár sekund vznikne epické 360° video.",
  },
  {
    number: "04",
    title: "Sdílení ihned",
    description:
      "Video se okamžitě zpracuje a hosté si ho sdílí přímo na sociální sítě.",
  },
];

export const PACKAGES = [
  {
    name: "Základní",
    price: "od 8 990 Kč",
    features: [
      "2 hodiny zábavy",
      "Neomezený počet natočení",
      "Okamžité sdílení",
      "Vlastní overlay s logem",
      "Obsluha na místě",
      "Rekvizity v ceně",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "od 14 990 Kč",
    badge: "NEJOBLÍBENĚJŠÍ",
    features: [
      "4 hodiny zábavy",
      "Neomezený počet natočení",
      "Okamžité sdílení",
      "Vlastní overlay s logem",
      "Obsluha na místě",
      "Prémiové rekvizity",
      "LED podium",
      "Slow-motion efekt",
      "Online galerie",
    ],
    highlighted: true,
  },
];

export const GALLERY_ITEMS = [
  { tag: "Svatba", gradient: "from-gold/20 to-gold/5" },
  { tag: "Firemní akce", gradient: "from-purple-500/20 to-purple-500/5" },
  { tag: "Narozeniny", gradient: "from-pink-500/20 to-pink-500/5" },
  { tag: "Festival", gradient: "from-blue-500/20 to-blue-500/5" },
  { tag: "Promo", gradient: "from-green-500/20 to-green-500/5" },
];

export const REVIEWS = [
  {
    name: "Petra K.",
    initials: "PK",
    event: "Svatba",
    rating: 5,
    text: "Absolutní pecka! Hosté se od photoboothu nemohli odtrhnout. Videa jsou úžasná kvalita a sdílení fungovalo bezchybně. Děkujeme!",
  },
  {
    name: "Martin D.",
    initials: "MD",
    event: "Firemní večírek",
    rating: 5,
    text: "Profesionální přístup od začátku do konce. Kluci přijeli, vše nachystali a postarali se o skvělou zábavu. Jednoznačně doporučuji.",
  },
  {
    name: "Lucie S.",
    initials: "LS",
    event: "Narozeniny",
    rating: 5,
    text: "Byl to ten nejlepší dárek! Každý z hostů dostal úžasné video na památku. Profesionální obsluha a super rekvizity.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Kolik místa photobooth potřebuje?",
    answer:
      "360° photobooth potřebuje prostor přibližně 3×3 metry. Plošina má průměr 80 cm a kolem ní potřebujeme prostor pro rameno kamery a bezpečný pohyb hostů.",
  },
  {
    question: "Kolik lidí se vejde na plošinu najednou?",
    answer:
      "Na plošinu se pohodlně vejdou 1–3 osoby. Pro skupinové záběry doporučujeme max. 3 osoby, aby bylo video co nejefektnější.",
  },
  {
    question: "Jak dlouho trvá jedno natočení?",
    answer:
      "Samotné natočení trvá přibližně 15–30 sekund. Zpracování a odeslání videa pak zabere asi 1 minutu. Host má své video k dispozici prakticky okamžitě.",
  },
  {
    question: "Můžeme mít vlastní logo/overlay na videu?",
    answer:
      "Samozřejmě! Ke každému balíčku patří vlastní overlay s vaším logem nebo textem. Připravíme ho podle vašich představ před akcí.",
  },
  {
    question: "Jedete i mimo Prahu?",
    answer:
      "Ano, pokrýváme celou Českou republiku. U akcí mimo Prahu a Středočeský kraj účtujeme cestovné dle vzdálenosti. Konkrétní cenu vám rádi sdělíme.",
  },
  {
    question: "Co je potřeba z naší strany zajistit?",
    answer:
      "Potřebujeme pouze přístup k elektrické zásuvce (230V) a rovný povrch pro umístění plošiny. O vše ostatní se postaráme my.",
  },
];

export const COVERAGE_REGIONS = {
  primary: ["Praha", "Brno", "Ostrava"],
  available: ["Plzeň", "Liberec", "Olomouc", "České Budějovice", "Hradec Králové"],
  onRequest: ["Karlovy Vary", "Ústí nad Labem", "Zlín", "Jihlava", "Pardubice"],
};

export const VOUCHER_BENEFITS = [
  "Darujte zážitek, na který se nezapomíná",
  "Platnost voucheru 12 měsíců",
  "Možnost výběru balíčku",
  "Elegantní digitální podoba",
  "Osobní věnování",
];

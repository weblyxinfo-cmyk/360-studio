import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { hash } from "bcryptjs";
import { nanoid } from "nanoid";
import { users } from "./schema/users";
import { reviews } from "./schema/reviews";
import { galleryItems } from "./schema/gallery-items";
import { packages, packageFeatures } from "./schema/packages";
import { settings } from "./schema/settings";

async function seed() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  // Create tables
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      initials TEXT NOT NULL,
      text TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      event_type TEXT,
      city TEXT,
      is_visible INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      tag TEXT,
      image_url TEXT,
      video_url TEXT,
      has_play INTEGER NOT NULL DEFAULT 0,
      is_visible INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      grid_span TEXT DEFAULT '1x1',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS packages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      duration TEXT NOT NULL,
      price INTEGER NOT NULL,
      price_note TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      featured_label TEXT,
      is_visible INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS package_features (
      id TEXT PRIMARY KEY,
      package_id TEXT NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS vouchers (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      package_id TEXT REFERENCES packages(id),
      recipient_name TEXT,
      recipient_email TEXT,
      buyer_name TEXT,
      buyer_email TEXT,
      personal_message TEXT,
      amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_payment',
      payment_id TEXT,
      valid_from TEXT,
      valid_until TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      order_number TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      package_id TEXT REFERENCES packages(id),
      event_date TEXT NOT NULL,
      event_time_start TEXT NOT NULL,
      event_time_end TEXT NOT NULL,
      event_type TEXT,
      event_location TEXT,
      event_notes TEXT,
      total_amount INTEGER NOT NULL,
      voucher_code TEXT,
      discount_amount INTEGER DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending_payment',
      admin_notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      payment_type TEXT NOT NULL,
      booking_id TEXT,
      voucher_id TEXT,
      gopay_payment_id TEXT,
      gopay_state TEXT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'CZK',
      status TEXT NOT NULL DEFAULT 'pending',
      refunded_amount INTEGER DEFAULT 0,
      gateway_url TEXT,
      paid_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS availability_slots (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time_start TEXT NOT NULL,
      time_end TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      booking_id TEXT,
      block_reason TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS availability_patterns (
      id TEXT PRIMARY KEY,
      day_of_week INTEGER NOT NULL,
      time_start TEXT NOT NULL,
      time_end TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'string',
      description TEXT
    );
  `);

  console.log("✅ Tables created");

  // Seed admin user
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "admin123";
  const passwordHash = await hash(adminPassword, 12);

  await db.insert(users).values({
    id: nanoid(),
    email: "admin@kajostudio360.cz",
    name: "Admin",
    passwordHash,
    role: "superadmin",
  }).onConflictDoNothing();

  console.log("✅ Admin user created (admin@kajostudio360.cz)");

  // Seed reviews
  const reviewsData = [
    {
      id: nanoid(),
      name: "Kateřina N.",
      initials: "KN",
      text: "Fotobooth byl absolutní hit naší svatby! Hosté se bavili celý večer a videa jsou naprosto úžasná. Jednoznačně nejlepší investice do zábavy.",
      rating: 5,
      eventType: "Svatba",
      city: "Praha",
      isVisible: true,
      sortOrder: 1,
    },
    {
      id: nanoid(),
      name: "Martin T.",
      initials: "MT",
      text: "Objednali jsme na firemní vánoční večírek a kolegové byli nadšení. Profesionální přístup, skvělá kvalita videí. Určitě objednáme znovu!",
      rating: 5,
      eventType: "Firemní akce",
      city: "Brno",
      isVisible: true,
      sortOrder: 2,
    },
    {
      id: nanoid(),
      name: "Lucie P.",
      initials: "LP",
      text: "Manžel měl padesátiny a chtěla jsem něco speciálního. 360 booth předčil všechna očekávání. Děkujeme za perfektní servis!",
      rating: 5,
      eventType: "Narozeniny",
      city: "Ostrava",
      isVisible: true,
      sortOrder: 3,
    },
  ];

  for (const review of reviewsData) {
    await db.insert(reviews).values(review).onConflictDoNothing();
  }
  console.log("✅ Reviews seeded");

  // Seed gallery items
  const galleryData = [
    {
      id: nanoid(),
      title: "Svatební 360 zážitek",
      subtitle: "Romantická atmosféra zachycená v pohybu",
      tag: "Video",
      hasPlay: true,
      isVisible: true,
      sortOrder: 1,
      gridSpan: "2x2",
    },
    {
      id: nanoid(),
      title: "Oslava 30. narozenin",
      subtitle: "Party plná energie a zábavy",
      tag: "Narozeniny",
      hasPlay: false,
      isVisible: true,
      sortOrder: 2,
      gridSpan: "1x1",
    },
    {
      id: nanoid(),
      title: "Teambuilding 2025",
      subtitle: "Kreativní zábava pro celý tým",
      tag: "Firemní akce",
      hasPlay: false,
      isVisible: true,
      sortOrder: 3,
      gridSpan: "1x1",
    },
    {
      id: nanoid(),
      title: "Firemní vánoční večírek",
      subtitle: "Elegance a zábava v jednom",
      tag: "Video",
      hasPlay: true,
      isVisible: true,
      sortOrder: 4,
      gridSpan: "1x1",
    },
    {
      id: nanoid(),
      title: "Reprezentační ples",
      subtitle: "Exkluzivní momenty na plese",
      tag: "Ples",
      hasPlay: false,
      isVisible: true,
      sortOrder: 5,
      gridSpan: "1x1",
    },
  ];

  for (const item of galleryData) {
    await db.insert(galleryItems).values(item).onConflictDoNothing();
  }
  console.log("✅ Gallery items seeded");

  // Seed packages
  const basicPkgId = nanoid();
  const premiumPkgId = nanoid();

  await db.insert(packages).values([
    {
      id: basicPkgId,
      slug: "zakladni",
      name: "Základní",
      duration: "1 hodina zábavy",
      price: 0, // Price TBD - placeholder
      priceNote: "Ideální pro menší oslavy a narozeniny",
      isFeatured: false,
      isVisible: true,
      sortOrder: 1,
    },
    {
      id: premiumPkgId,
      slug: "premium",
      name: "Premium",
      duration: "2 hodiny zábavy",
      price: 0, // Price TBD - placeholder
      priceNote: "Perfektní pro svatby a firemní akce",
      isFeatured: true,
      featuredLabel: "NEJOBLÍBENĚJŠÍ",
      isVisible: true,
      sortOrder: 2,
    },
  ]).onConflictDoNothing();

  // Seed package features
  const basicFeatures = [
    "Profesionální obsluha",
    "Neomezený počet natočení",
    "Rekvizity a doplňky",
    "Okamžité sdílení přes QR kód",
    "Digitální galerie videí",
    "Instalace a odvoz v ceně",
  ];

  const premiumFeatures = [
    "Vše ze základního balíčku",
    "Vlastní branding (logo, barvy)",
    "Slow-motion efekty",
    "Prémiové pozadí dle výběru",
    "USB s videy po akci",
    "Prioritní termíny",
  ];

  for (let i = 0; i < basicFeatures.length; i++) {
    await db.insert(packageFeatures).values({
      id: nanoid(),
      packageId: basicPkgId,
      text: basicFeatures[i],
      sortOrder: i + 1,
    }).onConflictDoNothing();
  }

  for (let i = 0; i < premiumFeatures.length; i++) {
    await db.insert(packageFeatures).values({
      id: nanoid(),
      packageId: premiumPkgId,
      text: premiumFeatures[i],
      sortOrder: i + 1,
    }).onConflictDoNothing();
  }
  console.log("✅ Packages seeded");

  // Seed settings (FAQ + Coverage)
  const faqData = [
    { q: "Kolik místa fotobooth potřebuje?", a: "Booth potřebuje prostor přibližně 3x3 metry. Poradíme Vám s rozmístěním na Vaší akci." },
    { q: "Potřebujete přístup k elektřině?", a: "Ano, potřebujeme standardní elektrickou zásuvku 230V v dosahu do 10 metrů od místa instalace." },
    { q: "Jak dlouho trvá instalace?", a: "Instalace trvá přibližně 30-45 minut. Přijedeme s dostatečným předstihem před začátkem akce." },
    { q: "Lze personalizovat pozadí a overlay?", a: "Ano, v Premium balíčku zahrnujeme vlastní branding - logo, barvy, pozadí i textové overlaye podle Vašich přání." },
    { q: "Jak hosté získají svá videa?", a: "Každý host si stáhne video okamžitě přes QR kód přímo na svůj telefon. Po akci obdržíte kompletní galerii." },
    { q: "Fungujete i mimo velká města?", a: "Ano, jezdíme po celé ČR. Doprava je v ceně v rámci našich hlavních regionů, ostatní lokality dle dohody." },
  ];

  const coverageData = [
    { name: "Praha a Středočeský kraj", badge: "Hlavní region" },
    { name: "Brno a Jihomoravský kraj", badge: "Hlavní region" },
    { name: "Ostrava a Moravskoslezský kraj", badge: "Dostupné" },
    { name: "Plzeň a Západní Čechy", badge: "Dostupné" },
    { name: "Olomouc a okolí", badge: "Dostupné" },
    { name: "Liberec, Hradec Králové", badge: "Na poptávku" },
  ];

  await db.insert(settings).values([
    { key: "faq", value: JSON.stringify(faqData), type: "json", description: "FAQ items" },
    { key: "coverage", value: JSON.stringify(coverageData), type: "json", description: "Coverage areas" },
    { key: "contact_email", value: "info@kajostudio360.cz", type: "string", description: "Contact email" },
    { key: "contact_phone", value: "+420 XXX XXX XXX", type: "string", description: "Contact phone" },
  ]).onConflictDoNothing();

  console.log("✅ Settings seeded");

  // Seed availability patterns (default working hours)
  await client.executeMultiple(`
    INSERT OR IGNORE INTO availability_patterns (id, day_of_week, time_start, time_end, is_active)
    VALUES
      ('${nanoid()}', 1, '09:00', '21:00', 1),
      ('${nanoid()}', 2, '09:00', '21:00', 1),
      ('${nanoid()}', 3, '09:00', '21:00', 1),
      ('${nanoid()}', 4, '09:00', '21:00', 1),
      ('${nanoid()}', 5, '09:00', '22:00', 1),
      ('${nanoid()}', 6, '10:00', '22:00', 1),
      ('${nanoid()}', 0, '10:00', '20:00', 1);
  `);

  console.log("✅ Availability patterns seeded");
  console.log("🎉 Seed complete!");

  client.close();
}

seed().catch(console.error);

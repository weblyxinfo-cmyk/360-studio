import { createClient } from "@libsql/client";

async function cleanup() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  console.log("🧹 Cleaning up packages...");

  // 1. Delete CORPORATE package and its features
  await client.execute("DELETE FROM package_features WHERE package_id IN (SELECT id FROM packages WHERE slug = 'corporate')");
  await client.execute("DELETE FROM packages WHERE slug = 'corporate'");
  console.log("✅ CORPORATE deleted");

  // 2. Get existing package IDs
  const startPkg = await client.execute("SELECT id FROM packages WHERE slug = 'start'");
  const doublePkg = await client.execute("SELECT id FROM packages WHERE slug = 'double-fun'");
  const vipPkg = await client.execute("SELECT id FROM packages WHERE slug = 'vip-360-exclusive'");

  const startId = startPkg.rows[0]?.id as string;
  const doubleId = doublePkg.rows[0]?.id as string;
  const vipId = vipPkg.rows[0]?.id as string;

  if (!startId || !doubleId || !vipId) {
    console.error("❌ Missing packages in DB");
    client.close();
    return;
  }

  // 3. Delete old features
  await client.execute("DELETE FROM package_features WHERE package_id IN (?, ?, ?)", [startId, doubleId, vipId]);

  // 4. Insert correct features matching Excel
  const baseFeatures = [
    "Profesionální obsluha",
    "Neomezený počet natočení",
    "Zábavné rekvizity",
    "Barevná LED světla",
    "Okamžité sdílení přes QR kód",
    "Digitální galerie videí",
    "Doprava a instalace v ceně",
  ];

  const vipExtras = [
    "Přednostní termín",
    "VIP zábrany (sloupky s páskou)",
    "Asistent navíc při větší akci",
    "Možnost prodloužení přímo na místě",
  ];

  // START features
  for (let i = 0; i < baseFeatures.length; i++) {
    await client.execute(
      "INSERT INTO package_features (id, package_id, text, sort_order) VALUES (lower(hex(randomblob(10))), ?, ?, ?)",
      [startId, baseFeatures[i], i + 1]
    );
  }

  // DOUBLE FUN features (same base)
  for (let i = 0; i < baseFeatures.length; i++) {
    await client.execute(
      "INSERT INTO package_features (id, package_id, text, sort_order) VALUES (lower(hex(randomblob(10))), ?, ?, ?)",
      [doubleId, baseFeatures[i], i + 1]
    );
  }

  // VIP features (base + extras)
  const allVip = [...baseFeatures, ...vipExtras];
  for (let i = 0; i < allVip.length; i++) {
    await client.execute(
      "INSERT INTO package_features (id, package_id, text, sort_order) VALUES (lower(hex(randomblob(10))), ?, ?, ?)",
      [vipId, allVip[i], i + 1]
    );
  }

  // 5. Update VIP duration and priceNote to match Excel
  await client.execute(
    "UPDATE packages SET duration = 'Na míru (více hodin nebo dní)', price_note = NULL WHERE slug = 'vip-360-exclusive'"
  );

  // 6. Update DOUBLE FUN priceNote
  await client.execute(
    "UPDATE packages SET price_note = 'Perfektní pro svatby, firemní akce a větší oslavy.' WHERE slug = 'double-fun'"
  );

  // 7. Update START priceNote
  await client.execute(
    "UPDATE packages SET price_note = 'Ideální pro menší oslavy a narozeniny' WHERE slug = 'start'"
  );

  console.log("✅ Features updated to match Excel");
  console.log("🎉 Cleanup complete!");

  client.close();
}

cleanup().catch(console.error);

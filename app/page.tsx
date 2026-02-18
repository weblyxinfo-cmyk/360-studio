import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Gallery from "@/components/Gallery";
import Vouchers from "@/components/Vouchers";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Coverage from "@/components/Coverage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { reviews as reviewsTable } from "@/db/schema/reviews";
import { galleryItems } from "@/db/schema/gallery-items";
import { packages as packagesTable, packageFeatures } from "@/db/schema/packages";
import { settings } from "@/db/schema/settings";
import { asc, eq } from "drizzle-orm";

export const revalidate = 60;

async function getHomeData() {
  try {
    // Fetch directly from DB instead of via API
    const allReviews = await db.select().from(reviewsTable).orderBy(asc(reviewsTable.sortOrder));
    const visibleReviews = allReviews.filter((r) => r.isVisible);

    const allGallery = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
    const visibleGallery = allGallery.filter((g) => g.isVisible);

    const allPackages = await db.select().from(packagesTable).orderBy(asc(packagesTable.sortOrder));
    const visiblePackages = allPackages.filter((p) => p.isVisible);

    const pkgsWithFeatures = await Promise.all(
      visiblePackages.map(async (pkg) => {
        const features = await db
          .select()
          .from(packageFeatures)
          .where(eq(packageFeatures.packageId, pkg.id))
          .orderBy(asc(packageFeatures.sortOrder));
        return { ...pkg, features };
      })
    );

    // FAQ and Coverage from settings
    let faq, coverage;
    try {
      const [faqRow] = await db.select().from(settings).where(eq(settings.key, "faq")).limit(1);
      const [coverageRow] = await db.select().from(settings).where(eq(settings.key, "coverage")).limit(1);
      faq = faqRow?.value ? JSON.parse(faqRow.value) : undefined;
      coverage = coverageRow?.value ? JSON.parse(coverageRow.value) : undefined;
    } catch {
      // Settings may not exist yet
    }

    return {
      reviews: visibleReviews.length > 0 ? visibleReviews : undefined,
      gallery: visibleGallery.length > 0 ? visibleGallery : undefined,
      packages: pkgsWithFeatures.length > 0 ? pkgsWithFeatures : undefined,
      faq,
      coverage,
    };
  } catch (error) {
    console.error("getHomeData error:", error);
    return { reviews: undefined, gallery: undefined, packages: undefined, faq: undefined, coverage: undefined };
  }
}

export default async function Home() {
  const { reviews, gallery, packages, faq, coverage } = await getHomeData();

  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Packages data={packages} />
      <Gallery data={gallery} />
      <Vouchers />
      <Reviews data={reviews} />
      <FAQ data={faq} />
      <Coverage data={coverage} />
      <Contact />
      <Footer />
    </>
  );
}

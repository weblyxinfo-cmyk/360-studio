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

export const revalidate = 60; // ISR - revalidate every 60 seconds

async function getHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const [reviewsRes, galleryRes, packagesRes] = await Promise.all([
      fetch(`${baseUrl}/api/content/reviews`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${baseUrl}/api/content/gallery`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${baseUrl}/api/content/packages`, { next: { revalidate: 60 } }).catch(() => null),
    ]);

    const reviews = reviewsRes?.ok ? await reviewsRes.json() : undefined;
    const gallery = galleryRes?.ok ? await galleryRes.json() : undefined;
    const packages = packagesRes?.ok ? await packagesRes.json() : undefined;

    // FAQ and Coverage from public settings
    let faq, coverage;
    try {
      const settingsRes = await fetch(`${baseUrl}/api/content/settings`, { next: { revalidate: 60 } });
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        faq = settingsData.faq?.value ? JSON.parse(settingsData.faq.value) : undefined;
        coverage = settingsData.coverage?.value ? JSON.parse(settingsData.coverage.value) : undefined;
      }
    } catch {
      // Settings fetch may fail during build
    }

    return { reviews, gallery, packages, faq, coverage };
  } catch {
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

import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Packages from "@/components/sections/Packages";
import Gallery from "@/components/sections/Gallery";
import Vouchers from "@/components/sections/Vouchers";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import CoverageMap from "@/components/sections/CoverageMap";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Packages />
      <Gallery />
      <Vouchers />
      <Reviews />
      <FAQ />
      <CoverageMap />
      <Contact />
    </>
  );
}

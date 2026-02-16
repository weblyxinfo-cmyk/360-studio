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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Packages />
      <Gallery />
      <Vouchers />
      <Reviews />
      <FAQ />
      <Coverage />
      <Contact />
      <Footer />
    </>
  );
}

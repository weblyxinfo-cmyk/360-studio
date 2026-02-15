import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kajo Studio 360 | Prémiový 360° Photobooth",
  description:
    "Pronájem prémiového 360° photoboothu pro svatby, firemní akce a narozeniny. Epická videa, okamžité sdílení, profesionální obsluha po celé ČR.",
  keywords: [
    "360 photobooth",
    "photobooth pronájem",
    "360 video",
    "svatební photobooth",
    "firemní akce",
    "Praha",
    "Brno",
    "Ostrava",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://kajostudio.cz",
    siteName: "Kajo Studio 360",
    title: "Kajo Studio 360 | Prémiový 360° Photobooth",
    description:
      "Pronájem prémiového 360° photoboothu pro svatby, firemní akce a narozeniny.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kajo Studio 360",
    description:
      "Pronájem prémiového 360° photoboothu pro svatby, firemní akce a narozeniny.",
    url: "https://kajostudio.cz",
    email: "info@kajostudio.cz",
    telephone: "+420777888999",
    areaServed: {
      "@type": "Country",
      name: "Česká republika",
    },
    priceRange: "$$",
  };

  return (
    <html lang="cs" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

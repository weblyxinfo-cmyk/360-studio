import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Kajo Studio 360 | Premiovy 360° Photobooth",
  description:
    "Pronajem premioveho 360° photoboothu pro svatby, firemni akce a narozeniny. Epicka videa, okamzite sdileni, profesionalni obsluha po cele CR.",
  keywords: [
    "360 photobooth",
    "photobooth pronajem",
    "360 video",
    "svatebni photobooth",
    "firemni akce",
    "Praha",
    "Brno",
    "Ostrava",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://kajostudio.cz",
    siteName: "Kajo Studio 360",
    title: "Kajo Studio 360 | Premiovy 360° Photobooth",
    description:
      "Pronajem premioveho 360° photoboothu pro svatby, firemni akce a narozeniny.",
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
      "Pronajem premioveho 360° photoboothu pro svatby, firemni akce a narozeniny.",
    url: "https://kajostudio.cz",
    email: "info@kajostudio360.cz",
    areaServed: {
      "@type": "Country",
      name: "Ceska republika",
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
      <body>{children}</body>
    </html>
  );
}

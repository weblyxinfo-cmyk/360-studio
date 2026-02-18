import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Syne, DM_Sans } from "next/font/google";
import "../globals.css";
import "./admin.css";

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
  title: "Admin | Kajo Studio 360",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className={`${syne.variable} ${dmSans.variable} admin-root`}>
        {children}
      </div>
    </SessionProvider>
  );
}

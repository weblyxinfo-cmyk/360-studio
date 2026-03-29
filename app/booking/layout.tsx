import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervace | Kajo Studio 360",
  description: "Zarezervujte si 360° photobooth na vaši akci. Vyberte termín, balíček a zaplaťte online.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

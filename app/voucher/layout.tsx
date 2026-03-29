import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dárkový poukaz | Kajo Studio 360",
  description: "Darujte zážitek na 360° photobooth. Vyberte balíček, zaplaťte online a voucher přijde na e-mail.",
};

export default function VoucherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bookingId = searchParams.get("bookingId");
  const voucherId = searchParams.get("voucherId");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz";

  if (bookingId) {
    redirect(`${siteUrl}/booking/${bookingId}/success`);
  }

  if (voucherId) {
    redirect(`${siteUrl}/voucher/success`);
  }

  redirect(siteUrl);
}

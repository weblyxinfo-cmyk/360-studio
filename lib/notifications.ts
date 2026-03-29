import { resend } from "./resend";

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "info@kajostudio360.cz";
const FROM_EMAIL = "Kajo Studio 360 <onboarding@resend.dev>";

function esc(str: string | null | undefined): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function notifyNewBooking(booking: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventType?: string | null;
  eventLocation?: string | null;
  totalAmount: number;
}) {
  if (!resend) {
    console.log("Resend not configured. Booking notification skipped:", booking.orderNumber);
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nová rezervace: ${booking.orderNumber} — ${esc(booking.customerName)}`,
    html: `
      <h2>Nová rezervace</h2>
      <p><strong>Objednávka:</strong> ${esc(booking.orderNumber)}</p>
      <p><strong>Zákazník:</strong> ${esc(booking.customerName)} (${esc(booking.customerEmail)})</p>
      ${booking.customerPhone ? `<p><strong>Telefon:</strong> ${esc(booking.customerPhone)}</p>` : ""}
      <p><strong>Datum:</strong> ${esc(booking.eventDate)}</p>
      <p><strong>Čas:</strong> ${esc(booking.eventTimeStart)} – ${esc(booking.eventTimeEnd)}</p>
      ${booking.eventType ? `<p><strong>Typ akce:</strong> ${esc(booking.eventType)}</p>` : ""}
      ${booking.eventLocation ? `<p><strong>Místo:</strong> ${esc(booking.eventLocation)}</p>` : ""}
      <p><strong>Částka:</strong> ${(booking.totalAmount / 100).toLocaleString("cs-CZ")} Kč</p>
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz"}/admin/bookings">Zobrazit v adminu</a></p>
    `,
  });
}

export async function notifyPaymentReceived(payment: {
  orderNumber: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentType: string;
}) {
  if (!resend) {
    console.log("Resend not configured. Payment notification skipped.");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Platba přijata: ${payment.orderNumber} — ${(payment.amount / 100).toLocaleString("cs-CZ")} Kč`,
    html: `
      <h2>Platba přijata</h2>
      <p><strong>Typ:</strong> ${payment.paymentType === "booking" ? "Rezervace" : "Voucher"}</p>
      <p><strong>Objednávka:</strong> ${esc(payment.orderNumber)}</p>
      <p><strong>Zákazník:</strong> ${esc(payment.customerName)} (${esc(payment.customerEmail)})</p>
      <p><strong>Částka:</strong> ${(payment.amount / 100).toLocaleString("cs-CZ")} Kč</p>
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz"}/admin/orders">Zobrazit v adminu</a></p>
    `,
  });
}

export async function notifyNewReview(review: {
  name: string;
  text: string;
  rating: number;
  eventType?: string | null;
  city?: string | null;
}) {
  if (!resend) {
    console.log("Resend not configured. Review notification skipped.");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nová recenze: ${review.name} — ${"★".repeat(review.rating)}`,
    html: `
      <h2>Nová recenze</h2>
      <p><strong>Od:</strong> ${esc(review.name)}</p>
      <p><strong>Hodnocení:</strong> ${"★".repeat(review.rating)}</p>
      ${review.eventType ? `<p><strong>Typ akce:</strong> ${esc(review.eventType)}</p>` : ""}
      ${review.city ? `<p><strong>Město:</strong> ${esc(review.city)}</p>` : ""}
      <p><strong>Text:</strong></p>
      <blockquote>${esc(review.text)}</blockquote>
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz"}/admin/reviews">Zobrazit v adminu</a></p>
    `,
  });
}

export async function sendVoucherConfirmation(voucher: {
  buyerEmail: string;
  buyerName: string | null;
  recipientName: string | null;
  code: string;
  amount: number;
  validUntil: string | null;
  packageName?: string;
}) {
  if (!resend) {
    console.log("Resend not configured. Voucher confirmation skipped.");
    return;
  }

  const formattedAmount = (voucher.amount / 100).toLocaleString("cs-CZ");
  const validUntilFormatted = voucher.validUntil
    ? new Date(voucher.validUntil).toLocaleDateString("cs-CZ")
    : "12 měsíců od nákupu";

  await resend.emails.send({
    from: FROM_EMAIL,
    to: voucher.buyerEmail,
    subject: `Váš dárkový poukaz ${voucher.code} — Kajo Studio 360`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #c8a96e;">Váš dárkový poukaz je připraven!</h1>
        <p>Dobrý den${voucher.buyerName ? `, ${voucher.buyerName}` : ""},</p>
        <p>Děkujeme za nákup dárkového poukazu. Zde jsou detaily:</p>

        <div style="background: #1a1a1a; color: #f8f7f4; padding: 30px; border-radius: 16px; margin: 20px 0; text-align: center; border: 1px solid #c8a96e;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 8px;">Kód poukazu</p>
          <p style="font-size: 28px; font-weight: 800; color: #c8a96e; letter-spacing: 3px; margin-bottom: 16px;">${voucher.code}</p>
          <p style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">${formattedAmount} Kč</p>
          ${voucher.packageName ? `<p style="font-size: 14px; color: #888;">Balíček: ${voucher.packageName}</p>` : ""}
        </div>

        ${voucher.recipientName ? `<p>Poukaz je určen pro: <strong>${voucher.recipientName}</strong></p>` : ""}

        <div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <p><strong>Hodnota:</strong> ${formattedAmount} Kč</p>
          <p><strong>Platnost do:</strong> ${validUntilFormatted}</p>
          <p><strong>Uplatnění:</strong> Zadejte kód při rezervaci na <a href="https://kajostudio.cz/booking" style="color: #c8a96e;">kajostudio.cz/booking</a></p>
        </div>

        <p>Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat.</p>
        <p>S pozdravem,<br><strong>Kajo Studio 360</strong></p>
      </div>
    `,
  });
}

export async function sendBookingConfirmation(booking: {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  eventDate: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventType?: string | null;
  eventLocation?: string | null;
  totalAmount: number;
}) {
  if (!resend) {
    console.log("Resend not configured. Confirmation email skipped.");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: booking.customerEmail,
    subject: `Potvrzení rezervace ${booking.orderNumber} — Kajo Studio 360`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #c8a96e;">Děkujeme za Vaši rezervaci!</h1>
        <p>Dobrý den, ${esc(booking.customerName)},</p>
        <p>Vaše rezervace byla úspěšně zpracována. Zde jsou detaily:</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <p><strong>Objednávka:</strong> ${esc(booking.orderNumber)}</p>
          <p><strong>Datum:</strong> ${esc(booking.eventDate)}</p>
          <p><strong>Čas:</strong> ${esc(booking.eventTimeStart)} – ${esc(booking.eventTimeEnd)}</p>
          ${booking.eventType ? `<p><strong>Typ akce:</strong> ${esc(booking.eventType)}</p>` : ""}
          ${booking.eventLocation ? `<p><strong>Místo:</strong> ${esc(booking.eventLocation)}</p>` : ""}
          <p><strong>Celková částka:</strong> ${(booking.totalAmount / 100).toLocaleString("cs-CZ")} Kč</p>
        </div>

        <p>Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat.</p>
        <p>S pozdravem,<br><strong>Kajo Studio 360</strong></p>
      </div>
    `,
  });
}

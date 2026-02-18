import { resend } from "./resend";

const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "info@kajostudio360.cz";
const FROM_EMAIL = "Kajo Studio 360 <onboarding@resend.dev>";

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
    subject: `Nová rezervace: ${booking.orderNumber} — ${booking.customerName}`,
    html: `
      <h2>Nová rezervace</h2>
      <p><strong>Objednávka:</strong> ${booking.orderNumber}</p>
      <p><strong>Zákazník:</strong> ${booking.customerName} (${booking.customerEmail})</p>
      ${booking.customerPhone ? `<p><strong>Telefon:</strong> ${booking.customerPhone}</p>` : ""}
      <p><strong>Datum:</strong> ${booking.eventDate}</p>
      <p><strong>Čas:</strong> ${booking.eventTimeStart} – ${booking.eventTimeEnd}</p>
      ${booking.eventType ? `<p><strong>Typ akce:</strong> ${booking.eventType}</p>` : ""}
      ${booking.eventLocation ? `<p><strong>Místo:</strong> ${booking.eventLocation}</p>` : ""}
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
      <p><strong>Objednávka:</strong> ${payment.orderNumber}</p>
      <p><strong>Zákazník:</strong> ${payment.customerName} (${payment.customerEmail})</p>
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
      <p><strong>Od:</strong> ${review.name}</p>
      <p><strong>Hodnocení:</strong> ${"★".repeat(review.rating)}</p>
      ${review.eventType ? `<p><strong>Typ akce:</strong> ${review.eventType}</p>` : ""}
      ${review.city ? `<p><strong>Město:</strong> ${review.city}</p>` : ""}
      <p><strong>Text:</strong></p>
      <blockquote>${review.text}</blockquote>
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://kajostudio.cz"}/admin/reviews">Zobrazit v adminu</a></p>
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
        <p>Dobrý den, ${booking.customerName},</p>
        <p>Vaše rezervace byla úspěšně zpracována. Zde jsou detaily:</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <p><strong>Objednávka:</strong> ${booking.orderNumber}</p>
          <p><strong>Datum:</strong> ${booking.eventDate}</p>
          <p><strong>Čas:</strong> ${booking.eventTimeStart} – ${booking.eventTimeEnd}</p>
          ${booking.eventType ? `<p><strong>Typ akce:</strong> ${booking.eventType}</p>` : ""}
          ${booking.eventLocation ? `<p><strong>Místo:</strong> ${booking.eventLocation}</p>` : ""}
          <p><strong>Celková částka:</strong> ${(booking.totalAmount / 100).toLocaleString("cs-CZ")} Kč</p>
        </div>

        <p>Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat.</p>
        <p>S pozdravem,<br><strong>Kajo Studio 360</strong></p>
      </div>
    `,
  });
}

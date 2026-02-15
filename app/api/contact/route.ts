import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  eventType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const contactEmail = process.env.CONTACT_EMAIL || "info@kajostudio.cz";

    if (resend) {
      await resend.emails.send({
        from: "Kajo Studio 360 <onboarding@resend.dev>",
        to: contactEmail,
        subject: `Nová poptávka: ${data.eventType} — ${data.name}`,
        html: `
          <h2>Nová poptávka z webu</h2>
          <p><strong>Jméno:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone || "Neuvedeno"}</p>
          <p><strong>Typ akce:</strong> ${data.eventType}</p>
          <p><strong>Zpráva:</strong></p>
          <p>${data.message}</p>
        `,
      });
    } else {
      console.log("Resend not configured. Contact form submission:", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Neplatná data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}

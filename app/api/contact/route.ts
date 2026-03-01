import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { db } from "@/db";
import { inquiries } from "@/db/schema/inquiries";
import { nanoid } from "nanoid";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  eventType: z.string().min(1),
  packageType: z.string().optional(),
  eventDate: z.string().optional(),
  eventLocation: z.string().optional(),
  message: z.string().optional().default("Prosím o nezávaznou nabídku."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Always save to DB so inquiries are never lost
    await db.insert(inquiries).values({
      id: nanoid(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      eventType: data.eventType,
      packageType: data.packageType || null,
      eventDate: data.eventDate || null,
      eventLocation: data.eventLocation || null,
      message: data.message || null,
    });

    // Send email notification if Resend is configured
    const contactEmail = process.env.CONTACT_EMAIL || "info@kajostudio360.cz";

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
          <p><strong>Balíček:</strong> ${data.packageType || "Neuvedeno"}</p>
          <p><strong>Datum akce:</strong> ${data.eventDate || "Neuvedeno"}</p>
          <p><strong>Místo konání:</strong> ${data.eventLocation || "Neuvedeno"}</p>
          <p><strong>Zpráva:</strong></p>
          <p>${data.message}</p>
        `,
      });
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

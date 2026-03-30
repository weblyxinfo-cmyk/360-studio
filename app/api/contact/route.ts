import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { db } from "@/db";
import { inquiries } from "@/db/schema/inquiries";
import { nanoid } from "nanoid";

function esc(str: string | null | undefined): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

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
      try {
        await resend.emails.send({
          from: "Kajo Studio 360 <onboarding@resend.dev>",
          to: contactEmail,
          subject: `Nová poptávka: ${esc(data.eventType)} — ${esc(data.name)}`,
          html: `
            <h2>Nová poptávka z webu</h2>
            <p><strong>Jméno:</strong> ${esc(data.name)}</p>
            <p><strong>Email:</strong> ${esc(data.email)}</p>
            <p><strong>Telefon:</strong> ${esc(data.phone) || "Neuvedeno"}</p>
            <p><strong>Typ akce:</strong> ${esc(data.eventType)}</p>
            <p><strong>Balíček:</strong> ${esc(data.packageType) || "Neuvedeno"}</p>
            <p><strong>Datum akce:</strong> ${esc(data.eventDate) || "Neuvedeno"}</p>
            <p><strong>Místo konání:</strong> ${esc(data.eventLocation) || "Neuvedeno"}</p>
            <p><strong>Zpráva:</strong></p>
            <p>${esc(data.message)}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed (inquiry saved to DB):", emailError);
      }
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

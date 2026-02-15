"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Zadejte platný email"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Vyberte typ akce"),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none";

  return (
    <section id="kontakt" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Kontaktujte nás"
            subtitle="Napište nám a my se vám ozveme do 24 hodin"
          />
        </AnimateOnScroll>

        <div className="grid gap-12 md:grid-cols-5">
          {/* Form */}
          <AnimateOnScroll direction="left" className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Jméno *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Vaše jméno"
                    className={inputClasses}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="vas@email.cz"
                    className={inputClasses}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+420 ..."
                    className={inputClasses}
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Typ akce *
                  </label>
                  <select
                    id="eventType"
                    className={`${inputClasses} cursor-pointer`}
                    defaultValue=""
                    {...register("eventType")}
                  >
                    <option value="" disabled>
                      Vyberte typ akce
                    </option>
                    <option value="svatba">Svatba</option>
                    <option value="firemni">Firemní akce</option>
                    <option value="narozeniny">Narozeniny</option>
                    <option value="festival">Festival / Promo</option>
                    <option value="jine">Jiné</option>
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-xs text-red-400">{errors.eventType.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Zpráva *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Popište vaši akci — datum, místo, počet hostů..."
                  className={`${inputClasses} resize-none`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                {status === "sending" ? (
                  "Odesílám..."
                ) : (
                  <>
                    <Send size={16} />
                    Odeslat zprávu
                  </>
                )}
              </Button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle size={16} />
                  Zpráva odeslána! Ozveme se vám co nejdříve.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={16} />
                  Něco se pokazilo. Zkuste to znovu nebo nás kontaktujte přímo.
                </div>
              )}
            </form>
          </AnimateOnScroll>

          {/* Contact info */}
          <AnimateOnScroll direction="right" className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Kontaktní údaje
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold"
                    >
                      <Mail size={18} className="text-gold" />
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold"
                    >
                      <Phone size={18} className="text-gold" />
                      {SITE.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Sledujte nás
                </h3>
                <div className="flex gap-3">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-gold hover:bg-gold/10"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href={SITE.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-gold hover:bg-gold/10"
                    aria-label="TikTok"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg>
                  </a>
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-gold hover:bg-gold/10"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface-light p-6">
                <h4 className="font-heading text-sm font-semibold mb-2">
                  Rychlá odpověď
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Na všechny poptávky odpovídáme do 24 hodin. Pro urgentní
                  dotazy volejte přímo na{" "}
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-gold hover:text-gold-light transition-colors">
                    {SITE.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

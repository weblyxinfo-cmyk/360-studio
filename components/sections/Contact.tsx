"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  email: z.string().email("Zadejte platný email"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Vyberte typ akce"),
  eventDate: z.string().optional(),
  eventLocation: z.string().optional(),
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
            label="Kontakt"
            title="Máte zájem? Ozvěte se nám"
            subtitle="Vyplňte formulář a my se Vám ozveme do 24 hodin s nabídkou šitou na míru Vaší akci."
          />
        </AnimateOnScroll>

        <div className="grid gap-12 md:grid-cols-5">
          {/* Form */}
          <AnimateOnScroll direction="left" className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Jméno
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
                    E-mail
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
                    Typ akce
                  </label>
                  <select
                    id="eventType"
                    className={`${inputClasses} cursor-pointer`}
                    defaultValue=""
                    {...register("eventType")}
                  >
                    <option value="" disabled>
                      Vyberte typ akce...
                    </option>
                    <option value="svatba">Svatba</option>
                    <option value="narozeniny">Narozeniny</option>
                    <option value="firemni">Firemní akce</option>
                    <option value="ples">Ples / Gala</option>
                    <option value="jine">Jiné</option>
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-xs text-red-400">{errors.eventType.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="eventDate" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Datum akce
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    className={inputClasses}
                    {...register("eventDate")}
                  />
                </div>
                <div>
                  <label htmlFor="eventLocation" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Místo konání
                  </label>
                  <input
                    id="eventLocation"
                    type="text"
                    placeholder="Město nebo adresa"
                    className={inputClasses}
                    {...register("eventLocation")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Zpráva
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Popište nám Vaši představu..."
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
                    Odeslat poptávku
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
                      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold"
                    >
                      <Phone size={18} className="text-gold" />
                      {SITE.phone}
                    </a>
                  </li>
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
                    <div className="flex items-start gap-3 text-sm text-muted">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                      <span className="whitespace-pre-line">{SITE.address}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Sociální sítě
                </h3>
                <div className="flex gap-3">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-xs font-semibold text-muted transition-all hover:border-gold hover:text-gold hover:bg-gold/10"
                  >
                    IG
                  </a>
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-xs font-semibold text-muted transition-all hover:border-gold hover:text-gold hover:bg-gold/10"
                  >
                    FB
                  </a>
                  <a
                    href={SITE.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-xs font-semibold text-muted transition-all hover:border-gold hover:text-gold hover:bg-gold/10"
                  >
                    TT
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] p-6">
                <h4 className="font-heading text-sm font-semibold text-gold mb-2">
                  Rychlá odpověď
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Na každou poptávku odpovídáme do 24 hodin. Většinou se ozveme ještě tentýž den.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

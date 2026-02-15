"use client";

import { Gift, Check } from "lucide-react";
import { VOUCHER_BENEFITS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

export default function Vouchers() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Dárkové poukazy"
            subtitle="Darujte nezapomenutelný zážitek"
          />
        </AnimateOnScroll>

        <div className="grid gap-12 items-center md:grid-cols-2">
          {/* Voucher mockup */}
          <AnimateOnScroll direction="left">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/3] rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-surface-light to-surface p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Gift size={28} className="text-gold" />
                    <span className="font-heading text-sm font-semibold uppercase tracking-widest text-gold">
                      Dárkový poukaz
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-3xl font-bold">
                    KAJO <span className="text-gold">STUDIO</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    360° Photobooth zážitek
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted">Hodnota</p>
                    <p className="font-heading text-2xl font-bold text-gold">
                      od 8 990 Kč
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-lg border border-gold/20 bg-gold/5 flex items-center justify-center">
                    <span className="text-xs text-muted">QR</span>
                  </div>
                </div>
              </div>
              {/* Decorative shadow card */}
              <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-gold/10 bg-surface-light" aria-hidden="true" />
            </div>
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll direction="right">
            <div>
              <h3 className="font-heading text-2xl font-bold">
                Nejlepší dárek pro vaše blízké
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                Dárkový poukaz na 360° photobooth je originální dárek, který potěší
                každého. Obdarovaný si vybere termín a balíček dle svých představ.
              </p>

              <ul className="mt-6 space-y-3">
                {VOUCHER_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm">
                    <Check size={18} className="shrink-0 text-gold" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="#kontakt">Chci poukaz</Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

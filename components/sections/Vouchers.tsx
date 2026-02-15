"use client";

import { Check } from "lucide-react";
import { VOUCHER_BENEFITS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

export default function Vouchers() {
  return (
    <section id="vouchery" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            label="Dárkové poukazy"
            title="Darujte zážitek, který nikdo nečeká"
            subtitle="Online nákup voucheru na pronájem 360 fotoboothu. Perfektní dárek na svatbu, narozeniny nebo firemní akci."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-0 items-stretch overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent md:grid-cols-2">
          {/* Voucher mockup */}
          <AnimateOnScroll direction="left">
            <div className="flex items-center justify-center p-8 md:p-16 bg-gold/[0.04]">
              <div className="w-full max-w-[300px] rounded-2xl border border-gold/30 bg-background/80 p-10 text-center transition-transform duration-400 hover:rotate-0 -rotate-3">
                <div className="font-heading text-lg font-extrabold">
                  KAJO <span className="text-gold">STUDIO</span> 360
                </div>
                <div className="mt-4 font-heading text-2xl font-bold text-gold">
                  Dárkový voucher
                </div>
                <p className="mt-2 text-sm text-muted">
                  Pronájem 360 fotoboothu
                  <br />
                  na akci dle vlastního výběru
                </p>
                <div className="mt-6 inline-block rounded-lg border border-dashed border-gold px-4 py-2 font-mono text-sm tracking-widest text-gold">
                  KAJO-2026-XXXX
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll direction="right">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <h3 className="font-heading text-2xl font-extrabold">
                Nákup za pár kliků
              </h3>
              <p className="mt-4 text-muted leading-relaxed font-light">
                Vyberte balíček, zaplaťte online a voucher s unikátním kódem Vám přijde okamžitě na e-mail jako PDF ke stažení nebo vytištění.
              </p>

              <ul className="mt-6 space-y-3">
                {VOUCHER_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm">
                    <span className="text-gold text-[0.5rem]">&#9670;</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="#">Koupit voucher</Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

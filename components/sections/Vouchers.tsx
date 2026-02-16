"use client";

import { VOUCHER_BENEFITS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

export default function Vouchers() {
  return (
    <section id="vouchery" className="py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Dárkové poukazy"
            title="Darujte zážitek, který<br>nikdo nečeká"
            subtitle="Online nákup voucheru na pronájem 360 fotoboothu. Perfektní dárek na svatbu, narozeniny nebo firemní akci."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid overflow-hidden rounded-[20px] border border-gold/20 bg-gradient-to-br from-gold/[0.06] to-transparent md:grid-cols-2">
          {/* Voucher mockup */}
          <AnimateOnScroll direction="left">
            <div className="flex items-center justify-center p-16 bg-gold/[0.04]">
              <div className="w-[300px] rounded-2xl border border-gold/30 bg-[rgba(10,10,10,0.8)] p-10 text-center -rotate-3 transition-transform duration-400 hover:rotate-0">
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
                <div className="mt-6 inline-block rounded-lg border border-dashed border-gold px-4 py-2 font-mono text-sm tracking-[0.2em] text-gold">
                  KAJO-2026-XXXX
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll direction="right">
            <div className="flex flex-col justify-center p-16">
              <h3 className="font-heading text-[2rem] font-extrabold">
                Nákup za pár kliků
              </h3>
              <p className="mt-4 text-muted leading-relaxed font-light">
                Vyberte balíček, zaplaťte online a voucher s unikátním kódem Vám přijde okamžitě na e-mail jako PDF ke stažení nebo vytištění.
              </p>

              <ul className="mt-8 mb-8">
                {VOUCHER_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 py-1.5 text-sm text-muted/90">
                    <span className="text-gold text-[0.5rem]">◆</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div>
                <Button href="#">Koupit voucher</Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

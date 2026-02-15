"use client";

import { MapPin } from "lucide-react";
import { COVERAGE_REGIONS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const regionConfig = [
  {
    key: "primary" as const,
    label: "Hlavní region",
    badgeClass: "bg-gold/20 text-gold border-gold/30",
    dotClass: "bg-gold",
  },
  {
    key: "available" as const,
    label: "Dostupné",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    dotClass: "bg-emerald-400",
  },
  {
    key: "onRequest" as const,
    label: "Na poptávku",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    dotClass: "bg-blue-400",
  },
];

export default function CoverageMap() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Kde působíme"
            subtitle="Pokrýváme celou Českou republiku"
          />
        </AnimateOnScroll>

        <div className="grid gap-12 items-start md:grid-cols-2">
          {/* Map placeholder */}
          <AnimateOnScroll direction="left">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-surface-light flex items-center justify-center relative overflow-hidden">
              {/* Stylized map background */}
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M120,40 Q150,30 180,45 T220,35 Q250,25 270,50 T310,55 Q330,65 320,90 T340,120 Q350,150 330,170 T320,200 Q310,230 280,240 T240,260 Q210,270 180,255 T140,250 Q110,240 100,220 T80,190 Q60,170 70,140 T80,110 Q90,80 100,60 T120,40Z" />
                </svg>
              </div>
              <div className="text-center relative z-10">
                <MapPin size={48} className="mx-auto text-gold/40" />
                <p className="mt-4 text-sm text-muted">
                  Interaktivní mapa — již brzy
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* City list */}
          <AnimateOnScroll direction="right">
            <div className="space-y-8">
              {regionConfig.map((region) => (
                <div key={region.key}>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`h-2 w-2 rounded-full ${region.dotClass}`}
                    />
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
                      {region.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {COVERAGE_REGIONS[region.key].map((city) => (
                      <span
                        key={city}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${region.badgeClass}`}
                      >
                        <MapPin size={12} />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <p className="text-sm text-muted">
                Nedostali jste se do seznamu? Nevadí — ozvěte se nám a domluvíme se.
                Rádi přijedeme kamkoliv.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

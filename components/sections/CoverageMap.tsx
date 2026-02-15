"use client";

import { MapPin } from "lucide-react";
import { COVERAGE_CITIES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const badgeStyles = {
  primary: "text-gold border-gold/30",
  available: "text-emerald-400 border-emerald-500/30",
  onRequest: "text-blue-400 border-blue-500/30",
};

const dotPositions = [
  { top: "35%", left: "45%" },
  { top: "45%", left: "55%", animationDelay: "0.5s" },
  { top: "55%", left: "40%", animationDelay: "1s" },
  { top: "30%", left: "60%", animationDelay: "1.5s" },
  { top: "50%", left: "35%", animationDelay: "0.7s" },
];

export default function CoverageMap() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            label="Působnost"
            title="Kde všude nás najdete"
            subtitle="Působíme po celé České republice s hlavním zaměřením na následující regiony."
          />
        </AnimateOnScroll>

        <div className="grid gap-12 items-start md:grid-cols-2">
          {/* Map placeholder with animated dots */}
          <AnimateOnScroll direction="left">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-surface-light flex items-center justify-center relative overflow-hidden">
              {/* Radial gradient background */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(circle at 40% 50%, rgba(200,169,110,0.15), transparent 50%), radial-gradient(circle at 70% 30%, rgba(200,169,110,0.1), transparent 40%), radial-gradient(circle at 30% 70%, rgba(200,169,110,0.08), transparent 40%)",
                }}
              />
              {/* Animated dots */}
              {dotPositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_15px_rgba(200,169,110,0.5)]"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div
                    className="absolute -inset-1 rounded-full border border-gold/30 animate-ping"
                    style={{ animationDelay: pos.animationDelay || "0s" }}
                  />
                </div>
              ))}
              <span className="relative z-10 text-xs text-muted uppercase tracking-widest">
                Interaktivní mapa
              </span>
            </div>
          </AnimateOnScroll>

          {/* City list */}
          <AnimateOnScroll direction="right">
            <div>
              <ul className="divide-y divide-border">
                {COVERAGE_CITIES.map((city) => (
                  <li
                    key={city.name}
                    className="flex items-center justify-between py-4 text-sm"
                  >
                    <span>{city.name}</span>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs ${badgeStyles[city.type]}`}
                    >
                      {city.badge}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted">
                Doprava v hlavních regionech je v ceně. Ostatní lokality dle individuální dohody.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

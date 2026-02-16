"use client";

import { COVERAGE_CITIES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const dotPositions = [
  { top: "35%", left: "45%", delay: "0s" },
  { top: "45%", left: "55%", delay: "0.5s" },
  { top: "55%", left: "40%", delay: "1s" },
  { top: "30%", left: "60%", delay: "1.5s" },
  { top: "50%", left: "35%", delay: "0.7s" },
];

export default function CoverageMap() {
  return (
    <section className="py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Působnost"
            title="Kde všude<br>nás najdete"
            subtitle="Působíme po celé České republice s hlavním zaměřením na následující regiony."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-16 items-center md:grid-cols-2">
          {/* Map placeholder with animated dots */}
          <AnimateOnScroll direction="left">
            <div className="aspect-[4/3] rounded-[20px] border border-white/[0.08] bg-white/[0.02] flex items-center justify-center relative overflow-hidden">
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
                  className="absolute h-2.5 w-2.5 rounded-full bg-gold"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    boxShadow: "0 0 15px rgba(200,169,110,0.5)",
                  }}
                >
                  <div
                    className="absolute -inset-1 rounded-full border border-gold/30"
                    style={{
                      animation: `pingDot 2s infinite ${pos.delay}`,
                    }}
                  />
                </div>
              ))}
              <span className="relative z-10 text-sm text-muted uppercase tracking-widest">
                Interaktivní mapa
              </span>
            </div>
          </AnimateOnScroll>

          {/* City list */}
          <AnimateOnScroll direction="right">
            <div>
              <ul>
                {COVERAGE_CITIES.map((city) => (
                  <li
                    key={city.name}
                    className="flex items-center justify-between py-4 text-base border-b border-white/[0.06]"
                  >
                    <span>{city.name}</span>
                    <span className="rounded-full border border-gold/30 px-3 py-0.5 text-xs text-gold">
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

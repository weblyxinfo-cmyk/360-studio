"use client";

import { STEPS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Jak to funguje"
            title="Čtyři jednoduché kroky k nezapomenutelné zábavě"
            subtitle="Celý proces je maximálně jednoduchý. Vy si užíváte akci, my se postaráme o zbytek."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 0.1}>
              <div className="group relative">
                <div className="relative rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-10 transition-all duration-400 hover:bg-gold/5 hover:border-gold/20 hover:-translate-y-1">
                  <span className="font-heading text-5xl font-extrabold text-gold/15 leading-none mb-5 block">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-lg font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector */}
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden text-gold text-xl z-10 lg:block" aria-hidden="true">
                    →
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { STEPS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Jak to funguje"
            subtitle="Čtyři jednoduché kroky ke skvělému zážitku"
          />
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col items-center">
                {/* Card */}
                <div className="relative flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:border-gold/30 hover:bg-surface-light">
                  <span className="font-heading text-5xl font-bold text-gold/20 transition-colors group-hover:text-gold/40">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (hidden on last item and mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden text-gold/20 lg:block" aria-hidden="true">
                    <ArrowRight size={20} />
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

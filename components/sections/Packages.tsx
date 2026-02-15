"use client";

import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

export default function Packages() {
  return (
    <section id="balicky" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Balíčky"
            subtitle="Vyberte si balíček, který sedí vaší akci"
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg, i) => (
            <AnimateOnScroll key={pkg.name} delay={i * 0.15}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
                  pkg.highlighted
                    ? "border-gold bg-gold/5 hover:shadow-gold/10"
                    : "border-border bg-surface-light hover:border-gold/30"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-background">
                    {pkg.badge}
                  </span>
                )}

                <h3 className="font-heading text-2xl font-bold">{pkg.name}</h3>
                <p className="mt-2 font-heading text-3xl font-bold text-gold">
                  {pkg.price}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-gold"
                      />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href="#kontakt"
                    variant={pkg.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    Chci tento balíček
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

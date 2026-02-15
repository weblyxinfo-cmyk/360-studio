"use client";

import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

function PackageIcon({ icon }: { icon: "bolt" | "star" }) {
  if (icon === "bolt") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Packages() {
  return (
    <section id="balicky" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <SectionHeader
            label="Ceník"
            title="Vyberte si balíček podle Vaší akce"
            subtitle="Každý balíček zahrnuje kompletní servis včetně obsluhy, rekvizit a okamžitého sdílení videí."
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg, i) => (
            <AnimateOnScroll key={pkg.name} delay={i * 0.15}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg overflow-hidden ${
                  pkg.highlighted
                    ? "border-gold bg-gold/5 hover:shadow-gold/10"
                    : "border-border bg-surface-light hover:border-gold/30"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -right-12 top-6 rotate-45 bg-gold px-12 py-1 text-xs font-bold uppercase tracking-wider text-background">
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                  <PackageIcon icon={pkg.icon} />
                </div>

                <h3 className="font-heading text-2xl font-bold">{pkg.name}</h3>
                <p className="mt-1 text-sm text-muted">{pkg.duration}</p>
                <p className="mt-4 font-heading text-3xl font-bold text-gold">
                  {pkg.price}{" "}
                  <span className="text-base font-normal text-muted">
                    {pkg.priceSuffix}
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted">{pkg.note}</p>

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
                    Mám zájem
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

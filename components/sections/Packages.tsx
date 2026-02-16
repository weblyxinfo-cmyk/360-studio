"use client";

import { PACKAGES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";

function PackageIcon({ icon }: { icon: "bolt" | "star" }) {
  if (icon === "bolt") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Packages() {
  return (
    <section id="balicky" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Ceník"
            title="Vyberte si balíček podle Vaší akce"
            subtitle="Každý balíček zahrnuje kompletní servis včetně obsluhy, rekvizit a okamžitého sdílení videí."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PACKAGES.map((pkg, i) => (
            <AnimateOnScroll key={pkg.name} delay={i * 0.15}>
              <div
                className={`relative rounded-[20px] border p-12 transition-all duration-400 overflow-hidden hover:-translate-y-1 ${
                  pkg.highlighted
                    ? "border-gold bg-gradient-to-br from-gold/[0.08] to-gold/[0.02]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-gold/30"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute top-6 -right-8 rotate-45 bg-gold px-12 py-1 text-[0.65rem] font-bold tracking-widest text-background uppercase">
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-6 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <PackageIcon icon={pkg.icon} />
                </div>

                <h3 className="font-heading text-2xl font-bold">{pkg.name}</h3>
                <div className="mt-2 text-sm font-medium text-gold">{pkg.duration}</div>
                <div className="mt-6 font-heading text-[2.8rem] font-extrabold leading-none">
                  {pkg.price}{" "}
                  <span className="text-base font-normal text-muted">
                    {pkg.priceSuffix}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{pkg.note}</p>

                <ul className="mt-8 mb-10">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 py-2.5 text-sm text-muted/90 border-b border-white/[0.04]">
                      <span className="text-gold font-bold text-xs">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#kontakt"
                  variant={pkg.highlighted ? "primary" : "outline"}
                  className="w-full text-center"
                >
                  Mám zájem
                </Button>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

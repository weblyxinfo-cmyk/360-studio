"use client";

import { GALLERY_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Gallery() {
  return (
    <section id="galerie" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            label="Galerie"
            title="Podívejte se, jak to vypadá v akci"
            subtitle="Ukázky z reálných akcí. Brzy zde najdete fotky a videa z našich 360 booth zážitků."
          />
        </AnimateOnScroll>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimateOnScroll
              key={`${item.tag}-${item.title}`}
              delay={i * 0.1}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <div
                className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${item.gradient} transition-all duration-300 hover:border-gold/30 ${
                  i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-video"
                }`}
              >
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute h-[3px] w-[3px] rounded-full bg-gold/40 animate-pulse"
                      style={{
                        top: `${20 + j * 15}%`,
                        left: `${15 + j * 15}%`,
                        animationDelay: `${j * 0.5}s`,
                        animationDuration: `${5 + j}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Play button overlay */}
                {(item.tag === "Video") && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white/30 bg-gold/15 backdrop-blur-sm">
                      <div
                        className="ml-1 h-0 w-0"
                        style={{
                          borderStyle: "solid",
                          borderWidth: "8px 0 8px 14px",
                          borderColor: "transparent transparent transparent rgba(255,255,255,0.9)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-[2]">
                  <span className="mb-2 inline-block w-fit rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold">
                    {item.tag}
                  </span>
                  <h3 className={`font-heading font-bold ${i === 0 ? "text-xl" : "text-base"}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Play } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Gallery() {
  return (
    <section id="galerie" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Galerie"
            subtitle="Podívejte se, jak vypadá 360° zážitek v akci"
          />
        </AnimateOnScroll>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimateOnScroll
              key={item.tag}
              delay={i * 0.1}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <div
                className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${item.gradient} transition-all duration-300 hover:border-gold/30 ${
                  i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-video"
                }`}
              >
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20">
                    <Play size={20} className="ml-0.5 text-foreground" />
                  </div>
                  <span className="mt-3 text-sm font-semibold text-foreground/70">
                    {item.tag}
                  </span>
                </div>

                {/* Tag badge */}
                <span className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

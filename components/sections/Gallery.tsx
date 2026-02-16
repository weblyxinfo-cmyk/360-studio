"use client";

import { GALLERY_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const itemBackgrounds = [
  "linear-gradient(135deg, #2a1f14 0%, #1a1510 30%, #3d2b18 60%, #1a130d 100%)",
  "linear-gradient(150deg, #1a1425 0%, #261a30 50%, #1a1020 100%)",
  "linear-gradient(135deg, #14201a 0%, #0d1a14 50%, #1a2a20 100%)",
  "linear-gradient(140deg, #201a14 0%, #2a2018 50%, #1a150f 100%)",
  "linear-gradient(130deg, #1a1a2a 0%, #141428 50%, #20203a 100%)",
];

const itemOverlays = [
  "radial-gradient(circle at 30% 60%, rgba(200,169,110,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,220,160,0.15) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(200,169,110,0.1) 0%, transparent 30%)",
  "radial-gradient(circle at 50% 40%, rgba(180,140,220,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(200,169,110,0.15) 0%, transparent 40%)",
  "radial-gradient(circle at 60% 50%, rgba(100,200,160,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 30%, rgba(200,169,110,0.12) 0%, transparent 40%)",
  "radial-gradient(circle at 40% 50%, rgba(200,169,110,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,200,140,0.12) 0%, transparent 40%)",
  "radial-gradient(circle at 50% 50%, rgba(120,140,220,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 30%, rgba(200,169,110,0.1) 0%, transparent 40%)",
];

const particlePositions = [
  { top: "20%", left: "25%" },
  { top: "50%", left: "60%" },
  { top: "70%", left: "35%" },
  { top: "30%", left: "75%" },
  { top: "60%", left: "15%" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Galerie"
            title="Podívejte se, jak<br>to vypadá v akci"
            subtitle="Ukázky z reálných akcí. Brzy zde najdete fotky a videa z našich 360 booth zážitků."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[300px] gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimateOnScroll
              key={`${item.tag}-${item.title}`}
              delay={i * 0.1}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div
                className="group relative h-full overflow-hidden rounded-[20px] cursor-pointer transition-all duration-500 hover:scale-[0.97]"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-600 group-hover:scale-105"
                  style={{ background: itemBackgrounds[i] }}
                />
                {/* Radial overlay */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: itemOverlays[i] }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
                  {particlePositions.map((pos, j) => (
                    <div
                      key={j}
                      className="absolute h-[3px] w-[3px] rounded-full bg-gold/40"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        animation: `floatParticle ${6 + j * 1}s infinite ease-in-out ${j * 1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Play button overlay */}
                {item.tag === "Video" && (
                  <div className="absolute inset-0 z-[3] flex items-center justify-center opacity-0 transition-all duration-400 group-hover:opacity-100">
                    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white/30 bg-gold/15 backdrop-blur-[10px] scale-90 group-hover:scale-100 transition-transform duration-400">
                      <div
                        className="ml-[3px] h-0 w-0"
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
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8 z-[2]"
                  style={{
                    background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 40%, transparent 70%)",
                  }}
                >
                  <span className="mb-2 inline-block w-fit rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-gold">
                    {item.tag}
                  </span>
                  <h3 className={`font-heading font-bold ${i === 0 ? "text-2xl" : "text-lg"}`}>
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

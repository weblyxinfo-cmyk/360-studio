"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const half = Math.ceil(FAQ_ITEMS.length / 2);
  const leftColumn = FAQ_ITEMS.slice(0, half);
  const rightColumn = FAQ_ITEMS.slice(half);

  return (
    <section id="faq" className="py-24 px-6 bg-surface">
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Časté dotazy"
            subtitle="Odpovědi na nejčastější otázky"
          />
        </AnimateOnScroll>

        <div className="grid gap-4 md:grid-cols-2">
          {[leftColumn, rightColumn].map((column, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {column.map((item, i) => {
                const index = colIndex === 0 ? i : i + half;
                const isOpen = openIndex === index;

                return (
                  <AnimateOnScroll
                    key={index}
                    delay={index * 0.05}
                  >
                    <div className="rounded-xl border border-border bg-surface-light transition-colors hover:border-gold/20">
                      <button
                        onClick={() => toggle(index)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-heading text-sm font-semibold leading-snug pr-2">
                          {item.question}
                        </span>
                        <span className="shrink-0 text-gold">
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

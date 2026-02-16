"use client";

import { useState } from "react";
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
    <section id="faq" className="py-28 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Časté dotazy"
            title="Vše, co potřebujete vědět"
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {[leftColumn, rightColumn].map((column, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {column.map((item, i) => {
                const index = colIndex === 0 ? i : i + half;
                const isOpen = openIndex === index;

                return (
                  <AnimateOnScroll key={index} delay={index * 0.05}>
                    <div
                      className="rounded-[20px] border border-white/[0.06] transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.02] cursor-pointer"
                      onClick={() => toggle(index)}
                    >
                      <div className="flex items-center justify-between gap-4 p-8">
                        <span className="font-heading text-base font-semibold leading-snug">
                          {item.question}
                        </span>
                        <span className="shrink-0 text-gold text-2xl font-light">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-8 pb-8 text-sm leading-relaxed text-muted font-light">
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

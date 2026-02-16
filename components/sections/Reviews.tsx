"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Reviews() {
  return (
    <section id="recenze" className="py-28 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1200px]">
        <AnimateOnScroll>
          <SectionHeader
            label="Reference"
            title="Co říkají naši klienti"
            subtitle="Spokojenost hostů je pro nás vždy na prvním místě."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <AnimateOnScroll key={review.name} delay={i * 0.1}>
              <article className="group flex h-full flex-col rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-10 transition-all duration-400 hover:border-gold/20 hover:-translate-y-1">
                {/* Stars */}
                <div className="flex gap-0.5 text-gold mb-4" aria-label={`Hodnocení ${review.rating} z 5`}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-muted/90 italic font-light mb-6">
                  &bdquo;{review.text}&ldquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark font-heading text-sm font-bold text-background">
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted">{review.event}</p>
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

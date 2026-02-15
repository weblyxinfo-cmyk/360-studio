"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Reviews() {
  return (
    <section id="recenze" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll>
          <SectionHeader
            title="Co říkají klienti"
            subtitle="Přečtěte si, proč nás klienti doporučují"
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <AnimateOnScroll key={review.name} delay={i * 0.1}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-gold/30 hover:bg-surface-light">
                {/* Stars */}
                <div className="flex gap-1" aria-label={`Hodnocení ${review.rating} z 5`}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">
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

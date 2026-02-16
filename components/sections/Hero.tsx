"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      aria-label="Úvodní sekce"
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,110,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 80%, rgba(200,169,110,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 80% at 80% 80%, rgba(200,169,110,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Rotating circle decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-[600px] w-[600px] rounded-full border border-gold/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gold"
            style={{ boxShadow: "0 0 20px rgba(200,169,110,0.6)" }}
          />
        </motion.div>
        <motion.div
          className="absolute h-[450px] w-[450px] rounded-full border border-gold/[0.08]"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content — CSS animations so content is visible even without JS */}
      <div className="relative z-10 text-center max-w-4xl">
        <div className="hero-fadeup" style={{ animationDelay: "0.3s" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            360 Fotobooth na Vaší akci
          </span>
        </div>

        <h1
          className="mt-8 font-heading font-extrabold leading-none tracking-tight hero-fadeup"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", animationDelay: "0.5s" }}
        >
          Zážitek, který
          <br />
          se <em className="italic text-gold">točí</em> kolem Vás
        </h1>

        <p
          className="mt-6 text-lg text-muted max-w-[500px] mx-auto leading-relaxed font-light hero-fadeup"
          style={{ animationDelay: "0.7s" }}
        >
          Pronájem prémiového 360 fotoboothu na svatby, narozeniny, firemní akce a další události po celé ČR.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center hero-fadeup"
          style={{ animationDelay: "0.9s" }}
        >
          <Button href="#kontakt">Nezávazná poptávka</Button>
          <Button variant="outline" href="#jak-to-funguje">
            Jak to funguje
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#jak-to-funguje"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-gold transition-colors hero-fadeup"
        aria-label="Srolujte dolů"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="scroll-line" />
      </a>
    </section>
  );
}

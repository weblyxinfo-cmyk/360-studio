"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
            "radial-gradient(circle at 50% 40%, rgba(200,169,110,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(200,169,110,0.06) 0%, transparent 40%)",
        }}
      />

      {/* Rotating circle decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-[500px] w-[500px] rounded-full border border-gold/10 sm:h-[600px] sm:w-[600px] lg:h-[700px] lg:w-[700px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gold" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-gold/50" />
        </motion.div>
        <motion.div
          className="absolute h-[300px] w-[300px] rounded-full border border-gold/5 sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gold/30" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            360 Fotobooth na Vaší akci
          </span>
        </motion.div>

        <motion.h1
          className="mt-8 font-heading text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Zážitek, který se{" "}
          <em className="not-italic text-gold">točí</em>{" "}
          kolem Vás
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-muted max-w-2xl mx-auto sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Pronájem prémiového 360 fotoboothu na svatby, narozeniny, firemní akce a další události po celé ČR.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Button href="#kontakt">Nezávazná poptávka</Button>
          <Button variant="outline" href="#jak-to-funguje">
            Jak to funguje
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#jak-to-funguje"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-gold transition-colors"
        aria-label="Srolujte dolů"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

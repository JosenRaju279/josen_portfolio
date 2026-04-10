"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/portfolio-data";
import { ParticleBackground } from "@/components/effects/particle-background";
import { TextReveal } from "@/components/effects/scroll-animations";

export function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <ParticleBackground />
        <div className="hero__gradient" />
      </div>

      <div className="hero__content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero__greeting"
        >
          {heroData.greeting}
        </motion.p>

        <h1 className="hero__name">
          <TextReveal text={heroData.name} className="text-gradient" delay={0.4} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="hero__title"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 1 }}
          >
            {heroData.title}
          </motion.span>{" "}
          <span className="hero__title-separator">|</span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.1 }}
            className="text-gradient-alt"
          >
            {heroData.subtitle}
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hero__desc"
        >
          {heroData.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="hero__actions"
        >
          <a href={heroData.cta.primary.href} className="btn-primary">
            <span>{heroData.cta.primary.label}</span>
            <span>→</span>
          </a>
          <a href={heroData.cta.secondary.href} className="btn-secondary">
            {heroData.cta.secondary.label}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hero__scroll-hint"
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}

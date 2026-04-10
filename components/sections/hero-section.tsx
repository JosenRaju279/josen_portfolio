"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/portfolio-data";
import { ParticleBackground } from "@/components/effects/particle-background";
import { TextReveal } from "@/components/effects/scroll-animations";

function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.6 }}
      className="hero__status"
    >
      <span className="hero__status-dot" />
      <span>Available for hire</span>
    </motion.div>
  );
}

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = text.split("");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      style={{ display: "inline" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.03, delay: delay + i * 0.04 },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="hero__cursor-blink"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: delay + chars.length * 0.04 }}
      >
        |
      </motion.span>
    </motion.span>
  );
}

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
          <span className="hero__greeting-wave">👋</span>{" "}
          {heroData.greeting}
        </motion.p>

        <h1 className="hero__name">
          <TextReveal text={heroData.name} className="text-gradient" delay={0.4} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="hero__title"
        >
          <span className="hero__title-label">
            <TypingText text={heroData.title} delay={1.0} />
          </span>
          <span className="hero__title-divider" />
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.1 }}
            className="text-gradient-alt"
          >
            {heroData.subtitle}
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hero__desc"
        >
          {heroData.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35 }}
          className="hero__highlights"
        >
          {heroData.highlights.map((highlight) => (
            <span key={highlight} className="hero__pill">
              {highlight}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="hero__actions"
        >
          <a href={heroData.cta.primary.href} className="btn-primary">
            <span>{heroData.cta.primary.label}</span>
            <span>&rarr;</span>
          </a>
          <a href={heroData.cta.secondary.href} className="btn-secondary">
            {heroData.cta.secondary.label}
          </a>
        </motion.div>

        <StatusBadge />
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

"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type AnimProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

const fadeUpV: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function FadeIn({ children, className, delay = 0, once = true }: AnimProps) {
  return (
    <motion.div variants={fadeUpV} initial="hidden" whileInView="visible"
      viewport={{ once, margin: "-80px" }} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

const slideV: Variants = {
  hiddenL: { opacity: 0, x: -60 },
  hiddenR: { opacity: 0, x: 60 },
  visible: (d: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function SlideIn({ children, className, delay = 0, direction = "left", once = true }: AnimProps & { direction?: "left" | "right" }) {
  return (
    <motion.div variants={slideV} initial={direction === "left" ? "hiddenL" : "hiddenR"}
      whileInView="visible" viewport={{ once, margin: "-80px" }} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

const scaleV: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (d: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function ScaleIn({ children, className, delay = 0, once = true }: AnimProps) {
  return (
    <motion.div variants={scaleV} initial="hidden" whileInView="visible"
      viewport={{ once, margin: "-80px" }} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

const staggerC: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const staggerI: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function StaggerContainer({ children, className, once = true }: { children: ReactNode; className?: string; once?: boolean }) {
  return (
    <motion.div variants={staggerC} initial="hidden" whileInView="visible"
      viewport={{ once, margin: "-60px" }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div variants={staggerI} className={className}>{children}</motion.div>;
}

export function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                delay: delay + i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          className={className}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

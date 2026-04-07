"use client";

import { motion } from "framer-motion";
import {
  portfolioData,
  sectionCopy,
  sectionOrder,
  type SectionId,
  type ThemeMode,
} from "@/lib/portfolio-data";

type MobileFallbackProps = {
  onOpenSection: (section: SectionId) => void;
  theme: ThemeMode;
  onThemeToggle: (theme: ThemeMode) => void;
};

const sectionCodes: Record<SectionId, string> = {
  projects: "01",
  skills: "02",
  about: "03",
  contact: "04",
};

export function MobileFallback({
  onOpenSection,
  theme,
  onThemeToggle,
}: MobileFallbackProps) {
  return (
    <main className="min-h-screen overflow-y-auto bg-[var(--background)] px-4 py-5 text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -left-20 top-8 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--accent-glow)" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-3 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-[1.6rem] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
                {portfolioData.hero.name}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{portfolioData.hero.role}</p>
            </div>
            <button
              className="rounded-full border border-[var(--border)] bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
              onClick={() => onThemeToggle(theme === "dark" ? "light" : "dark")}
              type="button"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            {portfolioData.hero.blurb}
          </p>
        </motion.div>

        {sectionOrder.map((section, index) => (
          <motion.button
            key={section}
            className="glass-panel rounded-[1.4rem] p-4 text-left transition-all duration-300 hover:border-[var(--accent)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.06, duration: 0.45 }}
            onClick={() => onOpenSection(section)}
            type="button"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-medium">{sectionCopy[section].title}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{sectionCopy[section].description}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--accent)]">
                {sectionCodes[section]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </main>
  );
}

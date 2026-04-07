"use client";

import { motion } from "framer-motion";
import {
  portfolioData,
  sectionCopy,
  type SectionId,
  type ThemeMode,
} from "@/lib/portfolio-data";

type SceneOverlayProps = {
  currentSection: SectionId;
  theme: ThemeMode;
  sections: SectionId[];
  onThemeToggle: () => void;
  onSectionSelect: (section: SectionId) => void;
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.93c.575.106.785-.249.785-.556 0-.274-.01-1-.015-1.963-3.194.694-3.868-1.54-3.868-1.54-.522-1.328-1.275-1.682-1.275-1.682-1.042-.712.079-.698.079-.698 1.152.081 1.759 1.183 1.759 1.183 1.024 1.756 2.687 1.249 3.343.955.103-.742.401-1.249.729-1.536-2.55-.29-5.231-1.275-5.231-5.674 0-1.253.448-2.278 1.182-3.08-.119-.29-.512-1.457.112-3.038 0 0 .965-.309 3.162 1.176A10.962 10.962 0 0 1 12 6.03c.975.005 1.958.132 2.875.386 2.196-1.485 3.16-1.176 3.16-1.176.626 1.581.233 2.748.114 3.038.736.802 1.18 1.827 1.18 3.08 0 4.41-2.686 5.381-5.244 5.665.412.355.779 1.058.779 2.133 0 1.54-.014 2.781-.014 3.16 0 .31.207.668.79.555A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function SceneOverlay({
  currentSection,
  theme,
  sections,
  onThemeToggle,
  onSectionSelect,
}: SceneOverlayProps) {
  const socialLinks = [
    { href: portfolioData.contact.socials[0]?.href ?? "https://github.com/", icon: <GitHubIcon />, label: "GitHub" },
    { href: portfolioData.contact.socials[1]?.href ?? "https://linkedin.com/", icon: <LinkedInIcon />, label: "LinkedIn" },
    { href: `mailto:${portfolioData.contact.email}`, icon: <EmailIcon />, label: "Email" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-6 md:p-8">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="pointer-events-auto"
          >
            <div className="glass-panel rounded-[1.6rem] px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
                {portfolioData.hero.name}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{portfolioData.hero.role}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="pointer-events-auto flex items-center gap-3"
          >
            <button
              className="theme-toggle"
              data-active={theme === "dark" ? "true" : "false"}
              onClick={onThemeToggle}
              type="button"
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-knob">
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </div>
            </button>
            <div className="hidden items-center gap-3 md:flex">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  className="social-btn"
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -18, y: 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="pointer-events-auto hidden md:block"
          >
            <div className="glass-panel max-w-md rounded-[1.8rem] px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
                Creative developer portfolio
              </p>
              <h1 className="display-font mt-3 text-3xl leading-[0.95] text-[var(--foreground)]">
                Design-led interfaces with a lighter touch.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {portfolioData.hero.blurb}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18, y: 18 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="pointer-events-auto ml-auto w-full max-w-[280px]"
          >
            <div className="glass-panel rounded-[1.8rem] p-3 md:p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                  Sections
                </p>
                <span className="font-mono text-xs text-[var(--muted)]">
                  0{sections.indexOf(currentSection) + 1}
                </span>
              </div>
              <div className="space-y-1.5">
                {sections.map((section, index) => (
                  <button
                    key={section}
                    className={`nav-dot w-full px-3 py-3 text-left ${currentSection === section ? "active" : ""}`}
                    onClick={() => onSectionSelect(section)}
                    type="button"
                    aria-label={`Go to ${sectionCopy[section].title}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {sectionCopy[section].title}
                        </p>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {sectionCopy[section].eyebrow}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
                        0{index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="rounded-full border border-[var(--border)] bg-[rgba(8,12,18,0.46)] px-4 py-2 text-xs text-[var(--muted)] backdrop-blur-md">
            <span className="font-mono uppercase tracking-[0.28em] text-[var(--accent)]">Scroll</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

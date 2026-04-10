"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "@/lib/portfolio-data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/scroll-animations";

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "qa", label: "QA" },
  { key: "tools", label: "Tools" },
] as const;

/* Custom inline SVG icons for skills that don't have a devicon */
function CustomIcon({ type }: { type: string }) {
  const iconMap: Record<string, React.JSX.Element> = {
    "custom:api": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <rect x="8" y="16" width="48" height="32" rx="6" stroke="currentColor" strokeWidth="3" />
        <path d="M22 36l4-8 4 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 28h4a3 3 0 010 6h-4v-6z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 28v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="12" r="3" fill="currentColor" />
        <circle cx="32" cy="52" r="3" fill="currentColor" />
        <path d="M32 9V4M32 60v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    "custom:manual-testing": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <rect x="14" y="6" width="36" height="48" rx="4" stroke="currentColor" strokeWidth="3" />
        <path d="M22 6V3h20v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 22l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="38" x2="40" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="44" x2="34" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="46" cy="50" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M52 56l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    "custom:regression": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <path d="M32 8a24 24 0 11-20 10.7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 8v12h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 30l5 5 10-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "custom:test-case": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <rect x="10" y="8" width="44" height="48" rx="4" stroke="currentColor" strokeWidth="3" />
        <line x1="22" y1="8" x2="22" y2="56" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <path d="M28 22l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 34l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="28" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    "custom:bug": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <ellipse cx="32" cy="36" rx="14" ry="18" stroke="currentColor" strokeWidth="3" />
        <path d="M22 24c0-6 4-12 10-12s10 6 10 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="24" x2="32" y2="54" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <line x1="18" y1="30" x2="8" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="30" x2="56" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="18" y1="40" x2="6" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="40" x2="58" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="50" x2="10" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="50" x2="54" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="26" cy="32" r="2" fill="currentColor" />
        <circle cx="38" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
    "custom:agile": (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="skill-card__svg">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
        <path d="M32 12a20 20 0 0114 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 12a20 20 0 00-14 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <polygon points="46,46 40,42 42,48" fill="currentColor" />
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
  };

  return iconMap[type] || <span style={{ fontSize: "2rem" }}>⚙️</span>;
}

function SkillIcon({ icon, name }: { icon: string; name: string }) {
  if (icon.startsWith("custom:")) {
    return <CustomIcon type={icon} />;
  }
  return (
    <img
      src={icon}
      alt={`${name} logo`}
      className="skill-card__img"
      loading="lazy"
      width={40}
      height={40}
    />
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const filtered = activeTab === "all" ? skillsData : skillsData.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>What I Work With</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 48 }}>
            Skills & <span className="text-gradient">Tech Stack</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="skills-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`skills-tab${activeTab === cat.key ? " active" : ""}`}
                onClick={() => setActiveTab(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="skills-grid">
              {filtered.map((skill) => (
                <StaggerItem key={skill.name}>
                  <div className="skill-card glass glow-border" style={{ borderRadius: 16 }}>
                    <div className="skill-card__icon">
                      <SkillIcon icon={skill.icon} name={skill.name} />
                    </div>
                    <span className="skill-card__name">{skill.name}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

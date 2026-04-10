"use client";

import { useState } from "react";
import { skillsData } from "@/lib/portfolio-data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/scroll-animations";

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "tools", label: "Tools" },
] as const;

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

        <StaggerContainer className="skills-grid" key={activeTab}>
          {filtered.map((skill) => (
            <StaggerItem key={skill.name}>
              <div className="skill-card glass glow-border" style={{ borderRadius: 16 }}>
                <span className="skill-card__icon">{skill.icon}</span>
                <span className="skill-card__name">{skill.name}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

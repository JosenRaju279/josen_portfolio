"use client";

import { aboutData } from "@/lib/portfolio-data";
import { FadeIn, SlideIn } from "@/components/effects/scroll-animations";

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>Get To Know Me</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 64 }}>
            {aboutData.headline}
          </h2>
        </FadeIn>

        <div className="about-grid">
          <SlideIn direction="left">
            <div className="about-avatar">
              <div className="about-avatar__glow" />
              <div className="about-avatar__inner">
                <span className="about-avatar__placeholder">JR</span>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div>
              {aboutData.paragraphs.map((p, i) => (
                <p key={i} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20, fontSize: "0.95rem" }}>
                  {p}
                </p>
              ))}

              <div className="about-stats">
                {aboutData.stats.map((stat, i) => (
                  <div key={i} className="about-stat glass" style={{ borderRadius: 12 }}>
                    <div className="about-stat__value">{stat.value}</div>
                    <div className="about-stat__label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

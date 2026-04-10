"use client";

import { experienceData } from "@/lib/portfolio-data";
import { FadeIn, SlideIn } from "@/components/effects/scroll-animations";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>Career Journey</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 64 }}>
            Work <span className="text-gradient">Experience</span>
          </h2>
        </FadeIn>

        <div className="timeline">
          {experienceData.map((entry, i) => (
            <SlideIn key={entry.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div className="timeline-card glass" style={{ borderRadius: 16 }}>
                  <p className="timeline-date">{entry.date}</p>
                  <h3 className="timeline-role">{entry.role}</h3>
                  {entry.company ? <p className="timeline-company">{entry.company}</p> : null}
                  <p className="timeline-desc">{entry.description}</p>
                  <ul className="timeline-highlights">
                    {entry.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

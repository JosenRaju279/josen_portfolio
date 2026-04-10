"use client";

import { projectsData } from "@/lib/portfolio-data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/effects/scroll-animations";

function ProjectNumber({ num }: { num: number }) {
  return (
    <span className="project-card__number">
      {String(num).padStart(2, "0")}
    </span>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>Portfolio</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 16 }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", maxWidth: 620, margin: "0 auto 48px", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Selected work that highlights mobile engineering, automation, API integration, and performance-focused frontend development.
          </p>
        </FadeIn>

        <StaggerContainer className="projects-grid">
          {projectsData.map((project, i) => (
            <StaggerItem key={project.id}>
              <article className="project-card card" style={{ display: "block", borderRadius: 20 }}>
                <div className="project-card__hero">
                  <div className="project-card__hero-top">
                    <span className="project-card__category">{project.category}</span>
                    <ProjectNumber num={i + 1} />
                  </div>
                  <div className="project-card__metric">{project.metric}</div>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  <p className="project-card__description">{project.description}</p>
                  <div className="project-card__stack">
                    {project.stack.map((tag) => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

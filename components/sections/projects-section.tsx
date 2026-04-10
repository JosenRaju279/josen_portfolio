"use client";

import { projectsData } from "@/lib/portfolio-data";
import { FadeIn, ScaleIn } from "@/components/effects/scroll-animations";

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>Portfolio</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 16 }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto 48px", fontSize: "0.95rem" }}>
            A selection of projects that showcase my skills and passion for building great software.
          </p>
        </FadeIn>
      </div>

      <div className="section-container" style={{ maxWidth: 1400, padding: "0 24px" }}>
        <div className="projects-scroll">
          {projectsData.map((project, i) => (
            <ScaleIn key={project.id} delay={i * 0.1}>
              <a href={project.href} className="project-card card" style={{ display: "block", borderRadius: 20 }}>
                <div className="project-card__image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-card__overlay" />
                  <span className="project-card__category">{project.category}</span>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  <div className="project-card__stack">
                    {project.stack.map((tag) => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}

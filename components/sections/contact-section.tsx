"use client";

import { contactData } from "@/lib/portfolio-data";
import { FadeIn } from "@/components/effects/scroll-animations";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.3 9.42 7.87 10.95.58.1.79-.25.79-.56 0-.28-.01-1.2-.02-2.17-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.73-1.56-2.56-.29-5.25-1.29-5.25-5.75 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.47.12-3.06 0 0 .98-.32 3.2 1.2a11.03 11.03 0 0 1 5.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.59.24 2.77.12 3.06.75.81 1.2 1.85 1.2 3.12 0 4.47-2.69 5.45-5.26 5.74.42.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const iconMap: Record<string, () => React.JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-container" style={{ maxWidth: 820 }}>
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 12 }}>Get In Touch</p>
          <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 16 }}>
            {contactData.headline}
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 48, fontSize: "0.95rem", lineHeight: 1.8 }}>
            {contactData.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="contact-grid">
            <div className="contact-card glass">
              <div className="contact-card__icon">
                <MailIcon />
              </div>
              <div>
                <p className="contact-card__label">Email</p>
                <a href={`mailto:${contactData.email}`} className="contact-card__value">
                  {contactData.email}
                </a>
              </div>
            </div>

            <div className="contact-card glass">
              <div className="contact-card__icon">
                <LocationIcon />
              </div>
              <div>
                <p className="contact-card__label">Location</p>
                <p className="contact-card__value">{contactData.location}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="contact-actions">
            <a href={`mailto:${contactData.email}`} className="btn-primary">
              <MailIcon />
              <span>Email Me</span>
            </a>

            {contactData.socials.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label={social.label}
                  title={social.label}
                >
                  {Icon ? <Icon /> : null}
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

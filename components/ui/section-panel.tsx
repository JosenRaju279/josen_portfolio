"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import {
  portfolioData,
  sectionCopy,
  type SectionId,
} from "@/lib/portfolio-data";

type SectionPanelProps = {
  activeSection: SectionId | null;
  onClose: () => void;
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "a new client"}`
    );
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    return `mailto:${portfolioData.contact.email}?subject=${subject}&body=${body}`;
  }, [email, message, name]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-[1.25rem] border border-[var(--border)] bg-white/6 px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_20px_var(--accent-glow)]"
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        value={name}
      />
      <input
        className="w-full rounded-[1.25rem] border border-[var(--border)] bg-white/6 px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_20px_var(--accent-glow)]"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        type="email"
        value={email}
      />
      <textarea
        className="min-h-32 w-full rounded-[1.25rem] border border-[var(--border)] bg-white/6 px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_20px_var(--accent-glow)]"
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Tell me about the product, redesign, or experience you want to build."
        value={message}
      />
      <button
        className="gradient-border w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101316] transition-all duration-300 hover:shadow-[0_0_30px_var(--accent-glow)] hover:scale-[1.01]"
        type="submit"
      >
        Open email draft
      </button>
    </form>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SectionPanel({ activeSection, onClose }: SectionPanelProps) {
  return (
    <AnimatePresence>
      {activeSection ? (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="modal-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: 40 }}
          />

          <motion.div
            className="modal-overlay"
            style={{ zIndex: 45 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="modal-content"
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-[var(--border)] px-6 py-5 md:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-[var(--accent)]">
                      {sectionCopy[activeSection].eyebrow}
                    </p>
                    <h2 className="display-font mt-3 text-4xl leading-none md:text-5xl">
                      {sectionCopy[activeSection].title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-base">
                      {sectionCopy[activeSection].description}
                    </p>
                  </div>
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/6 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                    onClick={onClose}
                    type="button"
                    aria-label="Close panel"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="scrollbar-hidden max-h-[calc(100vh-12rem)] overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                {activeSection === "projects" ? (
                  <motion.div
                    className="space-y-5"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                      <div className="glass-panel rounded-[1.75rem] p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                          Design focus
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
                          These projects lean into atmosphere, clear composition, and frontend systems that feel premium rather than generic.
                        </p>
                      </div>
                      <div className="glass-panel rounded-[1.75rem] p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                          Working style
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
                          Concept first, then motion, structure, responsiveness, and detail polish.
                        </p>
                      </div>
                    </motion.div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      {portfolioData.projects.map((project) => (
                        <motion.article
                          key={project.title}
                          className="project-card"
                          variants={staggerItem}
                        >
                          <div className="mb-5 overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[linear-gradient(135deg,var(--accent-soft),transparent_70%)] p-3">
                            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
                              {project.type}
                            </p>
                            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[1rem] border border-white/10 bg-black/10">
                              <Image
                                src={project.image}
                                alt={`${project.title} sample preview`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 30vw"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,10,16,0.42)_100%)]" />
                            </div>
                          </div>
                          <h3 className="display-font text-2xl leading-none">{project.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {project.summary}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-[var(--border)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                {activeSection === "skills" ? (
                  <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={staggerItem} className="glass-panel rounded-[1.75rem] p-5">
                      <p className="text-sm leading-7 text-[var(--muted)] md:text-base">
                        My strongest work happens where visual taste and engineering discipline overlap: clean implementation, motion with purpose, and interfaces that stay sharp under real product constraints.
                      </p>
                    </motion.div>
                    {portfolioData.skills.map((skill, index) => (
                      <motion.div
                        key={skill.label}
                        className="rounded-[1.6rem] border border-[var(--border)] bg-white/[0.04] p-4 md:p-5"
                        variants={staggerItem}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3 text-sm md:text-base">
                          <span className="font-medium">{skill.label}</span>
                          <span className="font-mono text-[var(--accent)]">{skill.value}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            animate={{ width: `${skill.value}%` }}
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            transition={{
                              delay: 0.15 + index * 0.08,
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}

                {activeSection === "about" ? (
                  <motion.div
                    className="space-y-5"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={staggerItem} className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="glass-panel rounded-[1.8rem] p-6">
                        {portfolioData.about.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm leading-7 text-[var(--muted)] md:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {portfolioData.stats.map((stat) => (
                          <motion.div
                            key={stat.label}
                            className="gradient-border rounded-[1.6rem] bg-white/[0.04] p-5"
                            variants={staggerItem}
                          >
                            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                              {stat.label}
                            </p>
                            <p className="display-font mt-3 text-2xl leading-tight">
                              {stat.value}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}

                {activeSection === "contact" ? (
                  <motion.div
                    className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={staggerItem} className="space-y-4">
                      <div className="glass-panel rounded-[1.75rem] p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                          Direct email
                        </p>
                        <a
                          className="display-font mt-4 block text-3xl leading-tight transition-colors hover:text-[var(--accent)]"
                          href={`mailto:${portfolioData.contact.email}`}
                        >
                          {portfolioData.contact.email}
                        </a>
                        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                          {portfolioData.contact.availability}
                        </p>
                      </div>

                      <div className="glass-panel rounded-[1.75rem] p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                          Elsewhere
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {portfolioData.contact.socials.map((social) => (
                            <a
                              key={social.label}
                              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                              href={social.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {social.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem} className="glass-panel rounded-[1.75rem] p-5 md:p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                        Project brief
                      </p>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        Share the scope, timeline, and the kind of visual direction you want. I will turn it into a drafted email so you can send it quickly.
                      </p>
                      <ContactForm />
                    </motion.div>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}



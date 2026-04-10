"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutData } from "@/lib/portfolio-data";
import { FadeIn, SlideIn } from "@/components/effects/scroll-animations";

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numericMatch[1]);
    const suffix = value.replace(numericMatch[1], "");
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayValue(`${current}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="about-stat glass-strong" style={{ borderRadius: 16 }}>
      <div className="about-stat__value">{displayValue}</div>
      <div className="about-stat__label">{label}</div>
    </div>
  );
}

function CodeSnippet() {
  return (
    <div className="about-code">
      <div className="about-code__header">
        <span className="about-code__dot" style={{ background: "#ff5f57" }} />
        <span className="about-code__dot" style={{ background: "#febc2e" }} />
        <span className="about-code__dot" style={{ background: "#28c840" }} />
        <span className="about-code__filename">developer.ts</span>
      </div>
      <pre className="about-code__body">
        <code>
          <span className="code-keyword">const</span>{" "}
          <span className="code-var">developer</span> = {`{`}{"\n"}
          {"  "}<span className="code-key">name</span>:{" "}
          <span className="code-string">&quot;Josen Raju&quot;</span>,{"\n"}
          {"  "}<span className="code-key">role</span>:{" "}
          <span className="code-string">&quot;Software Engineer&quot;</span>,{"\n"}
          {"  "}<span className="code-key">skills</span>: [
          <span className="code-string">&quot;React&quot;</span>,{" "}
          <span className="code-string">&quot;Java&quot;</span>,{" "}
          <span className="code-string">&quot;Python&quot;</span>],{"\n"}
          {"  "}<span className="code-key">mindset</span>:{" "}
          <span className="code-string">&quot;Build &amp; Test&quot;</span>,{"\n"}
          {"  "}<span className="code-key">available</span>:{" "}
          <span className="code-bool">true</span>,{"\n"}
          {`}`};
        </code>
      </pre>
    </div>
  );
}

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
            <CodeSnippet />
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div>
              {aboutData.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20, fontSize: "0.95rem" }}
                >
                  {p}
                </motion.p>
              ))}

              <div className="about-stats">
                {aboutData.stats.map((stat, i) => (
                  <AnimatedCounter key={i} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

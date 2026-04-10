"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/portfolio-data";
import { CustomCursor } from "@/components/effects/custom-cursor";

export function PortfolioLayout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active nav link
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <CustomCursor />

      {/* Navbar */}
      <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo">
            <span className="text-gradient">JR</span>
          </a>

          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={activeSection === item.href.replace("#", "") ? "active" : ""}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.8rem", borderRadius: 10, display: "none" }}>
            <span>Hire Me</span>
          </a>

          <button
            className={`mobile-menu-btn${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <p>
            © {new Date().getFullYear()} <span className="text-gradient">Josen Raju</span>. Built with passion & precision.
          </p>
        </div>
      </footer>
    </>
  );
}

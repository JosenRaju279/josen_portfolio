"use client";

import { AnimatePresence, motion } from "framer-motion";


type LoadingScreenProps = {
  description: string;
  progress: number;
  visible: boolean;
};

/* ─── Seeded PRNG (mulberry32) for deterministic particles ─── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateParticles() {
  const rng = mulberry32(42);
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${rng() * 100}%`,
    delay: rng() * 6,
    duration: 6 + rng() * 8,
    size: 2 + rng() * 3,
    opacity: 0.15 + rng() * 0.35,
    drift: -20 + rng() * 40,
  }));
}

const PARTICLES = generateParticles();

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="loading-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Hexagonal grid background ─── */
function HexGrid() {
  return (
    <div className="loading-hex-grid">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="loading-hex-ring"
          style={{
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Scanline sweep ─── */
function Scanlines() {
  return <div className="loading-scanlines" />;
}

/* ─── Typing log lines ─── */
const LOG_LINES = [
  "Initializing render pipeline...",
  "Loading 3D assets & textures...",
  "Compiling shader programs...",
  "Building scene graph...",
  "Calibrating lighting engine...",
  "Room initialized ✓",
];

function BootLog({ progress }: { progress: number }) {
  const visibleCount = Math.min(
    LOG_LINES.length,
    Math.floor((progress / 100) * LOG_LINES.length) + 1
  );

  return (
    <div className="mt-5 space-y-1.5 font-mono text-[10px] leading-relaxed tracking-wider text-white/30 max-h-[90px] overflow-hidden">
      {LOG_LINES.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: i === visibleCount - 1 ? 0.6 : 0.3, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-center gap-2"
        >
          <span style={{ color: "var(--accent)" }}>▸</span>
          <span>{line}</span>
          {i === visibleCount - 1 && progress < 100 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              █
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function LoadingScreen({
  description,
  progress,
  visible,
}: LoadingScreenProps) {

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-6"
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          }}
          initial={{ opacity: 1 }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(124, 224, 211, 0.08), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(124, 58, 237, 0.08), transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.2), transparent 70%), linear-gradient(145deg, rgba(4, 10, 20, 0.97), rgba(9, 17, 31, 0.99))",
          }}
        >
          <Particles />
          <HexGrid />
          <Scanlines />

          {/* Ambient glow orbs */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full opacity-[0.06] blur-[100px]"
            style={{ background: "var(--accent)", top: "15%", left: "20%" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] rounded-full opacity-[0.05] blur-[80px]"
            style={{
              background: "#a78bfa",
              bottom: "20%",
              right: "15%",
            }}
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.03, 0.07, 0.03] }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.03] px-8 py-10 text-[var(--foreground)] backdrop-blur-3xl"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.5), 0 0 120px rgba(124, 224, 211, 0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l rounded-tl-[2rem]" style={{ borderColor: 'var(--accent)', opacity: 0.3 }} />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r rounded-br-[2rem]" style={{ borderColor: 'var(--accent)', opacity: 0.3 }} />

            {/* Decorative glow */}
            <div
              className="absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-15 blur-3xl"
              style={{ background: "var(--accent)" }}
            />
            <div
              className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full opacity-10 blur-3xl"
              style={{ background: "#a78bfa" }}
            />

            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="loading-status-dot" />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "var(--accent)" }}
              >
                Boot Sequence
              </span>
            </motion.div>

            <h1 className="mt-4 text-[1.75rem] font-bold text-white leading-tight">
              Preparing the room
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/50">
              {description}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-0.5 inline-block"
              >
                _
              </motion.span>
            </p>

            {/* Progress bar */}
            <div className="mt-7 relative">
              <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className="loading-progress-fill"
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              {/* Glow under progress */}
              <motion.div
                className="absolute -bottom-2 h-4 rounded-full blur-md opacity-40"
                style={{ background: "var(--accent)", left: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/35">
              <span>Interactive portfolio</span>
              <motion.span
                key={progress}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono tabular-nums"
                style={{ color: "var(--accent)" }}
              >
                {Math.min(progress, 100)}%
              </motion.span>
            </div>

            <BootLog progress={progress} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}




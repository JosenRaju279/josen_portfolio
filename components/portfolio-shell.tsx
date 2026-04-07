"use client";

import dynamic from "next/dynamic";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  sectionOrder,
  type SectionId,
  type ThemeMode,
} from "@/lib/portfolio-data";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { MobileFallback } from "@/components/ui/mobile-fallback";
import { SceneOverlay } from "@/components/ui/scene-overlay";
import { SectionPanel } from "@/components/ui/section-panel";

const PortfolioCanvas = dynamic(
  () =>
    import("@/components/3d/portfolio-canvas").then(
      (mod) => mod.PortfolioCanvas
    ),
  { ssr: false }
);

export function PortfolioShell() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [currentSection, setCurrentSection] = useState<SectionId>("projects");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [bootProgress, setBootProgress] = useState(10);
  const [sceneReady, setSceneReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const deferredActiveSection = useDeferredValue(activeSection);
  const experienceReady = sceneReady && introComplete;
  const displayedProgress = experienceReady ? 100 : bootProgress;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);

    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (experienceReady) {
      return;
    }

    const interval = window.setInterval(() => {
      setBootProgress((value) => {
        const ceiling = sceneReady ? 95 : 82;
        return value >= ceiling ? value : value + 3;
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, [experienceReady, sceneReady]);

  const focusSection = useMemo(
    () => deferredActiveSection ?? currentSection,
    [currentSection, deferredActiveSection]
  );

  const openSection = (section: SectionId) => {
    startTransition(() => {
      setCurrentSection(section);
      setActiveSection(section);
    });
  };

  if (isMobile) {
    return (
      <main className="relative min-h-screen bg-background text-foreground">
        <MobileFallback
          onOpenSection={openSection}
          onThemeToggle={setTheme}
          theme={theme}
        />
        <SectionPanel
          activeSection={activeSection}
          onClose={() => setActiveSection(null)}
        />
      </main>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0">
        <PortfolioCanvas
          activeSection={focusSection}
          isPanelOpen={activeSection !== null}
          theme={theme}
          onCurrentSectionChange={setCurrentSection}
          onIntroComplete={() => setIntroComplete(true)}
          onObjectSelect={openSection}
          onSceneReady={() => setSceneReady(true)}
        />
      </div>

      <SceneOverlay
        currentSection={currentSection}
        sections={sectionOrder}
        theme={theme}
        onSectionSelect={openSection}
        onThemeToggle={() =>
          setTheme((value) => (value === "dark" ? "light" : "dark"))
        }
      />

      <SectionPanel
        activeSection={activeSection}
        onClose={() => setActiveSection(null)}
      />

      <LoadingScreen
        description={experienceReady ? "Portfolio initialized" : "Loading immersive portfolio"}
        progress={displayedProgress}
        visible={!experienceReady}
      />
    </main>
  );
}

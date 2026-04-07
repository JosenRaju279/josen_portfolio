"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type SectionId, type ThemeMode } from "@/lib/portfolio-data";

const PortfolioScene = lazy(() =>
  import("@/components/3d/portfolio-scene").then((mod) => ({
    default: mod.PortfolioScene,
  }))
);

type PortfolioCanvasProps = {
  activeSection: SectionId;
  isPanelOpen: boolean;
  theme: ThemeMode;
  onCurrentSectionChange: (section: SectionId) => void;
  onObjectSelect: (section: SectionId) => void;
  onSceneReady: () => void;
  onIntroComplete: () => void;
};

export function PortfolioCanvas({
  activeSection,
  isPanelOpen,
  theme,
  onCurrentSectionChange,
  onObjectSelect,
  onSceneReady,
  onIntroComplete,
}: PortfolioCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      setMounted(true);
      onSceneReady();
    });

    return () => window.cancelAnimationFrame(handle);
  }, [onSceneReady]);

  return (
    <Canvas
      camera={{ fov: 36, position: [0, 1.8, 8.2] }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[theme === "dark" ? "#08111f" : "#f4efe5"]} />
      <fog
        attach="fog"
        args={[theme === "dark" ? "#08111f" : "#f4efe5", 8, 18]}
      />

      <Suspense fallback={null}>
        {mounted ? (
          <PortfolioScene
            activeSection={activeSection}
            isPanelOpen={isPanelOpen}
            theme={theme}
            onCurrentSectionChange={onCurrentSectionChange}
            onIntroComplete={onIntroComplete}
            onObjectSelect={onObjectSelect}
          />
        ) : null}
        <Preload all />
      </Suspense>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}

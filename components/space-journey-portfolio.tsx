"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const characterModelUrl = new URL("./models/3Dspace_boi.glb", import.meta.url).href;
const rocketModelUrl = new URL("./models/3Drocket_modal.glb", import.meta.url).href;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function fitScene(scene: THREE.Group, targetSize: number) {
  const clonedScene = clone(scene) as THREE.Group;
  const box = new THREE.Box3().setFromObject(clonedScene);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);
  clonedScene.position.sub(center);

  const largestDimension = Math.max(size.x, size.y, size.z) || 1;
  clonedScene.scale.setScalar(targetSize / largestDimension);

  clonedScene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    object.castShadow = true;
    object.receiveShadow = true;

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    materials.forEach((material) => {
      if (!material) {
        return;
      }

      if ("side" in material) {
        material.side = THREE.DoubleSide;
      }
    });
  });

  return clonedScene;
}

function LoadingScreen() {
  const { active, progress } = useProgress();

  if (!active && progress >= 100) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "grid",
        placeItems: "center",
        background: "#000",
        color: "#fff",
        pointerEvents: "none",
      }}
    >
      <p>{Math.round(progress)}%</p>
    </div>
  );
}

function CameraRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const rocketView = new THREE.Vector3(2.8, 0.8, 9.5);
    const characterView = new THREE.Vector3(0, 1.6, 8);
    const target = rocketView.clone().lerp(characterView, progress);
    const rocketLookAt = new THREE.Vector3(1.2, 0.1, 0);
    const characterLookAt = new THREE.Vector3(0, -0.2, 0);
    const lookAt = rocketLookAt.clone().lerp(characterLookAt, progress);

    state.camera.position.lerp(target, 0.08);
    state.camera.lookAt(lookAt);
  });

  return null;
}

function RocketModel({ progress }: { progress: number }) {
  const gltf = useGLTF(rocketModelUrl) as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const scene = useMemo(() => fitScene(gltf.scene, 2.8), [gltf.scene]);
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().fadeIn(0.3).play());
  }, [actions]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    group.visible = progress < 0.98;
    group.position.set(2.2, 0, 0);
    group.rotation.set(0.08, -Math.PI / 2, 0.12);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function CharacterModel({ progress }: { progress: number }) {
  const gltf = useGLTF(characterModelUrl) as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const scene = useMemo(() => fitScene(gltf.scene, 4.4), [gltf.scene]);
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().fadeIn(0.3).play());
  }, [actions]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const time = state.clock.getElapsedTime();
    group.visible = progress > 0.02;
    group.position.set(0, -0.55 + (1 - progress) * 1.6, 0);
    group.rotation.set(0, -0.3 + Math.sin(time * 0.4) * 0.05, 0);
    group.scale.setScalar(0.82 + progress * 0.18);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function BlackHole({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    group.visible = progress < 0.98;
  });

  return (
    <group ref={groupRef} position={[-3.8, 0.6, -2]}>
      <mesh rotation={[0, 0, 0.5]}>
        <torusGeometry args={[2.2, 0.7, 32, 120]} />
        <meshStandardMaterial color="#f5f5f5" emissive="#ffffff" emissiveIntensity={1.6} />
      </mesh>
      <mesh rotation={[0, 0, 0.5]} scale={[1.3, 1.3, 1]}>
        <torusGeometry args={[2.8, 0.26, 24, 120]} />
        <meshStandardMaterial color="#d9d9d9" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[1.65, 64]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
    </group>
  );
}

function WarpStreaks({ progress }: { progress: number }) {
  const streaks = useMemo(
    () =>
      [
        { position: [-0.8, 1.8, -3], rotation: [0.08, 0.1, -0.2], scale: [6, 0.08, 0.08] },
        { position: [0.2, -1.1, -2], rotation: [-0.15, 0.05, -0.24], scale: [7.5, 0.1, 0.1] },
        { position: [1.1, -0.7, -1], rotation: [-0.08, 0.08, -0.18], scale: [5.6, 0.08, 0.08] },
        { position: [4.8, 2.2, -2], rotation: [0.18, 0.2, -0.9], scale: [2.4, 0.07, 0.07] },
        { position: [5.5, -1.9, -1], rotation: [-0.2, 0.1, -0.95], scale: [3.4, 0.09, 0.09] },
        { position: [4.7, -2.7, 0], rotation: [-0.18, 0.12, -1.05], scale: [2.6, 0.08, 0.08] },
        { position: [3.9, 1.1, -2], rotation: [0.2, 0.15, -0.82], scale: [1.8, 0.06, 0.06] },
      ] as Array<{
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
      }>,
    []
  );

  return (
    <group visible={progress < 0.98}>
      {streaks.map((streak, index) => (
        <mesh
          key={`${streak.position.join("-")}-${index}`}
          position={streak.position}
          rotation={streak.rotation}
          scale={streak.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#f5f5f5" />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <CameraRig progress={progress} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 8]} intensity={1.8} castShadow />
      <pointLight position={[-7, 2, 2]} intensity={40} color="#ffffff" />
      <pointLight position={[4, 2, 5]} intensity={10} color="#ffffff" />
      <Suspense fallback={null}>
        <BlackHole progress={progress} />
        <WarpStreaks progress={progress} />
        <RocketModel progress={progress} />
        <CharacterModel progress={progress} />
      </Suspense>
    </>
  );
}

export function SpaceJourneyPortfolio() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <main style={{ height: "200vh", background: "#000" }}>
      <LoadingScreen />
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.4, 8], fov: 34 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <Scene progress={progress} />
        </Canvas>
      </div>
    </main>
  );
}

useGLTF.preload(characterModelUrl);
useGLTF.preload(rocketModelUrl);

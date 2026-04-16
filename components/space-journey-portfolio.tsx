"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const rocketModelUrl = new URL("./models/3Drocket_modal.glb", import.meta.url)
  .href;
const characterModelUrl = new URL("./models/3Dspace_boi.glb", import.meta.url)
  .href;

const ROCKET_START_POSITION: [number, number, number] = [0.0, 0.3, 0];
const ROCKET_START_ROTATION: [number, number, number] = [
  0.05,
  -Math.PI / 2,
  0.1,
];
const ROCKET_EXIT_POSITION_OFFSET: [number, number, number] = [2.0, -0.15, 0];
const ROCKET_EXIT_ROTATION_OFFSET: [number, number, number] = [0, 0.05, 0];
const ROCKET_IDLE_ROLL = 0.02;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
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
    if (!(object instanceof THREE.Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = true;
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    materials.forEach((material) => {
      if (material && "side" in material) {
        material.side = THREE.DoubleSide;
      }
    });
  });

  return clonedScene;
}

function CameraRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const rocketPhase = smoothStep(0, 0.58, progress);
    const revealPhase = smoothStep(0.52, 1, progress);

    // Camera sits BEHIND the rocket (negative X = behind since rocket flies +X)
    // Slightly right and up so we see the rocket body + rings in background
    const startPosition = new THREE.Vector3(-1.6, 0.5, 0.0);
    const rocketEntryPosition = new THREE.Vector3(-1.2, 0.45, 0);
    const characterPosition = new THREE.Vector3(0, 1.05, 8.1);

    // Look forward toward where rocket is heading (+X direction)
    const startLookAt = new THREE.Vector3(0.2, 0.3, 0);
    const rocketLookAt = new THREE.Vector3(2.0, -0.05, 0);
    const characterLookAt = new THREE.Vector3(0, 0.2, 0);

    const cameraPosition = startPosition
      .clone()
      .lerp(rocketEntryPosition, rocketPhase)
      .lerp(characterPosition, revealPhase);

    const lookAt = startLookAt
      .clone()
      .lerp(rocketLookAt, rocketPhase)
      .lerp(characterLookAt, revealPhase);

    state.camera.position.lerp(cameraPosition, 0.08);
    state.camera.lookAt(lookAt);
  });

  return null;
}

function RocketModel({ progress }: { progress: number }) {
  const gltf = useGLTF(rocketModelUrl) as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const scene = useMemo(() => fitScene(gltf.scene, 3.3), [gltf.scene]);
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action) =>
      action?.reset().fadeIn(0.3).play(),
    );
  }, [actions]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.getElapsedTime();
    const exitPhase = smoothStep(0.48, 0.82, progress);

    group.visible = exitPhase < 0.995;
    group.position.set(
      ROCKET_START_POSITION[0] + exitPhase * ROCKET_EXIT_POSITION_OFFSET[0],
      ROCKET_START_POSITION[1] + exitPhase * ROCKET_EXIT_POSITION_OFFSET[1],
      ROCKET_START_POSITION[2] + exitPhase * ROCKET_EXIT_POSITION_OFFSET[2],
    );
    group.rotation.set(
      ROCKET_START_ROTATION[0] + exitPhase * ROCKET_EXIT_ROTATION_OFFSET[0],
      ROCKET_START_ROTATION[1] + exitPhase * ROCKET_EXIT_ROTATION_OFFSET[1],
      ROCKET_START_ROTATION[2] +
        exitPhase * ROCKET_EXIT_ROTATION_OFFSET[2] +
        Math.sin(time * 0.5) * ROCKET_IDLE_ROLL,
    );
    group.scale.setScalar(1 + exitPhase * 1.6);
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
  const scene = useMemo(() => fitScene(gltf.scene, 5.2), [gltf.scene]);
  const groupRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(gltf.animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action) =>
      action?.reset().fadeIn(0.3).play(),
    );
  }, [actions]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.getElapsedTime();
    const revealPhase = smoothStep(0.55, 0.92, progress);

    group.visible = revealPhase > 0.02;
    group.position.set(0, -2.6 + (1 - revealPhase) * 3.4, 0);
    group.rotation.set(0, -0.2 + Math.sin(time * 0.45) * 0.08, 0);
    group.scale.setScalar(0.7 + revealPhase * 0.42);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 10, 22]} />
      <CameraRig progress={progress} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 8]} intensity={1.8} castShadow />
      <pointLight position={[5, 2, 6]} intensity={14} />
      <pointLight position={[-4, 2, 5]} intensity={10} />
      <Suspense fallback={null}>
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
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
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
    <main style={{ height: "260vh", background: "#000" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [-0.8, 0.3, 0.5], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <Scene progress={progress} />
        </Canvas>
      </div>
    </main>
  );
}

useGLTF.preload(rocketModelUrl);
useGLTF.preload(characterModelUrl);

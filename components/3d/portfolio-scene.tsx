"use client";

import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  RoundedBox,
  ScrollControls,
  Text,
  useCursor,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  portfolioData,
  sectionOrder,
  type SectionId,
  type ThemeMode,
} from "@/lib/portfolio-data";

type PortfolioSceneProps = {
  activeSection: SectionId;
  isPanelOpen: boolean;
  theme: ThemeMode;
  onCurrentSectionChange: (section: SectionId) => void;
  onIntroComplete: () => void;
  onObjectSelect: (section: SectionId) => void;
};

type CameraStop = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

type InteractiveItemProps = {
  section: SectionId;
  active: boolean;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (section: SectionId) => void;
  children: (hovered: boolean, active: boolean) => React.ReactNode;
};

const tempPosition = new THREE.Vector3();
const tempLookAt = new THREE.Vector3();
const tempBlend = new THREE.Vector3();
const currentLookAt = new THREE.Vector3();
const sampleArtworkSrc = "/sample-project-preview.svg";

function createSeededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function InteractiveItem({
  section,
  active,
  position,
  rotation = [0, 0, 0],
  onSelect,
  children,
}: InteractiveItemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const scale = hovered || active ? 1.04 : 1;
    const lift = hovered ? 0.06 : 0;

    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      position[1] + lift,
      6,
      delta
    );
    group.scale.x = THREE.MathUtils.damp(group.scale.x, scale, 6, delta);
    group.scale.y = THREE.MathUtils.damp(group.scale.y, scale, 6, delta);
    group.scale.z = THREE.MathUtils.damp(group.scale.z, scale, 6, delta);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(section);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
    >
      {children(hovered, active)}
    </group>
  );
}

function Poster({
  frameColor,
  matColor,
  position,
  rotation = [0, 0, 0],
  size,
  imageSrc = sampleArtworkSrc,
}: {
  frameColor: string;
  matColor: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  imageSrc?: string;
}) {
  const texture = useTexture(imageSrc);

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[size[0] + 0.18, size[1] + 0.18, 0.12]} />
        <meshStandardMaterial color={frameColor} roughness={0.42} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[size[0] + 0.07, size[1] + 0.07]} />
        <meshStandardMaterial color={matColor} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} roughness={0.36} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[size[0] + 0.015, size[1] + 0.015]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          roughness={0.12}
          transmission={0.08}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

useTexture.preload(sampleArtworkSrc);

/* ─── Fairy / String Lights ─── */
function FairyLights({
  points,
  color = "#ffe9a0",
}: {
  points: [number, number, number][];
  color?: string;
}) {
  const lightRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    lightRefs.current.forEach((mesh, i) => {
      if (mesh && mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const flicker = 0.78 + Math.sin(timeRef.current * 1.3 + i * 0.85) * 0.12;
        mat.emissiveIntensity = flicker;
      }
    });
  });

  return (
    <group>
      {/* Wire connecting the lights */}
      {points.map((point, i) => {
        if (i === 0) return null;
        const prev = points[i - 1];
        const mid = [
          (prev[0] + point[0]) / 2,
          Math.min(prev[1], point[1]) - 0.04,
          (prev[2] + point[2]) / 2,
        ] as [number, number, number];

        return (
          <group key={`wire-${i}`}>
            <mesh position={[(prev[0] + mid[0]) / 2, (prev[1] + mid[1]) / 2, (prev[2] + mid[2]) / 2]}>
              <cylinderGeometry args={[0.006, 0.006, 0.2, 6]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Light bulbs */}
      {points.map((point, i) => (
        <group key={`light-${i}`} position={point}>
          <mesh
            ref={(el) => {
              if (el) lightRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
          <pointLight
            color={color}
            intensity={0.8}
            distance={1.2}
          />
        </group>
      ))}
    </group>
  );
}

/* ─── Floating Dust Particles ─── */
function DustParticles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const random = createSeededRandom(count * 101 + 7);

    return Array.from({ length: count }, () => ({
      x: (random() - 0.5) * 10,
      y: random() * 4,
      z: (random() - 0.5) * 8 - 2,
      speed: 0.02 + random() * 0.04,
      offset: random() * Math.PI * 2,
      scale: 0.01 + random() * 0.02,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const y = ((p.y + t * p.speed) % 5) - 1;
      dummy.position.set(
        p.x + Math.sin(t * 0.3 + p.offset) * 0.3,
        y,
        p.z + Math.cos(t * 0.2 + p.offset) * 0.2
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#fff8e1"
        emissive="#fff8e1"
        emissiveIntensity={0.6}
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ─── Office Chair ─── */
function OfficeChair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      {/* Seat */}
      <RoundedBox args={[0.52, 0.06, 0.48]} radius={0.02} smoothness={4} position={[0, 0.42, 0]}>
        <meshStandardMaterial color="#1a1a24" roughness={0.7} />
      </RoundedBox>
      {/* Backrest */}
      <RoundedBox args={[0.5, 0.52, 0.06]} radius={0.02} smoothness={4} position={[0, 0.76, -0.22]}>
        <meshStandardMaterial color="#1a1a24" roughness={0.7} />
      </RoundedBox>
      {/* Center post */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.38, 12]} />
        <meshStandardMaterial color="#7a7a88" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Base star (5 legs) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <group key={i}>
            <mesh
              position={[
                Math.cos(angle) * 0.22,
                0.04,
                Math.sin(angle) * 0.22,
              ]}
              rotation={[0, -angle, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.02, 0.025, 0.44, 8]} />
              <meshStandardMaterial color="#7a7a88" metalness={0.5} roughness={0.3} />
            </mesh>
            {/* Caster wheel */}
            <mesh
              position={[
                Math.cos(angle) * 0.42,
                0.02,
                Math.sin(angle) * 0.42,
              ]}
            >
              <sphereGeometry args={[0.03, 10, 10]} />
              <meshStandardMaterial color="#444" roughness={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ─── Rug on the Floor ─── */
function FloorRug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0.15]}>
      <mesh>
        <planeGeometry args={[3.8, 2.4]} />
        <meshStandardMaterial
          color="#3b2f5c"
          roughness={0.95}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Inner pattern */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial
          color="#4a3d6e"
          roughness={0.95}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Center diamond */}
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial
          color="#5c4d8a"
          roughness={0.95}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function WallText() {
  const displayName = portfolioData.hero.name.split(" ").slice(0, 1).join(" ");
  const roleWords = portfolioData.hero.role.replace(/-/g, " ").split(" ");
  const roleTopLine = roleWords.slice(0, 2).join(" ");
  const roleBottomLine = roleWords.slice(2).join(" ");

  return (
    <group position={[0.9, 4.08, -4.92]}>
      <Text
        anchorX="center"
        color="#f7f1e8"
        fontSize={0.19}
        maxWidth={4.6}
        position={[0, 0, 0]}
      >
        My Name Is {displayName}
      </Text>
      <Text
        anchorX="center"
        color="#efe7dc"
        fontSize={0.17}
        maxWidth={4.6}
        position={[0, -0.42, 0]}
      >
        I Am A
      </Text>
      <Text
        anchorX="center"
        color="#f1cf72"
        fontSize={0.29}
        fontWeight={700}
        maxWidth={4.2}
        position={[0, -0.78, 0.02]}
      >
        {roleTopLine}
      </Text>
      <Text
        anchorX="center"
        color="#f7f1e8"
        fontSize={0.24}
        fontWeight={500}
        maxWidth={4.2}
        position={[0, -1.08, 0.01]}
      >
        {roleBottomLine}
      </Text>
    </group>
  );
}

function Room({
  activeSection,
  onObjectSelect,
}: {
  activeSection: SectionId;
  onObjectSelect: (section: SectionId) => void;
}) {
  const palette = {
    wall: "#7a78a6",
    wallDeep: "#6c6b98",
    floor: "#e8d6c7",
    desk: "#fcfcfd",
    metal: "#d7d7de",
    screen: "#23262e",
    screenGlow: "#f1be57",
    couch: "#5a3ecf",
    couchDark: "#2b1f66",
    pillow: "#f7f3f7",
    shelf: "#dde3f3",
    bookDark: "#222536",
    bookLight: "#f7f8fb",
    coffee: "#262734",
    highlight: "#fff4de",
  };

  return (
    <group position={[0, -1.05, 0]}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color={palette.floor} roughness={0.95} />
      </mesh>

      {/* Rug */}
      <FloorRug position={[0.8, 0.01, -0.5]} />

      {/* Back wall */}
      <mesh position={[0, 3.25, -5.1]}>
        <boxGeometry args={[16, 6.5, 0.2]} />
        <meshStandardMaterial color={palette.wall} roughness={0.96} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-5.1, 3.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[14, 6.5, 0.2]} />
        <meshStandardMaterial color={palette.wallDeep} roughness={0.96} />
      </mesh>

      {/* Light shaft (diagonal sunlight effect) */}
      <mesh position={[1.65, 2.4, -4.75]} rotation={[0, 0, -0.35]}>
        <planeGeometry args={[3.3, 1.8]} />
        <meshStandardMaterial color="#fff4e1" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* ─── Fairy Lights across shelf ─── */}
      <FairyLights
        points={[
          [-0.4, 2.32, -4.4],
          [0.0, 2.28, -4.38],
          [0.3, 2.25, -4.36],
          [0.6, 2.30, -4.35],
          [0.9, 2.28, -4.34],
          [1.2, 2.32, -4.35],
          [1.5, 2.28, -4.36],
          [1.8, 2.30, -4.38],
          [2.1, 2.26, -4.39],
        ]}
      />

      {/* ─── Fairy Lights draped on wall ─── */}
      <FairyLights
        points={[
          [-4.8, 4.8, -4.8],
          [-4.3, 4.5, -4.82],
          [-3.8, 4.3, -4.83],
          [-3.3, 4.5, -4.82],
          [-2.8, 4.7, -4.81],
          [-2.3, 4.4, -4.82],
          [-1.8, 4.6, -4.83],
        ]}
        color="#ffd4a8"
      />

      {/* ─── About — Wall Posters (enhanced frames) ─── */}
      <InteractiveItem
        section="about"
        active={activeSection === "about"}
        position={[-3.55, 3.45, -4.78]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            <Poster
              frameColor="#f5efe3"
              matColor="#d9e1ef"
              position={[-0.7, 0.8, 0]}
              rotation={[0, 0, -0.03]}
              size={[1.1, 1.45]}
            />
            <Poster
              frameColor="#765131"
              matColor="#efe5d4"
              position={[0.1, 0.65, 0.02]}
              rotation={[0, 0, 0.045]}
              size={[1.45, 1.25]}
            />
            <Poster
              frameColor="#e9edf4"
              matColor="#dbe6f6"
              position={[-0.55, -0.8, 0.04]}
              rotation={[0, 0, -0.025]}
              size={[1.3, 1]}
            />
            <Poster
              frameColor="#31205f"
              matColor="#efe4c8"
              position={[0.32, -0.9, 0.06]}
              rotation={[0, 0, 0.03]}
              size={[0.9, 1.02]}
            />
            <Poster
              frameColor="#f9f9f9"
              matColor="#d8eadf"
              position={[1.05, 0.05, 0.08]}
              rotation={[0, 0, -0.02]}
              size={[0.78, 0.92]}
            />
            <mesh position={[-0.05, 0.05, 0.04]}>
              <planeGeometry args={[2.8, 3.4]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={hovered || active ? 0.06 : 0.01}
                emissive="#fff4de"
                emissiveIntensity={hovered || active ? 0.8 : 0}
              />
            </mesh>
          </group>
        )}
      </InteractiveItem>

      {/* ─── Skills — Bookshelf (floor standing) ─── */}
      <InteractiveItem
        section="skills"
        active={activeSection === "skills"}
        position={[-3.95, 0.8, -1.1]}
        rotation={[0, 0.18, 0]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            <RoundedBox args={[1.75, 1.45, 0.62]} radius={0.04} smoothness={4}>
              <meshStandardMaterial color="#f8fbff" roughness={0.66} />
            </RoundedBox>
            <mesh position={[0, 0.24, 0]}>
              <boxGeometry args={[1.62, 0.05, 0.56]} />
              <meshStandardMaterial color="#edf2ff" roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.26, 0]}>
              <boxGeometry args={[1.62, 0.05, 0.56]} />
              <meshStandardMaterial color="#edf2ff" roughness={0.8} />
            </mesh>
            {([-0.42, -0.08, 0.26, 0.52] as number[]).map((x, index) => (
              <mesh key={`book-top-${x}`} position={[x, 0.02, 0.14]}>
                <boxGeometry args={[0.16, 0.45 + index * 0.06, 0.12]} />
                <meshStandardMaterial
                  color={index === 3 ? "#30354a" : index === 1 ? "#8b3a3a" : "#1d2231"}
                  emissive="#7d78d9"
                  emissiveIntensity={hovered || active ? 0.15 : 0}
                />
              </mesh>
            ))}
            {([-0.38, 0.04, 0.46] as number[]).map((x, index) => (
              <mesh key={`book-bottom-${x}`} position={[x, -0.52, 0.16]}>
                <boxGeometry args={[0.18, 0.34 + index * 0.1, 0.12]} />
                <meshStandardMaterial color={index === 1 ? "#2a4a3a" : "#202536"} />
              </mesh>
            ))}
          </group>
        )}
      </InteractiveItem>

      {/* ─── Skills — Floating Shelf ─── */}
      <InteractiveItem
        section="skills"
        active={activeSection === "skills"}
        position={[0.85, 1.95, -4.55]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.8, 0.12, 0.42]} />
              <meshStandardMaterial color={palette.shelf} roughness={0.55} />
            </mesh>
            {/* Shelf brackets */}
            <mesh position={[-0.62, -0.18, 0]}>
              <boxGeometry args={[0.08, 0.34, 0.08]} />
              <meshStandardMaterial color="#cfd8ed" />
            </mesh>
            <mesh position={[0.58, -0.18, 0]}>
              <boxGeometry args={[0.08, 0.34, 0.08]} />
              <meshStandardMaterial color="#cfd8ed" />
            </mesh>
            {/* Books */}
            {([-0.1, 0.06, 0.22, 0.38] as number[]).map((x) => (
              <mesh key={x} position={[x, 0.26, 0.04]}>
                <boxGeometry args={[0.11, 0.5, 0.18]} />
                <meshStandardMaterial color={palette.bookLight} />
              </mesh>
            ))}
            {/* Small box */}
            <mesh position={[0.64, 0.09, 0.03]}>
              <boxGeometry args={[0.24, 0.1, 0.18]} />
              <meshStandardMaterial color="#f7f8fb" />
            </mesh>
            {/* Plant pot */}
            <mesh position={[-0.62, 0.08, 0.05]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 20]} />
              <meshStandardMaterial color="#cb7d2a" />
            </mesh>
            {/* Plant leaves */}
            <mesh position={[-0.62, 0.24, 0.05]}>
              <coneGeometry args={[0.12, 0.36, 8]} />
              <meshStandardMaterial color="#86b857" />
            </mesh>
            {/* Highlight outline */}
            <lineSegments position={[0.08, 0.12, 0.16]}>
              <edgesGeometry args={[new THREE.BoxGeometry(1.7, 0.55, 0.05)]} />
              <lineBasicMaterial color={hovered || active ? "#fff4de" : "#d7d3ff"} />
            </lineSegments>
          </group>
        )}
      </InteractiveItem>

      <WallText />

      {/* ─── Projects — Desk ─── */}
      <InteractiveItem
        section="projects"
        active={activeSection === "projects"}
        position={[0.4, 0.95, -2.2]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            {/* Desk surface */}
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[4.8, 0.16, 1.9]} />
              <meshStandardMaterial color={palette.desk} roughness={0.44} />
            </mesh>
            {/* Desk legs */}
            {([-1.8, 1.8] as number[]).map((x) => (
              <mesh key={`desk-leg-${x}`} position={[x, -0.85, 0.55]} rotation={[0.2, 0, 0.18 * Math.sign(x)]}>
                <cylinderGeometry args={[0.06, 0.08, 1.75, 14]} />
                <meshStandardMaterial color={palette.metal} metalness={0.35} roughness={0.32} />
              </mesh>
            ))}
            {([-1.8, 1.8] as number[]).map((x) => (
              <mesh key={`desk-leg-back-${x}`} position={[x, -0.82, -0.45]} rotation={[-0.2, 0, 0.18 * Math.sign(x)]}>
                <cylinderGeometry args={[0.06, 0.08, 1.7, 14]} />
                <meshStandardMaterial color={palette.metal} metalness={0.35} roughness={0.32} />
              </mesh>
            ))}

            {/* Monitor */}
            <mesh position={[-0.65, 0.62, -0.08]}>
              <boxGeometry args={[1.05, 0.62, 0.08]} />
              <meshStandardMaterial color={palette.screen} roughness={0.24} />
            </mesh>
            {/* Monitor screen (animated glow) */}
            <mesh position={[-0.65, 0.62, -0.03]}>
              <planeGeometry args={[0.9, 0.5]} />
              <meshStandardMaterial
                color="#f7cb58"
                emissive="#f7cb58"
                emissiveIntensity={hovered || active ? 1.2 : 0.72}
              />
            </mesh>
            {/* Monitor stand */}
            <mesh position={[-0.65, 0.22, -0.08]}>
              <cylinderGeometry args={[0.05, 0.05, 0.26, 20]} />
              <meshStandardMaterial color="#e8ebf1" />
            </mesh>
            <mesh position={[-0.65, 0.1, -0.05]}>
              <boxGeometry args={[0.42, 0.04, 0.2]} />
              <meshStandardMaterial color="#e8ebf1" />
            </mesh>

            {/* Laptop */}
            <mesh position={[0.72, 0.38, -0.18]}>
              <boxGeometry args={[0.68, 0.42, 0.06]} />
              <meshStandardMaterial color="#10131c" roughness={0.28} />
            </mesh>
            {/* Laptop base */}
            <mesh position={[0.3, 0.33, -0.1]}>
              <boxGeometry args={[0.34, 0.44, 0.16]} />
              <meshStandardMaterial color="#11131a" roughness={0.24} />
            </mesh>

            {/* Phone */}
            <mesh position={[1.62, 0.1, 0.18]} rotation={[0, 0.2, 0]}>
              <boxGeometry args={[0.28, 0.04, 0.12]} />
              <meshStandardMaterial color="#ececf0" roughness={0.2} />
            </mesh>

            {/* Keyboard */}
            <RoundedBox args={[0.72, 0.025, 0.24]} radius={0.01} smoothness={3} position={[-0.6, 0.095, 0.34]}>
              <meshStandardMaterial color="#f0f0f5" roughness={0.3} />
            </RoundedBox>
            {/* Mouse */}
            <RoundedBox args={[0.08, 0.025, 0.12]} radius={0.01} smoothness={3} position={[-0.08, 0.095, 0.36]}>
              <meshStandardMaterial color="#f0f0f5" roughness={0.3} />
            </RoundedBox>

            {/* Pen holder */}
            <mesh position={[1.35, 0.22, -0.2]}>
              <cylinderGeometry args={[0.06, 0.07, 0.28, 16]} />
              <meshStandardMaterial color="#3a3a4a" roughness={0.6} />
            </mesh>
            {/* Pens sticking out */}
            {[0, 1, 2].map((i) => (
              <mesh key={`pen-${i}`} position={[1.35 + (i - 1) * 0.025, 0.42, -0.2]} rotation={[0.05 * (i - 1), 0, 0.08 * (i - 1)]}>
                <cylinderGeometry args={[0.008, 0.008, 0.22, 6]} />
                <meshStandardMaterial color={i === 0 ? "#2a4cdb" : i === 1 ? "#1a1a1a" : "#c42626"} />
              </mesh>
            ))}

            {/* Sticky notes */}
            <mesh position={[1.8, 0.1, 0.0]} rotation={[-Math.PI / 2 + 0.01, 0, 0.15]}>
              <planeGeometry args={[0.22, 0.22]} />
              <meshStandardMaterial color="#fff06a" roughness={0.8} />
            </mesh>
            <mesh position={[1.72, 0.105, -0.15]} rotation={[-Math.PI / 2 + 0.01, 0, -0.08]}>
              <planeGeometry args={[0.2, 0.2]} />
              <meshStandardMaterial color="#ff9a9a" roughness={0.8} />
            </mesh>

            {/* Desk shadow on floor */}
            <mesh position={[0, -1.45, -0.18]}>
              <boxGeometry args={[0.5, 0.02, 0.42]} />
              <meshStandardMaterial color="#eadfd6" transparent opacity={0.35} />
            </mesh>
          </group>
        )}
      </InteractiveItem>

      {/* ─── Office Chair ─── */}
      <OfficeChair position={[0.58, 0.18, -0.4]} />

      {/* ─── Waste Basket ─── */}
      <mesh position={[-1.2, 0.15, -1.3]}>
        <cylinderGeometry args={[0.2, 0.16, 0.34, 16, 1, true]} />
        <meshStandardMaterial
          color="#2a2a30"
          roughness={0.7}
          side={THREE.DoubleSide}
          wireframe={true}
        />
      </mesh>
      <mesh position={[-1.2, 0.0, -1.3]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
        <meshStandardMaterial color="#2a2a30" roughness={0.7} />
      </mesh>

      {/* ─── Second monitor (back-facing) ─── */}
      <mesh position={[0.58, 0.18, -1.15]} rotation={[0, Math.PI, 0]}>
        <group>
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.8, 0.95, 0.12]} />
            <meshStandardMaterial color="#17181e" roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.72, 18]} />
            <meshStandardMaterial color="#aab0bd" metalness={0.3} roughness={0.28} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.28, 0.12, 0.08, 22]} />
            <meshStandardMaterial color="#959cad" metalness={0.35} roughness={0.3} />
          </mesh>
          {([-0.42, -0.12, 0.12, 0.42] as number[]).map((x) => (
            <mesh key={x} position={[x, -0.26, 0.18]} rotation={[0.25, 0, x * 0.9]}>
              <boxGeometry args={[0.34, 0.04, 0.08]} />
              <meshStandardMaterial color="#9ca3b4" />
            </mesh>
          ))}
        </group>
      </mesh>

      {/* ─── Contact — Couch ─── */}
      <InteractiveItem
        section="contact"
        active={activeSection === "contact"}
        position={[3.55, 0.72, -2.3]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            <RoundedBox args={[3.25, 1.38, 1.18]} radius={0.18} smoothness={6}>
              <meshStandardMaterial color={palette.couch} roughness={0.62} />
            </RoundedBox>
            <mesh position={[-1.2, 0.08, 0.22]}>
              <boxGeometry args={[0.8, 0.92, 0.86]} />
              <meshStandardMaterial color={palette.couch} roughness={0.64} />
            </mesh>
            <mesh position={[1.2, 0.08, 0.22]}>
              <boxGeometry args={[0.8, 0.92, 0.86]} />
              <meshStandardMaterial color={palette.couchDark} roughness={0.64} />
            </mesh>
            {([-0.9, 0.9] as number[]).map((x, index) => (
              <mesh key={x} position={[x, 0.26, 0.44]} rotation={[0.08, 0, index === 0 ? -0.2 : 0.18]}>
                <boxGeometry args={[0.54, 0.54, 0.16]} />
                <meshStandardMaterial color={palette.pillow} roughness={0.8} />
              </mesh>
            ))}
            <mesh position={[0, 0.55, -0.02]}>
              <boxGeometry args={[3.18, 0.46, 0.32]} />
              <meshStandardMaterial
                color={palette.couchDark}
                emissive="#9f74ff"
                emissiveIntensity={hovered || active ? 0.3 : 0.1}
              />
            </mesh>
          </group>
        )}
      </InteractiveItem>

      {/* ─── Contact — Coffee Table ─── */}
      <InteractiveItem
        section="contact"
        active={activeSection === "contact"}
        position={[4.25, 0.18, 0.7]}
        rotation={[0, -0.18, 0]}
        onSelect={onObjectSelect}
      >
        {(hovered, active) => (
          <group>
            <mesh position={[0, 0.18, 0]}>
              <boxGeometry args={[1.85, 0.1, 0.85]} />
              <meshStandardMaterial color={palette.coffee} roughness={0.2} />
            </mesh>
            {([-0.72, 0.72] as number[]).flatMap((x) => ([-0.28, 0.28] as number[]).map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.02, z]}>
                <cylinderGeometry args={[0.05, 0.05, 0.36, 18]} />
                <meshStandardMaterial
                  color="#8e9097"
                  metalness={0.52}
                  roughness={0.26}
                  emissive="#ffe5c5"
                  emissiveIntensity={hovered || active ? 0.12 : 0}
                />
              </mesh>
            )))}
            {/* Coffee cup on table */}
            <mesh position={[0.4, 0.3, 0.1]}>
              <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
              <meshStandardMaterial color="#f8f8f2" roughness={0.4} />
            </mesh>
            {/* Cup handle */}
            <mesh position={[0.48, 0.3, 0.1]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.035, 0.01, 8, 12, Math.PI]} />
              <meshStandardMaterial color="#f8f8f2" roughness={0.4} />
            </mesh>
          </group>
        )}
      </InteractiveItem>

      {/* ─── Decorative plant in corner ─── */}
      <group position={[-4.2, 0, -4.2]}>
        {/* Pot */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.2, 0.16, 0.38, 18]} />
          <meshStandardMaterial color="#c4774a" roughness={0.8} />
        </mesh>
        {/* Plant */}
        <mesh position={[0, 0.55, 0]}>
          <coneGeometry args={[0.28, 0.6, 8]} />
          <meshStandardMaterial color="#4a8a3e" roughness={0.9} />
        </mesh>
        <mesh position={[0.1, 0.7, 0.05]} rotation={[0.2, 0, 0.15]}>
          <coneGeometry args={[0.2, 0.45, 7]} />
          <meshStandardMaterial color="#5ca04e" roughness={0.9} />
        </mesh>
      </group>

      {/* ─── Small decorative items near the wall ─── */}
      {/* Picture frame leaning against back wall */}
      <mesh position={[2.0, 1.06, -4.68]}>
        <boxGeometry args={[0.16, 0.26, 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2.22, 1.06, -4.68]}>
        <boxGeometry args={[0.16, 0.26, 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* ─── Desk lamp ─── */}
      <group position={[1.85, 0.95, -2.55]}>
        {/* Base */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#2a2a35" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.58, 8]} />
          <meshStandardMaterial color="#4a4a55" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Shade */}
        <mesh position={[0.05, 0.64, 0]} rotation={[0, 0, 0.08]}>
          <coneGeometry args={[0.14, 0.16, 12, 1, true]} />
          <meshStandardMaterial
            color="#f0e8d8"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Lamp glow */}
        <pointLight color="#ffd49e" intensity={8} distance={4} position={[0.05, 0.58, 0]} />
      </group>
    </group>
  );
}

function CameraRig({
  activeSection,
  isPanelOpen,
  onCurrentSectionChange,
  onIntroComplete,
}: Pick<
  PortfolioSceneProps,
  "activeSection" | "isPanelOpen" | "onCurrentSectionChange" | "onIntroComplete"
>) {
  const scroll = useScroll();
  const { camera, pointer } = useThree();
  const introDone = useRef(false);
  const introProgress = useRef(0);
  const visibleSectionRef = useRef<SectionId>("projects");

  const stops = useMemo<Record<SectionId, CameraStop>>(
    () => ({
      projects: {
        position: new THREE.Vector3(0.15, 2.08, 8.1),
        lookAt: new THREE.Vector3(0.45, 1.5, -2.65),
      },
      skills: {
        position: new THREE.Vector3(-1.25, 2.12, 8.05),
        lookAt: new THREE.Vector3(-2.45, 1.8, -2.9),
      },
      about: {
        position: new THREE.Vector3(-0.35, 2.45, 7.45),
        lookAt: new THREE.Vector3(-1.35, 3.15, -4.65),
      },
      contact: {
        position: new THREE.Vector3(1.55, 1.95, 8.35),
        lookAt: new THREE.Vector3(3.45, 1.05, -2.1),
      },
    }),
    []
  );

  useFrame((_, delta) => {
    const scrollPosition = scroll.offset * (sectionOrder.length - 1);
    const currentIndex = Math.min(sectionOrder.length - 2, Math.floor(scrollPosition));
    const progress = scrollPosition - currentIndex;
    const baseSection = sectionOrder[currentIndex];
    const nextSection = sectionOrder[currentIndex + 1];

    tempPosition.copy(stops[baseSection].position).lerp(stops[nextSection].position, progress);
    tempLookAt.copy(stops[baseSection].lookAt).lerp(stops[nextSection].lookAt, progress);

    const visibleSection = sectionOrder[Math.min(sectionOrder.length - 1, Math.round(scrollPosition))];
    if (visibleSectionRef.current !== visibleSection) {
      visibleSectionRef.current = visibleSection;
      onCurrentSectionChange(visibleSection);
    }

    if (!introDone.current) {
      introProgress.current = Math.min(introProgress.current + delta * 0.28, 1);
      const introEase = 1 - (1 - introProgress.current) ** 3;

      camera.position.set(
        THREE.MathUtils.lerp(0.2, tempPosition.x, introEase),
        THREE.MathUtils.lerp(2.9, tempPosition.y, introEase),
        THREE.MathUtils.lerp(11.6, tempPosition.z, introEase)
      );

      currentLookAt.lerp(tempLookAt, 0.08);
      camera.lookAt(currentLookAt);

      if (introProgress.current >= 1) {
        introDone.current = true;
        onIntroComplete();
      }
      return;
    }

    if (isPanelOpen) {
      const focused = stops[activeSection];
      tempPosition.lerp(focused.position, 0.72);
      tempLookAt.lerp(focused.lookAt, 0.72);
    }

    tempBlend.set(pointer.x * 0.12, pointer.y * 0.08, 0);
    tempPosition.add(tempBlend);

    camera.position.lerp(tempPosition, 1 - Math.exp(-delta * 3.2));
    currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, tempLookAt.x, 3.2, delta);
    currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, tempLookAt.y, 3.2, delta);
    currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, tempLookAt.z, 3.2, delta);
    camera.lookAt(currentLookAt);
  });

  return null;
}

export function PortfolioScene(props: PortfolioSceneProps) {
  return (
    <>
      <ambientLight intensity={0.85} color="#f7edff" />
      <directionalLight
        castShadow={false}
        color="#fff4df"
        intensity={2.4}
        position={[5.5, 4.8, 3.2]}
      />
      {/* Warm desk light */}
      <pointLight color="#f8d1a9" intensity={55} distance={12} position={[0.5, 1.4, -2.2]} />
      {/* Purple couch ambient */}
      <pointLight color="#7b68ff" intensity={30} distance={9} position={[3.9, 1.1, -1.9]} />
      {/* Wall poster light */}
      <pointLight color="#ffffff" intensity={16} distance={7} position={[-3.2, 2.9, -3.8]} />
      {/* Top accent light for dramatic feel */}
      <spotLight
        color="#ffeedd"
        intensity={15}
        distance={14}
        angle={0.5}
        penumbra={0.8}
        position={[2, 6, -1]}
        target-position={[1, 0, -3]}
      />

      {/* Floating dust/sparkle particles */}
      <DustParticles count={40} />

      <ScrollControls damping={0.12} pages={4}>
        <CameraRig
          activeSection={props.activeSection}
          isPanelOpen={props.isPanelOpen}
          onCurrentSectionChange={props.onCurrentSectionChange}
          onIntroComplete={props.onIntroComplete}
        />

        <Float speed={0.9} floatIntensity={0.08} rotationIntensity={0.03}>
          <Room
            activeSection={props.activeSection}
            onObjectSelect={props.onObjectSelect}
          />
        </Float>

        <ContactShadows
          blur={2.8}
          color="#2a1d48"
          opacity={0.28}
          position={[0, -1.02, 0]}
          scale={12}
        />
      </ScrollControls>

      <Environment preset="sunset" />
      <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} />
    </>
  );
}







"use client";
import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Html, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { techCategories } from "@/data/techStack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/*  constants  */

const LEVEL_HEX = {
  Expert: "#3EFFC2",
  Strong: "#7A8FAA",
  Working: "#3A4A5A",
  Learning: "#FFB347",
};

// Overview: 6 suns spread in 3D space
const OVERVIEW_POS = [
  [-4.4, 2.2, -0.6],
  [0.0, 2.9, 0.3],
  [4.4, 2.2, 0.6],
  [-4.4, -2.2, 0.6],
  [0.0, -2.9, -0.3],
  [4.4, -2.2, -0.6],
];

// Detail: orbital params
const D_R = [2.2, 3.4, 4.6];
const D_SPEED = [0.26, 0.16, 0.1];
const D_TILT = [0.12, -0.15, 0.08];

/*  helpers  */

function assignRing(i, total) {
  const perRing = Math.ceil(total / 3);
  return Math.min(Math.floor(i / perRing), 2);
}

function buildDetailPlanets(items) {
  const sorted = [...items].sort((a, b) => b.score - a.score);
  const n = sorted.length;
  const cnt = [0, 0, 0];

  return sorted.map((tech, i) => {
    const ri = assignRing(i, n);
    const pos = cnt[ri]++;
    const inRing = sorted.filter((_, j) => assignRing(j, n) === ri).length;
    const angle0 = (pos / inRing) * Math.PI * 2 + ri * 0.8;

    return {
      name: tech.name,
      icon: tech.icon,
      score: tech.score,
      level: tech.level,
      color: LEVEL_HEX[tech.level] || "#3A4A5A",
      radius: D_R[ri],
      speed: D_SPEED[ri],
      tilt: D_TILT[ri],
      angle0,
      size: 0.08 + (tech.score / 100) * 0.14,
      ringIdx: ri,
    };
  });
}

/*  Overview Sun */

function OverviewSun({ position, label, onClick, index }) {
  const meshRef = useRef();
  const phase = useMemo(() => index * 1.05, [index]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.18;
    meshRef.current.material.emissiveIntensity =
      0.7 + Math.sin(t * 1.8 + phase) * 0.25;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry args={[0.22, 28, 28]} />
      <meshStandardMaterial
        color="#3EFFC2"
        emissive="#3EFFC2"
        emissiveIntensity={0.7}
      />
      {/* Point light */}
      <pointLight intensity={1.6} distance={3.5} color="#3EFFC2" decay={2} />

      {/* Label — always visible */}
      <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginTop: 36,
          }}
        >
          <div
            style={{
              fontFamily: '"Geist Mono","Courier New",monospace',
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(62,255,194,0.85)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label
              .toUpperCase()
              .replace("AI & ML", "AI & ML")
              .replace("Cloud & DevOps", "Cloud")}
          </div>
          <div
            style={{
              fontFamily: '"Geist Mono","Courier New",monospace',
              fontSize: 8,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            Click to explore
          </div>
        </div>
      </Html>
    </mesh>
  );
}

/*  Detail: Orbit ring  */

function DetailRing({ radius, tilt }) {
  const rot = useMemo(
    () => new THREE.Euler(Math.PI / 2 + tilt, 0, tilt * 0.4),
    [tilt],
  );
  return (
    <mesh rotation={rot}>
      <torusGeometry args={[radius, 0.008, 8, 90]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </mesh>
  );
}

/*  Detail: Planet  */

function DetailPlanet({ data }) {
  const groupRef = useRef();
  const color = useMemo(() => new THREE.Color(data.color), [data.color]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const a = data.angle0 + t * data.speed;
    const R = data.radius;
    groupRef.current.position.set(
      Math.cos(a) * R,
      Math.sin(a) * R * Math.sin(data.tilt),
      Math.sin(a) * R * Math.cos(data.tilt),
    );
  });

  return (
    <group ref={groupRef}>
      {/* Glowing orb behind logo — catches Bloom */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glow ring — also blooms */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Actual logo card */}
      <Html center distanceFactor={4.5} style={{ pointerEvents: "none" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
          }}
        >
          {/* Logo box */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "rgba(8,8,8,0.94)",
              backdropFilter: "blur(12px)",
              border: `1.5px solid ${data.color}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 11,
              boxShadow: `
              0 0 18px ${data.color}30,
              0 0 40px ${data.color}15,
              0 8px 28px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.06)
            `,
            }}
          >
            <img
              src={data.icon}
              alt={data.name}
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Name + score pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(8,8,8,0.88)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 6,
              padding: "3px 8px",
            }}
          >
            <span
              style={{
                fontFamily: '"Geist Mono","Courier New",monospace',
                fontSize: 10.5,
                color: "#D0D0D0",
                letterSpacing: "0.03em",
                fontWeight: 500,
              }}
            >
              {data.name}
            </span>
            <span
              style={{
                fontFamily: '"Geist Mono","Courier New",monospace',
                fontSize: 9.5,
                color: data.color,
                fontWeight: 700,
              }}
            >
              {data.score}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

/* Detail: Full solar system */

function DetailSystem({ category }) {
  const planets = useMemo(() => buildDetailPlanets(category.items), [category]);
  const rings = useMemo(
    () => [...new Set(planets.map((p) => p.ringIdx))].sort(),
    [planets],
  );
  const sunRef = useRef();

  useFrame(({ clock }) => {
    if (sunRef.current) {
      sunRef.current.material.emissiveIntensity =
        0.9 + Math.sin(clock.getElapsedTime() * 1.6) * 0.2;
    }
  });

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#3EFFC2"
          emissive="#3EFFC2"
          emissiveIntensity={0.9}
        />
      </mesh>
      <pointLight intensity={2.5} distance={8} color="#3EFFC2" decay={2} />

      {/* Sun label */}
      <Html
        center
        distanceFactor={9}
        position={[0, 0.5, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            fontFamily: '"Clash Display","sans-serif"',
            fontSize: 13,
            fontWeight: 700,
            color: "#3EFFC2",
            letterSpacing: "-0.01em",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {category.label}
        </div>
      </Html>

      {/* Orbit rings */}
      {rings.map((ri) => (
        <DetailRing key={ri} radius={D_R[ri]} tilt={D_TILT[ri]} />
      ))}

      {/* Planets */}
      {planets.map((p) => (
        <DetailPlanet key={p.name} data={p} />
      ))}
    </group>
  );
}

/*  Overview: all 6 suns  */

function Overview({ onSelect }) {
  return (
    <>
      {techCategories.map((cat, i) => (
        <OverviewSun
          key={cat.key}
          position={OVERVIEW_POS[i] || [0, 0, 0]}
          label={cat.label}
          index={i}
          onClick={() => onSelect(cat.key)}
        />
      ))}
    </>
  );
}

/*  Main export  */

export function TechGlobe({ selectedKey = null, onSelect, onBack }) {
  const selected = selectedKey;
  const selectedCat = techCategories.find((c) => c.key === selected);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 400, md: 520 },
      }}
    >
      <Canvas
        camera={{ position: [0, 2.5, 12], fov: 52 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 1.8]}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 8, 5]} intensity={0.3} />

        <Stars
          radius={60}
          depth={40}
          count={selected ? 800 : 1600}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />

        <Suspense fallback={null}>
          {selected && selectedCat ? (
            <DetailSystem category={selectedCat} />
          ) : (
            <Overview onSelect={onSelect} />
          )}
        </Suspense>

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.08}
            luminanceSmoothing={0.9}
            intensity={selected ? 1.6 : 1.2}
            mipmapBlur
          />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={selected ? 0.5 : 0.25}
          rotateSpeed={0.45}
          dampingFactor={0.1}
          enableDamping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.72}
        />
      </Canvas>

      {/* Vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 42%, #141414 88%)",
        }}
      />

      {/* Back button */}
      {selected && (
        <Box
          onClick={() => onBack(null)}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            background: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(62,255,194,0.3)",
            borderRadius: 1.5,
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "rgba(62,255,194,0.1)",
              borderColor: "#3EFFC2",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: "0.72rem",
              color: "#3EFFC2",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            ← All Categories
          </Typography>
        </Box>
      )}

      {/* Hint text */}
      {!selected && (
        <Box
          sx={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: "0.67rem",
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Click a star to explore · Drag to orbit
          </Typography>
        </Box>
      )}
    </Box>
  );
}

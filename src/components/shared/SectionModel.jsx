"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";
import Box from "@mui/material/Box";
import { useIsMobile } from "@/hooks/useMediaQuery";

const MINT = "#3EFFC2";

function Model({ path, scale }) {
  const { scene } = useGLTF(path);
  const centered = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    clone.position.sub(box.getCenter(new THREE.Vector3()));
    clone.traverse((child) => {
      if (child.isMesh && child.material)
        child.material.side = THREE.DoubleSide;
    });
    return clone;
  }, [scene]);

  const ref = useRef(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={ref} scale={scale}>
      <primitive object={centered} />
    </group>
  );
}

// One small, subtle decorative model tucked into a section corner —
// idle float only, no drift, no scroll-jacking. Skipped on mobile.
export function SectionModel({ path, scale = 1, size = 90, sx = {} }) {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        pointerEvents: "none",
        opacity: 0.5,
        ...sx,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.4, 3], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <ambientLight intensity={1} />
        <pointLight position={[2, 2, 2]} color={MINT} intensity={2} />
        <pointLight position={[0, 0.4, 3]} color="#ffffff" intensity={1} />
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
          <Model path={path} scale={scale} />
        </Float>
      </Canvas>
    </Box>
  );
}

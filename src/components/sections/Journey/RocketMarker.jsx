"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MINT = "#3EFFC2";
const SCALE = 0.55;

// Model ships nose-up along world Y, standing on a launchpad — a
// Z-axis-only spin can't tip that over, it just spins it in place
// (still looks "standing" from any angle). Tipping it onto its side
// needs a rotation around X instead, applied once as a static base
// orientation. If the nose ends up pointing the wrong way after that,
// flip the sign here.
const TIP_ROTATION_X = -Math.PI / 2;

// Nose lands pointing backward relative to travel direction after the
// tip — flip it 180° so it faces forward instead.
const NOSE_FLIP = Math.PI;

// The glb's own materials: mat23 is baked near-black (0.01,0.01,0.01),
// which is why it rendered as a black silhouette regardless of
// lighting — that's the mesh's actual color, not a lighting bug.
// mat5/mat14 are off-palette blue/red. Remap all four to mint/gray so
// it matches the rest of the site instead of the source asset's colors.
const MATERIAL_COLORS = {
  mat23: "#C8C8C8",
  mat21: "#F5F5F5",
  mat5: "#3EFFC2",
  mat14: "#00C896",
};

useGLTF.preload("/models/rocket.glb");

function RocketModel({ angle }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF("/models/rocket.glb");

  // Recenter on the model's actual bounding box (computed once) rather
  // than a hand-measured offset — a fixed offset gets dragged off-axis
  // once the parent group starts rotating every frame.
  const centered = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
        const recolor = MATERIAL_COLORS[child.material.name];
        if (recolor) child.material.color.set(recolor);
      }
    });
    return clone;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Live path-direction spin stays on Z — that's the screen plane
    // the 2D path lives in.
    groupRef.current.rotation.z = -(angle * Math.PI) / 180 + NOSE_FLIP;
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.05;
  });

  return (
    <group ref={groupRef} scale={SCALE}>
      <group rotation={[TIP_ROTATION_X, 0, 0]}>
        <primitive object={centered} />
      </group>
    </group>
  );
}

export function RocketMarker({ angle = 0, size = 96 }) {
  return (
    <Canvas
      // Camera sits (almost) dead-on along Z, the same axis the rocket
      // spins around. An oblique camera made the model foreshorten into
      // a thin sliver at some path angles — this keeps it full-size and
      // consistent at every rotation.
      camera={{ position: [0, 0.35, 2.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: size, height: size, pointerEvents: "none" }}
    >
      <ambientLight intensity={1.2} />
      <pointLight position={[2, 2, 2]} color={MINT} intensity={2.5} />
      <pointLight position={[-2, -1, 1]} color="#ffffff" intensity={0.7} />
      {/* Glued to the camera so whichever face is on-screen is lit */}
      <pointLight position={[0, 0.35, 2.5]} color="#ffffff" intensity={1.5} />
      <RocketModel angle={angle} />
    </Canvas>
  );
}

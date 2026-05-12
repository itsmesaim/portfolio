"use client";
import { useRef, useCallback, useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { floatingIcons } from "@/data/techStack";

function TechIcon({ icon, name, initialPosition }) {
  const bodyRef = useRef(null);
  const texture = useTexture(icon);

  const handleClick = useCallback(() => {
    if (!bodyRef.current) return;
    bodyRef.current.applyImpulse(
      { x: (Math.random() - 0.5) * 6, y: Math.random() * 10 + 4, z: 0 },
      true,
    );
    bodyRef.current.applyTorqueImpulse(
      {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
      },
      true,
    );
  }, []);

  return (
    <RigidBody
      ref={bodyRef}
      position={initialPosition}
      colliders="cuboid"
      restitution={0.45}
      friction={0.5}
      linearDamping={0.2}
    >
      <mesh onClick={handleClick}>
        <planeGeometry args={[0.65, 0.65]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}

export function FloatingIcons() {
  const positions = useMemo(
    () =>
      floatingIcons.map((_, i) => [
        2.5 + (Math.random() - 0.5) * 4,
        5 + i * 0.4 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.6,
      ]),
    [],
  );

  return (
    <>
      <RigidBody type="fixed" position={[0, -3.5, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[20, 0.2, 6]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[8, 0, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[0.2, 20, 6]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      {floatingIcons.map((icon, i) => (
        <TechIcon
          key={icon.name}
          icon={icon.icon}
          name={icon.name}
          initialPosition={positions[i]}
        />
      ))}
    </>
  );
}

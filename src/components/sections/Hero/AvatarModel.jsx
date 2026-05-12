"use client";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

useGLTF.preload("/models/avatar.glb");

export function AvatarModel({ position = [0, -1.4, 0] }) {
  const groupRef = useRef(null);
  const mouse = useMousePosition();

  const { scene, animations } = useGLTF("/models/avatar.glb");
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!names.length) return;

    const idleName =
      names.find((n) => /idle/i.test(n)) ||
      names.find((n) => /wave/i.test(n)) ||
      names[0];

    const action = actions[idleName];
    if (action) action.reset().fadeIn(0.5).play();

    console.log("Avatar animations:", names);

    return () => {
      if (action) action.fadeOut(0.3);
    };
  }, [actions, names]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -mouse.current.x * 0.3,
      0.04,
    );
  });

  return (
    <group ref={groupRef} position={position} dispose={null}>
      <primitive object={scene} scale={1.8} />
    </group>
  );
}

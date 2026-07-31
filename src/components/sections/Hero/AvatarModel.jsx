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
  const playingRef = useRef(false);
  const triggerRef = useRef(() => {});

  const { scene, animations } = useGLTF("/models/avatar.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const idle = actions["Breathing_Idle"];
    const wave = actions["Waving"];
    const dance = actions["Hip Hop Dancing"];
    if (!idle) return;

    idle.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play();

    const mixer = idle.getMixer();

    const playGreeting = () => {
      if (playingRef.current || !wave) return;
      playingRef.current = true;

      idle.fadeOut(0.3);
      wave.reset().setLoop(THREE.LoopOnce, 1);
      wave.clampWhenFinished = true;
      wave.fadeIn(0.3).play();

      const onWaveFinished = (e) => {
        if (e.action !== wave) return;
        mixer.removeEventListener("finished", onWaveFinished);

        if (dance) {
          wave.fadeOut(0.3);
          dance.reset().setLoop(THREE.LoopOnce, 1);
          dance.clampWhenFinished = true;
          // Full-speed clip reads as frantic on this rig — slow it down.
          dance.timeScale = 0.55;
          dance.fadeIn(0.3).play();

          const onDanceFinished = (e2) => {
            if (e2.action !== dance) return;
            mixer.removeEventListener("finished", onDanceFinished);
            dance.fadeOut(0.4);
            idle.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.4).play();
            playingRef.current = false;
          };
          mixer.addEventListener("finished", onDanceFinished);
        } else {
          wave.fadeOut(0.3);
          idle.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play();
          playingRef.current = false;
        }
      };
      mixer.addEventListener("finished", onWaveFinished);
    };

    triggerRef.current = playGreeting;

    return () => {
      idle.fadeOut(0.3);
    };
  }, [actions]);

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
      <primitive
        object={scene}
        scale={1.8}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          triggerRef.current();
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      />
    </group>
  );
}

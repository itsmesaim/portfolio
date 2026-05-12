"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { AvatarModel } from "./AvatarModel";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function HeroCanvas() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 45 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 4, 3]} color="#3EFFC2" intensity={3.2} />
      <pointLight position={[-3, 1, 4]} color="#ffffff" intensity={0.8} />
      <pointLight position={[0, -2, 3]} color="#FFB347" intensity={0.4} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <AvatarModel position={[isMobile ? 0 : 2.4, -1.4, 0]} />
      </Suspense>

      {!isMobile && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.75}
            luminanceSmoothing={0.9}
            intensity={1.0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

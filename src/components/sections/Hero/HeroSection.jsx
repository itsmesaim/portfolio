"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import { HeroText } from "./HeroText";
import { ScrollHint } from "./ScrollHint";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <HeroFallback /> },
);

function HeroFallback() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 75% 50%, rgba(62,255,194,0.06) 0%, transparent 65%)",
      }}
    />
  );
}

export function HeroSection() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 720,
        overflow: "hidden",
      }}
    >
      <Suspense fallback={<HeroFallback />}>
        <HeroCanvas />
      </Suspense>
      <HeroText />
      <ScrollHint />

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 240,
          background:
            "linear-gradient(to bottom, transparent 0%, #141414 100%)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </Box>
  );
}

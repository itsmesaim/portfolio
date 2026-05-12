"use client";
import { useState, useEffect } from "react";
import { useScroll, useSpring, motion } from "motion/react";

export function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, #3EFFC2, #00C896)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99999,
        boxShadow: "0 0 8px rgba(62,255,194,0.6)",
      }}
    />
  );
}

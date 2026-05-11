"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCursorState } from "@/hooks/useCursorState";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const { state } = useCursorState();

  const dotX = useSpring(cursorX, { damping: 60, stiffness: 600 });
  const dotY = useSpring(cursorY, { damping: 60, stiffness: 600 });
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 160 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 160 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#3EFFC2",
          pointerEvents: "none",
          zIndex: 99999,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(62,255,194,0.7)",
          pointerEvents: "none",
          zIndex: 99998,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHover ? 52 : isClick ? 20 : 34,
          height: isHover ? 52 : isClick ? 20 : 34,
          opacity: isClick ? 0.4 : 1,
          borderColor: isHover ? "rgba(62,255,194,1)" : "rgba(62,255,194,0.7)",
          boxShadow: isHover ? "0 0 16px rgba(62,255,194,0.5)" : "none",
          rotate: isHover ? 45 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </>
  );
}

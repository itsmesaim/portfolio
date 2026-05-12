"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useCursorState } from "@/hooks/useCursorState";

export function MagneticButton({ children, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { setState } = useCursorState();

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setState("default");
      }}
      animate={pos}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ display: "inline-block" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

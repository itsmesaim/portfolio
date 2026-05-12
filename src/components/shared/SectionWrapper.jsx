"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Box from "@mui/material/Box";

export function SectionWrapper({ children, id, sx = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <Box
      component={motion.section}
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      sx={{ position: "relative", zIndex: 1, ...sx }}
    >
      {children}
    </Box>
  );
}

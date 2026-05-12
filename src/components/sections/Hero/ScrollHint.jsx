"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "motion/react";

export function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: 32,
            right: 32,
            zIndex: 25,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: "0.65rem",
              color: "#606060",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 1,
              background: "#3EFFC2",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent, #F5F5F5, transparent)",
                animation: "scroll-line 1.8s ease-in-out infinite",
              },
              "@keyframes scroll-line": {
                "0%": { transform: "translateX(-100%)" },
                "100%": { transform: "translateX(200%)" },
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

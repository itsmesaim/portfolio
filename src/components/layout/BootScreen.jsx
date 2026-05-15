"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Box from "@mui/material/Box";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  fontSize: { xs: "0.75rem", md: "0.9rem" },
  letterSpacing: "0.02em",
  lineHeight: 1.7,
};

const LINES = [
  { text: "$ npm run dev", color: "#F5F5F5", delay: 250 },
  { text: "", color: "#F5F5F5", delay: 100 },
  { text: "> saim-portfolio@1.0.0 dev", color: "#606060", delay: 80 },
  { text: "> next dev -p 3035", color: "#606060", delay: 80 },
  { text: "", color: "#F5F5F5", delay: 100 },
  { text: "   ▲ Next.js 16.2.6 (Turbopack)", color: "#F5F5F5", delay: 200 },
  { text: "   - Local:        http://localhost:3035", color: "#A0A0A0", delay: 80 },
  { text: "   - Network:      http://saimjs.com", color: "#A0A0A0", delay: 80 },
  { text: "", color: "#F5F5F5", delay: 100 },
  { text: " ✓ Ready in 412ms", color: "#3EFFC2", delay: 300 },
  { text: " ✓ Compiled / in 1.2s", color: "#3EFFC2", delay: 200 },
];

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("booted")) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible || lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    const timer = setTimeout(() => {
      setDisplayed((prev) => [...prev, line]);
      setLineIdx((i) => i + 1);
    }, line.delay);
    return () => clearTimeout(timer);
  }, [lineIdx, visible]);

  useEffect(() => {
    if (lineIdx >= LINES.length && visible) {
      const timer = setTimeout(() => {
        if (typeof window !== "undefined") sessionStorage.setItem("booted", "1");
        setVisible(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [lineIdx, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#0A0A0A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <Box sx={{
            width: "min(720px, 95vw)",
            background: "#0F0F0F",
            border: "1px solid #1F1F1F",
            borderRadius: 2,
            overflow: "hidden",
          }}>
            {/* Terminal title bar */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #1F1F1F",
              background: "#141414",
            }}>
              <Box sx={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
              <Box sx={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E" }} />
              <Box sx={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
              <Box sx={{
                ml: 2,
                ...mono,
                color: "#606060",
                fontSize: "0.7rem",
              }}>
                saim@portfolio: ~/saim-portfolio
              </Box>
            </Box>

            {/* Terminal body */}
            <Box sx={{ p: 3, minHeight: 280 }}>
              {displayed.map((line, i) => (
                <Box key={i} sx={{ ...mono, color: line.color, minHeight: "1.4em" }}>
                  {line.text || "\u00A0"}
                </Box>
              ))}

              {/* Blinking cursor */}
              {lineIdx < LINES.length && (
                <Box sx={{ display: "inline-block" }}>
                  <Box component="span" sx={{
                    display: "inline-block",
                    width: 8,
                    height: 16,
                    background: "#3EFFC2",
                    verticalAlign: "middle",
                    animation: "blink 0.7s steps(1) infinite",
                    "@keyframes blink": {
                      "50%": { opacity: 0 },
                    },
                  }} />
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
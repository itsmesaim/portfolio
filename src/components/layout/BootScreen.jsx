"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LINES = [
  { text: "$ initializing portfolio runtime", delay: 50 },
  { text: "$ loading three.js scene...", delay: 60 },
  { text: "$ compiling motion timelines...", delay: 50 },
  { text: "$ establishing neural background...", delay: 60 },
  { text: "$ mounting react components...", delay: 40 },
  { text: "$ ready.", delay: 80 },
];

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  fontSize: "0.9rem",
  letterSpacing: "0.04em",
};

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [completed, setCompleted] = useState([]);
  const [progress, setProgress] = useState(0);

  // Skip if already seen this session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("booted")) {
      setVisible(false);
    }
  }, []);

  // Type out lines one at a time
  useEffect(() => {
    if (!visible || lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    let charIdx = 0;

    const type = () => {
      if (charIdx <= line.text.length) {
        setTyped(line.text.slice(0, charIdx));
        charIdx++;
        setTimeout(type, line.delay / 2);
      } else {
        setCompleted((prev) => [...prev, line.text]);
        setTyped("");
        setProgress(((lineIdx + 1) / LINES.length) * 100);
        setTimeout(() => setLineIdx((i) => i + 1), 150);
      }
    };
    type();
  }, [lineIdx, visible]);

  // Exit after all lines done
  useEffect(() => {
    if (lineIdx >= LINES.length && visible) {
      const timer = setTimeout(() => {
        if (typeof window !== "undefined")
          sessionStorage.setItem("booted", "1");
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lineIdx, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0A0A0A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "min(560px, 90vw)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              px: 3,
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#3EFFC2",
                  boxShadow: "0 0 12px #3EFFC2",
                  animation: "pulse-dot 1s ease-in-out infinite",
                }}
              />
              <Typography
                sx={{
                  ...mono,
                  color: "#3EFFC2",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.7rem",
                }}
              >
                SK.OS · v4.0
              </Typography>
            </Box>

            {/* Completed lines */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                minHeight: 180,
              }}
            >
              {completed.map((line, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <Typography sx={{ ...mono, color: "#606060", flex: 1 }}>
                    {line}
                  </Typography>
                  <Typography
                    sx={{ ...mono, color: "#3EFFC2", fontSize: "0.75rem" }}
                  >
                    [ OK ]
                  </Typography>
                </Box>
              ))}

              {/* Currently typing */}
              {lineIdx < LINES.length && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ ...mono, color: "#F5F5F5" }}>
                    {typed}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: 8,
                        height: 16,
                        background: "#3EFFC2",
                        ml: 0.5,
                        verticalAlign: "middle",
                        animation: "blink 0.7s steps(1) infinite",
                        "@keyframes blink": {
                          "50%": { opacity: 0 },
                        },
                      }}
                    />
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Progress bar */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ ...mono, color: "#404040", fontSize: "0.7rem" }}
                >
                  LOADING
                </Typography>
                <Typography
                  sx={{ ...mono, color: "#3EFFC2", fontSize: "0.7rem" }}
                >
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 2,
                  background: "#1F1F1F",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#3EFFC2",
                    boxShadow: "0 0 8px #3EFFC2",
                    transition: "width 0.4s ease",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

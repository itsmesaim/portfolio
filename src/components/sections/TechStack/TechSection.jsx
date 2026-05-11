"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "motion/react";
import { techCategories } from "@/data/techStack";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useCursorState } from "@/hooks/useCursorState";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export function TechSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const { setState } = useCursorState();

  const cp = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("default"),
  };

  return (
    <SectionWrapper
      id="tech"
      sx={{
        pt: { xs: 14, md: 24 },
        pb: { xs: 14, md: 24 },
        px: { xs: 3, md: 5, lg: 6 },
        background:
          "linear-gradient(180deg, transparent 0%, #0F0F0F 50%, transparent 100%)",
      }}
    >
      {/* Section header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 2.5,
          mb: { xs: 6, md: 10 },
          borderBottom: "1px solid #1F1F1F",
          pb: 3,
        }}
      >
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>02</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#606060" }}>The Toolkit</Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
          gap: { xs: 6, md: 10 },
        }}
      >
        {/* Category sidebar */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Typography sx={{ ...mono, color: "#606060", mb: 3 }}>
            Categories
          </Typography>

          {techCategories.map((cat, i) => (
            <Box
              key={cat.label}
              {...cp}
              onClick={() => setActive(i)}
              sx={{
                py: 1.5,
                cursor: "pointer",
                borderTop: "1px solid #1F1F1F",
                "&:last-of-type": { borderBottom: "1px solid #1F1F1F" },
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "padding 0.25s ease",
                "&:hover": { pl: 1 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: "0.65rem",
                  color: active === i ? "#3EFFC2" : "#404040",
                  transition: "color 0.2s ease",
                  minWidth: 18,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Clash Display",sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  color: active === i ? "#F5F5F5" : "#606060",
                  transition: "color 0.25s ease",
                  flex: 1,
                }}
              >
                {cat.label}
              </Typography>
              <Box
                sx={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: "0.65rem",
                  color: active === i ? "#3EFFC2" : "transparent",
                  transition: "color 0.2s ease",
                }}
              >
                →
              </Box>
            </Box>
          ))}
        </Box>

        {/* Active category content */}
        <Box>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Massive category title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 2,
                  mb: { xs: 4, md: 6 },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Clash Display",sans-serif',
                    fontSize: { xs: "3rem", md: "5rem" },
                    fontWeight: 600,
                    color: "#F5F5F5",
                    lineHeight: 0.9,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {techCategories[active].label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Geist Mono",monospace',
                    color: "#404040",
                    fontSize: "0.85rem",
                  }}
                >
                  ({techCategories[active].items.length})
                </Typography>
              </Box>

              {/* Tech list — big, hover-reveals */}
              <Box sx={{ borderTop: "1px solid #1F1F1F" }}>
                {techCategories[active].items.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <Box
                      {...cp}
                      onMouseEnter={() => {
                        setHovered(i);
                        setState("hover");
                      }}
                      onMouseLeave={() => {
                        setHovered(null);
                        setState("default");
                      }}
                      sx={{
                        py: 2.5,
                        borderBottom: "1px solid #1F1F1F",
                        display: "flex",
                        alignItems: "center",
                        cursor: "default",
                        position: "relative",
                        transition: "padding-left 0.3s ease",
                        pl: hovered === i ? 3 : 0,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          width: hovered === i ? 16 : 0,
                          height: 1,
                          background: "#3EFFC2",
                          transform: "translateY(-50%)",
                          transition: "width 0.3s ease",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={tech.icon}
                        alt=""
                        sx={{
                          width: 24,
                          height: 24,
                          objectFit: "contain",
                          flexShrink: 0,
                          opacity: hovered === i ? 1 : 0.5,
                          filter: hovered === i ? "none" : "grayscale(80%)",
                          transition: "all 0.3s ease",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: '"Clash Display",sans-serif',
                          fontWeight: 500,
                          fontSize: { xs: "1.5rem", md: "2rem" },
                          color: hovered === i ? "#F5F5F5" : "#404040",
                          ml: 2.5,
                          flex: 1,
                          transition: "color 0.25s ease",
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {tech.name}
                      </Typography>
                      <Typography
                        sx={{
                          ...mono,
                          color: hovered === i ? "#3EFFC2" : "transparent",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(techCategories[active].items.length).padStart(
                          2,
                          "0",
                        )}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

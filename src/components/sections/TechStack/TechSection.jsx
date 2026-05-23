"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence, useInView } from "motion/react";
import { techCategories } from "@/data/techStack";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useCursorState } from "@/hooks/useCursorState";

const TechGlobe = dynamic(
  () => import("./TechGlobe").then((m) => m.TechGlobe),
  { ssr: false },
);

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontSize: "0.73rem",
};

const LEVEL_COLORS = {
  Expert: "#3EFFC2",
  Strong: "#A0A0A0",
  Working: "#707070",
  Learning: "#FFB347",
};

function ScoreBar({ score, level }) {
  const color = LEVEL_COLORS[level] || "#707070";
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}
    >
      <Box
        sx={{
          width: { xs: 60, md: 80 },
          height: 3,
          background: "#1E1E1E",
          borderRadius: 2,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: `${score}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 2,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: '"Geist Mono",monospace',
          fontSize: "0.72rem",
          color,
          fontWeight: 600,
          minWidth: 22,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {score}
      </Typography>
    </Box>
  );
}

function CodeRow({ tech, idx }) {
  const [hovered, setHovered] = useState(false);
  const { setState } = useCursorState();
  const key = tech.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const levelColor = LEVEL_COLORS[tech.level] || "#707070";

  return (
    <Box
      onMouseEnter={() => {
        setHovered(true);
        setState("hover");
      }}
      onMouseLeave={() => {
        setHovered(false);
        setState("default");
      }}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "20px 16px 1fr auto",
          md: "28px 18px 1fr 60px auto",
        },
        alignItems: "center",
        gap: { xs: 1, md: 1.5 },
        px: { xs: 1, md: 1.5 },
        py: 0.5,
        borderRadius: 0.75,
        background: hovered ? "rgba(62,255,194,0.04)" : "transparent",
        transition: "background 0.2s ease",
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Geist Mono",monospace',
          fontSize: { xs: "0.72rem", md: "0.82rem" },
          lineHeight: 1.9,
          color: "#3A3A3A",
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {idx + 2}
      </Typography>

      <Box
        component="img"
        src={tech.icon}
        alt=""
        sx={{
          width: { xs: 14, md: 16 },
          height: { xs: 14, md: 16 },
          objectFit: "contain",
          opacity: hovered ? 1 : 0.8,
          transition: "opacity 0.2s",
        }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Geist Mono",monospace',
            fontSize: { xs: "0.78rem", md: "0.88rem" },
            lineHeight: 1.9,
            color: "#E0E0E0",
            flexShrink: 0,
          }}
        >
          {key}
        </Typography>
        <Typography
          sx={{
            display: { xs: "none", md: "block" },
            fontFamily: '"Geist Mono",monospace',
            fontSize: "0.75rem",
            color: "#FFB347",
            flexShrink: 0,
          }}
        >
          "{tech.years}"
        </Typography>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            px: 0.75,
            py: 0.1,
            borderRadius: 0.5,
            border: `1px solid ${levelColor}30`,
            background: `${levelColor}0A`,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              ...mono,
              color: levelColor,
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
            }}
          >
            {tech.level}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}
      >
        <ScoreBar score={tech.score} level={tech.level} />
      </Box>

      <ScoreBar score={tech.score} level={tech.level} />
    </Box>
  );
}

function MobileChips({ cat }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {cat.items.map((tech) => {
        const color = LEVEL_COLORS[tech.level] || "#707070";
        return (
          <Box
            key={tech.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.25,
              py: 0.6,
              border: `1px solid ${color}25`,
              borderRadius: 1.5,
              background: `${color}08`,
            }}
          >
            <Box
              component="img"
              src={tech.icon}
              alt=""
              sx={{ width: 13, height: 13, objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: "0.7rem",
                color: "#D0D0D0",
              }}
            >
              {tech.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: "0.65rem",
                color,
                fontWeight: 600,
              }}
            >
              {tech.score}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export function TechSection() {
  // const [active, setActive] = useState(0);
  const [active, setActive] = useState(0);
  const [globeMode, setGlobeMode] = useState("overview"); // "overview" | "detail"
  const editorRef = useRef(null);
  const inView = useInView(editorRef, { once: true });
  const { setState } = useCursorState();
  const cat = techCategories[active];

  return (
    <SectionWrapper
      id="tech"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        px: { xs: 3, md: 5, lg: 6 },
        background:
          "linear-gradient(180deg, transparent 0%, #0E0E0E 50%, transparent 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 2.5,
          mb: { xs: 4, md: 5 },
          borderBottom: "1px solid #1F1F1F",
          pb: 2.5,
        }}
      >
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>02</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#808080" }}>The Toolkit</Typography>
      </Box>

      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 500,
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#F5F5F5",
          }}
        >
          The stack I ship with.{" "}
          <Box
            component="span"
            sx={{ color: "#606060", display: { xs: "none", md: "inline" } }}
          >
            Drag to explore.
          </Box>
        </Typography>
      </Box>

      {/* Globe — desktop only */}
      {/* <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TechGlobe />
      </Box> */}

      <Box sx={{ display: "block" }}>
        <TechGlobe
          selectedKey={
            globeMode === "detail" ? techCategories[active].key : null
          }
          onSelect={(key) => {
            const idx = techCategories.findIndex((c) => c.key === key);
            if (idx >= 0) {
              setActive(idx);
              setGlobeMode("detail");
            }
          }}
          onBack={() => setGlobeMode("overview")}
        />
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3 },
          flexWrap: "wrap",
          mb: { xs: 4, md: 6 },
          mt: { xs: 0, md: 2 },
        }}
      >
        {Object.entries(LEVEL_COLORS).map(([label, color]) => (
          <Box
            key={label}
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: color,
              }}
            />
            <Typography
              sx={{
                ...mono,
                color: "#808080",
                fontSize: "0.67rem",
                textTransform: "none",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            ml: { xs: 0, md: 1 },
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 3,
              borderRadius: 1,
              background: "linear-gradient(to right, #3EFFC2, #1E1E1E)",
            }}
          />
          <Typography
            sx={{
              ...mono,
              color: "#808080",
              fontSize: "0.67rem",
              textTransform: "none",
            }}
          >
            Proficiency / 100
          </Typography>
        </Box>
      </Box>

      {/* Code editor */}
      <Box
        ref={editorRef}
        sx={{
          background: "#0F0F0F",
          border: "1px solid #1F1F1F",
          borderRadius: 2.5,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: { xs: 2, md: 2.5 },
            py: 1.25,
            borderBottom: "1px solid #1F1F1F",
            background: "#161616",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.75 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#FF5F57",
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#FFBD2E",
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#28C840",
              }}
            />
          </Box>
          <Typography
            sx={{
              ...mono,
              fontSize: "0.67rem",
              color: "#707070",
              textTransform: "none",
              letterSpacing: "0.04em",
            }}
          >
            stack.config.ts
          </Typography>
        </Box>

        {/* Tabs with right fade indicator */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #1F1F1F",
              background: "#0F0F0F",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              WebkitOverflowScrolling: "touch",
            }}
          >
            {techCategories.map((c, i) => (
              <Box
                key={c.label}
                onClick={() => {
                  setActive(i);
                  setGlobeMode("detail");
                }}
                onMouseEnter={() => setState("hover")}
                onMouseLeave={() => setState("default")}
                sx={{
                  px: { xs: 1.75, md: 2.25 },
                  py: 1.25,
                  cursor: "pointer",
                  borderRight: "1px solid #1F1F1F",
                  borderBottom:
                    i === active
                      ? "2px solid #3EFFC2"
                      : "2px solid transparent",
                  background: i === active ? "#181818" : "transparent",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": { background: "#161616" },
                }}
              >
                <Typography
                  sx={{
                    ...mono,
                    fontSize: "0.67rem",
                    textTransform: "none",
                    letterSpacing: "0.03em",
                    color: i === active ? "#F5F5F5" : "#606060",
                    transition: "color 0.2s ease",
                  }}
                >
                  {c.key}.ts
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Right fade — signals more tabs exist */}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background: "linear-gradient(to left, #0F0F0F, transparent)",
              pointerEvents: "none",
              display: { md: "none" },
            }}
          />
        </Box>

        {/* Code body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Box
              sx={{ py: { xs: 1.5, md: 2 }, minHeight: { xs: 300, md: 360 } }}
            >
              {/* Line 1 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "20px 16px 1fr",
                    md: "28px 18px 1fr",
                  },
                  gap: { xs: 1, md: 1.5 },
                  px: { xs: 1, md: 1.5 },
                  mb: 0.25,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Geist Mono",monospace',
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    lineHeight: 1.9,
                    color: "#3A3A3A",
                    textAlign: "right",
                    userSelect: "none",
                  }}
                >
                  1
                </Typography>
                <Box />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.78rem", md: "0.88rem" },
                      lineHeight: 1.9,
                      color: "#A78BFA",
                    }}
                  >
                    const
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.78rem", md: "0.88rem" },
                      lineHeight: 1.9,
                      color: "#60A5FA",
                    }}
                  >
                    {cat.key}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.78rem", md: "0.88rem" },
                      lineHeight: 1.9,
                      color: "#707070",
                    }}
                  >
                    =
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.78rem", md: "0.88rem" },
                      lineHeight: 1.9,
                      color: "#E8E8E8",
                    }}
                  >
                    {"{"}
                  </Typography>
                </Box>
              </Box>

              {/* Mobile chips */}
              <Box sx={{ display: { xs: "block", sm: "none" }, px: 1 }}>
                <MobileChips cat={cat} />
              </Box>

              {/* Desktop rows */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {cat.items.map((tech, i) => (
                  <motion.div
                    key={`${active}-${tech.name}`}
                    initial={inView ? { opacity: 0, x: -8 } : false}
                    animate={inView ? { opacity: 1, x: 0 } : false}
                    transition={{ delay: 0.04 + i * 0.035, duration: 0.28 }}
                  >
                    <CodeRow tech={tech} idx={i} />
                  </motion.div>
                ))}
              </Box>

              {/* Closing line */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "20px 16px 1fr",
                    md: "28px 18px 1fr",
                  },
                  gap: { xs: 1, md: 1.5 },
                  px: { xs: 1, md: 1.5 },
                  mt: 0.25,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Geist Mono",monospace',
                    fontSize: { xs: "0.78rem", md: "0.88rem" },
                    lineHeight: 1.9,
                    color: "#3A3A3A",
                    textAlign: "right",
                    userSelect: "none",
                  }}
                >
                  {cat.items.length + 2}
                </Typography>
                <Box />
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.78rem", md: "0.88rem" },
                      lineHeight: 1.9,
                      color: "#E8E8E8",
                    }}
                  >
                    {"};"}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: { xs: "0.72rem", md: "0.82rem" },
                      lineHeight: 1.9,
                      color: "#4A4A4A",
                      fontStyle: "italic",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    // {cat.items.length} tools · {cat.summary}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Status bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 2.5 },
            py: 0.75,
            borderTop: "1px solid #1F1F1F",
            background: "#0B0B0B",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              {/* <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#3EFFC2",
                  boxShadow: "0 0 6px #3EFFC2",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              /> */}
              <Typography
                sx={{ ...mono, color: "#707070", fontSize: "0.63rem" }}
              >
                Saved
              </Typography>
            </Box>
            <Typography
              sx={{
                ...mono,
                color: "#4A4A4A",
                fontSize: "0.63rem",
                textTransform: "none",
              }}
            >
              TypeScript · UTF-8
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                ...mono,
                color: "#4A4A4A",
                fontSize: "0.63rem",
                textTransform: "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              {cat.items.length} tools selected
            </Typography>
            <Typography
              sx={{
                ...mono,
                color: "#4A4A4A",
                fontSize: "0.63rem",
                textTransform: "none",
              }}
            >
              Ln {cat.items.length + 2}
            </Typography>
          </Box>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

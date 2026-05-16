"use client";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence, useInView } from "motion/react";
import { techCategories } from "@/data/techStack";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useCursorState } from "@/hooks/useCursorState";
import { TechMarquee } from "./TechMarquee";

const mono = {
  fontFamily: '"Geist Mono","JetBrains Mono","Courier New",monospace',
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontSize: "0.78rem",
};

const codeMono = {
  fontFamily: '"Geist Mono","JetBrains Mono","Courier New",monospace',
  fontSize: { xs: "0.82rem", md: "0.92rem" },
  lineHeight: 1.85,
  letterSpacing: "0.01em",
};

const KEY_TO_CAT = [
  "frontend",
  "backend",
  "aiml",
  "databases",
  "cloud",
  "realtime",
];

const LEVEL_META = {
  expert: { color: "#3EFFC2", comment: "daily" },
  strong: { color: "#A0A0A0", comment: "production" },
  working: { color: "#808080", comment: "hands-on" },
  learning: { color: "#FFB347", comment: "exploring" },
};

function CodeLine({ tech, idx, catKey, animate }) {
  const meta = LEVEL_META[tech.level] || LEVEL_META.working;
  const key = tech.name.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <motion.div
      initial={animate ? { opacity: 0, x: -10 } : false}
      animate={animate ? { opacity: 1, x: 0 } : false}
      transition={{ delay: 0.15 + idx * 0.04, duration: 0.3 }}
      style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 8 }}
    >
      {/* Line number */}
      <Typography
        sx={{
          ...codeMono,
          color: "#3A3A3A",
          minWidth: 28,
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {idx + 2}
      </Typography>

      {/* Code content */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box
          component="img"
          src={tech.icon}
          alt=""
          sx={{
            width: 18,
            height: 18,
            objectFit: "contain",
            flexShrink: 0,
            opacity: 0.95,
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        <Typography sx={{ ...codeMono, color: "#E8E8E8", flexShrink: 0 }}>
          {key}
        </Typography>

        <Typography sx={{ ...codeMono, color: "#606060" }}>:</Typography>

        <Typography
          sx={{ ...codeMono, color: "#FFB347", whiteSpace: "nowrap" }}
        >
          "{tech.years}"
        </Typography>

        <Typography sx={{ ...codeMono, color: "#606060" }}>,</Typography>

        <Typography
          sx={{
            ...codeMono,
            color: "#4A4A4A",
            ml: { xs: 1, md: 3 },
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}
        >
          //{" "}
          <Box component="span" sx={{ color: meta.color, fontStyle: "normal" }}>
            {tech.level}
          </Box>{" "}
          · {meta.comment}
        </Typography>
      </Box>
    </motion.div>
  );
}

export function TechSection() {
  const [active, setActive] = useState(0);
  const [hasAnimated, setHasAnimated] = useState({});
  const editorRef = useRef(null);
  const inView = useInView(editorRef, { once: true, margin: "-100px" });
  const { setState } = useCursorState();
  const cat = techCategories[active];
  const catKey = KEY_TO_CAT[active] || "stack";

  useEffect(() => {
    if (inView && !hasAnimated[active]) {
      setHasAnimated((prev) => ({ ...prev, [active]: true }));
    }
  }, [inView, active, hasAnimated]);

  const shouldAnimate = inView && !hasAnimated[active];

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
      {/* Section header */}
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

      {/* Tech marquee */}
      <TechMarquee />

      {/* Headline */}
      <Box sx={{ mb: { xs: 5, md: 6 }, maxWidth: 900 }}>
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
          <Box component="span" sx={{ color: "#707070" }}>
            Inspect any file.
          </Box>
        </Typography>
      </Box>

      {/* Code editor window */}
      <Box
        ref={editorRef}
        sx={{
          background: "#0F0F0F",
          border: "1px solid #1F1F1F",
          borderRadius: 2.5,
          overflow: "hidden",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(62,255,194,0.04)",
        }}
      >
        {/* Title bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2.5,
            py: 1.5,
            borderBottom: "1px solid #1F1F1F",
            background: "#161616",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mr: 2.5 }}>
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#FF5F57",
              }}
            />
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#FFBD2E",
              }}
            />
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#28C840",
              }}
            />
          </Box>
          <Typography
            sx={{
              ...mono,
              fontSize: "0.7rem",
              color: "#909090",
              textTransform: "none",
              letterSpacing: "0.04em",
            }}
          >
            ~/saim-portfolio/src/
            <Box component="span" sx={{ color: "#E8E8E8" }}>
              stack.config.ts
            </Box>
          </Typography>
        </Box>

        {/* Tab bar */}
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #1F1F1F",
            background: "#0F0F0F",
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {techCategories.map((c, i) => (
            <Box
              key={c.label}
              onClick={() => setActive(i)}
              onMouseEnter={() => setState("hover")}
              onMouseLeave={() => setState("default")}
              sx={{
                px: 2.5,
                py: 1.5,
                cursor: "pointer",
                borderRight: "1px solid #1F1F1F",
                borderBottom:
                  i === active ? "2px solid #3EFFC2" : "2px solid transparent",
                background: i === active ? "#181818" : "transparent",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                "&:hover": { background: "#161616" },
              }}
            >
              <Typography
                sx={{
                  ...mono,
                  fontSize: "0.72rem",
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  color: i === active ? "#F5F5F5" : "#808080",
                  transition: "color 0.2s ease",
                }}
              >
                {c.label.toLowerCase().replace(/\s+/g, "")}.ts
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Code body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                py: 3,
                minHeight: { xs: 360, md: 420 },
                fontFamily: '"Geist Mono",monospace',
              }}
            >
              {/* Line 1: const declaration */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, pl: 1 }}
              >
                <Typography
                  sx={{
                    ...codeMono,
                    color: "#3A3A3A",
                    minWidth: 28,
                    textAlign: "right",
                    userSelect: "none",
                  }}
                >
                  1
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 1.5,
                  }}
                >
                  <Typography sx={{ ...codeMono, color: "#A78BFA" }}>
                    const
                  </Typography>
                  <Typography sx={{ ...codeMono, color: "#60A5FA" }}>
                    {catKey}
                  </Typography>
                  <Typography sx={{ ...codeMono, color: "#606060" }}>
                    =
                  </Typography>
                  <Typography sx={{ ...codeMono, color: "#E8E8E8" }}>
                    {"{"}
                  </Typography>
                </Box>
              </Box>

              {/* Tech rows */}
              {cat.items.map((tech, i) => (
                <CodeLine
                  key={`${active}-${tech.name}`}
                  tech={tech}
                  idx={i}
                  catKey={catKey}
                  animate={shouldAnimate}
                />
              ))}

              {/* Closing brace + count comment */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  pl: 1,
                  mt: 0.5,
                }}
              >
                <Typography
                  sx={{
                    ...codeMono,
                    color: "#3A3A3A",
                    minWidth: 28,
                    textAlign: "right",
                    userSelect: "none",
                  }}
                >
                  {cat.items.length + 2}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 1.5,
                  }}
                >
                  <Typography sx={{ ...codeMono, color: "#E8E8E8" }}>
                    {"};"}
                  </Typography>
                  <Typography
                    sx={{
                      ...codeMono,
                      color: "#4A4A4A",
                      ml: 2,
                      fontStyle: "italic",
                    }}
                  >
                    // {cat.items.length}{" "}
                    {cat.items.length === 1 ? "tool" : "tools"} · {cat.summary}
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
            px: 2.5,
            py: 1,
            borderTop: "1px solid #1F1F1F",
            background: "#0B0B0B",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              {/* <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#3EFFC2",
                  boxShadow: "0 0 6px #3EFFC2",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} */}
              {/* /> */}
              {/* <Typography
                sx={{ ...mono, color: "#909090", fontSize: "0.65rem" }}
              >
                Saved
              </Typography> */}
            </Box>
            <Typography
              sx={{
                ...mono,
                color: "#606060",
                fontSize: "0.65rem",
                textTransform: "none",
              }}
            >
              TypeScript · UTF-8 · LF
            </Typography>
          </Box>
          <Typography
            sx={{
              ...mono,
              color: "#606060",
              fontSize: "0.65rem",
              textTransform: "none",
            }}
          >
            Ln {cat.items.length + 2} · Col 2
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

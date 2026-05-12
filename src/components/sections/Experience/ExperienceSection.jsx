"use client";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useInView } from "motion/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { personal } from "@/data/personal";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

function LogEntry({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
        gap: { xs: 2, md: 6 },
        py: { xs: 5, md: 7 },
        borderTop: "1px solid #1F1F1F",
        position: "relative",
      }}
    >
      {/* Left: meta */}
      <Box>
        <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
          {item.period}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ ...mono, color: "#606060" }}>
            {item.type}
          </Typography>
          {item.current && (
            <>
              <Box
                sx={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#606060",
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#3EFFC2",
                    boxShadow: "0 0 6px #3EFFC2",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                <Typography sx={{ ...mono, color: "#3EFFC2" }}>
                  Active
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Right: title + bullets */}
      <Box>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 600,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#F5F5F5",
            mb: 0.5,
          }}
        >
          {item.role}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Satoshi",sans-serif',
            color: "#606060",
            fontSize: "1rem",
            mb: 3,
          }}
        >
          @ {item.company}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {item.highlights.map((h, i) => (
            <Box
              key={i}
              sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <Typography
                sx={{ ...mono, color: "#404040", flexShrink: 0, mt: 0.5 }}
              >
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  lineHeight: 1.65,
                  fontSize: "0.95rem",
                  flex: 1,
                }}
              >
                {h}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function ExperienceSection() {
  return (
    <SectionWrapper
      id="experience"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        px: { xs: 3, md: 5, lg: 6 },
        background:
          "linear-gradient(180deg, transparent 0%, #0F0F0F 50%, transparent 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 2.5,
          mb: { xs: 5, md: 7 },
          borderBottom: "1px solid #1F1F1F",
          pb: 3,
        }}
      >
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>04</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#606060" }}>
          The Trajectory
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 5, md: 7 }, maxWidth: 900 }}>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#F5F5F5",
          }}
        >
          The path so far.{" "}
          <Box component="span" sx={{ color: "#606060" }}>
            Freelance to internships to the next thing.
          </Box>
        </Typography>
      </Box>

      <Box sx={{ borderBottom: "1px solid #1F1F1F" }}>
        {personal.experience.map((item, i) => (
          <LogEntry key={item.id} item={item} index={i} />
        ))}
      </Box>

      {/* Education footer block */}
      <Box sx={{ mt: { xs: 8, md: 12 } }}>
        <Typography sx={{ ...mono, color: "#606060", mb: 3 }}>
          Education
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {personal.education.map((edu) => (
            <Box
              key={edu.degree}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid #1F1F1F",
                background: "rgba(28,28,28,0.4)",
                "&:hover": { borderColor: "rgba(62,255,194,0.3)" },
                transition: "border-color 0.3s ease",
              }}
            >
              <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
                {edu.period}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Clash Display",sans-serif',
                  color: "#F5F5F5",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {edu.degree}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  fontSize: "0.9rem",
                }}
              >
                {edu.institution} · {edu.location}
                {edu.grade && ` · ${edu.grade}`}
              </Typography>
              {edu.honours && (
                <Typography sx={{ ...mono, color: "#3EFFC2", mt: 1.5 }}>
                  {edu.honours}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
}

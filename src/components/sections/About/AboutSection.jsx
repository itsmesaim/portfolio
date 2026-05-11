"use client";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useInView } from "motion/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { personal } from "@/data/personal";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

function Counter({ value, label, idx }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        py: 3,
        pr: 3,
        borderLeft: "1px solid #2E2E2E",
        pl: 3,
        "&:first-of-type": { borderLeft: "1px solid transparent", pl: 0 },
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Clash Display",sans-serif',
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          fontWeight: 600,
          color: "#F5F5F5",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          mb: 1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ ...mono, color: "#606060" }}>{label}</Typography>
    </Box>
  );
}

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      sx={{
        pt: { xs: 14, md: 24 },
        pb: { xs: 14, md: 24 },
        px: { xs: 3, md: 5, lg: 6 },
      }}
    >
      {/* Section header — number + dash */}
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
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>01</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#606060" }}>The Engineer</Typography>
      </Box>

      {/* Massive headline */}
      <Box sx={{ mb: { xs: 8, md: 12 }, maxWidth: 1200 }}>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#F5F5F5",
          }}
        >
          Four years building things people actually use —{" "}
          <Box component="span" sx={{ color: "#606060" }}>
            from production video platforms to ML pipelines to billing systems
            running real cafes.
          </Box>
        </Typography>
      </Box>

      {/* Two-column body */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 5, md: 8 },
          mb: { xs: 8, md: 10 },
        }}
      >
        <Box>
          <Typography sx={{ ...mono, color: "#606060", mb: 2 }}>
            What I Do
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Satoshi",sans-serif',
              color: "#A0A0A0",
              lineHeight: 1.75,
              fontSize: "1.05rem",
            }}
          >
            Full-stack engineering across React, TypeScript, Spring Boot,
            FastAPI, and Go. Real-time systems with WebRTC + LiveKit. AI
            integrations with LangChain and LangSmith. I pick up new stacks fast
            and ship production code within weeks, not months.
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ ...mono, color: "#606060", mb: 2 }}>
            Currently
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Satoshi",sans-serif',
              color: "#A0A0A0",
              lineHeight: 1.75,
              fontSize: "1.05rem",
            }}
          >
            Finishing my MSc in Computing at Griffith Dublin while shipping{" "}
            <Box
              component="a"
              href={personal.social.live}
              target="_blank"
              rel="noopener"
              sx={{
                color: "#3EFFC2",
                textDecoration: "none",
                borderBottom: "1px solid rgba(62,255,194,0.4)",
                "&:hover": { borderBottomColor: "#3EFFC2" },
              }}
            >
              MeetX
            </Box>
            — a real-time video platform with LangChain-powered transcription,
            AI summaries, and an in-meeting Q&A chatbot.
          </Typography>
        </Box>
      </Box>

      {/* Counter row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          borderTop: "1px solid #1F1F1F",
          borderBottom: "1px solid #1F1F1F",
        }}
      >
        {personal.stats.map((s, i) => (
          <Counter key={s.label} value={s.value} label={s.label} idx={i} />
        ))}
      </Box>
    </SectionWrapper>
  );
}

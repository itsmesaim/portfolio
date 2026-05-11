"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper
      id="projects"
      sx={{
        pt: { xs: 14, md: 24 },
        pb: { xs: 14, md: 24 },
        px: { xs: 3, md: 5, lg: 6 },
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
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>03</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#606060" }}>The Work</Typography>
      </Box>

      <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 900 }}>
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
          Selected work.{" "}
          <Box component="span" sx={{ color: "#606060" }}>
            Real systems for real users.
          </Box>
        </Typography>
      </Box>

      <Box>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
        ))}
      </Box>

      <ProjectModal
        project={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      />
    </SectionWrapper>
  );
}

"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionModel } from "@/components/shared/SectionModel";

const visibleProjects = projects.filter((p) => p.hasImages);
const hiddenProjects = projects.filter((p) => !p.hasImages);

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? projects : visibleProjects;

  return (
    <SectionWrapper
      id="projects"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        px: { xs: 3, md: 5, lg: 6 },
      }}
    >
      <SectionModel
        path="/models/orb.glb"
        scale={0.5}
        sx={{ top: 24, right: { xs: 24, md: 64 } }}
      />

      {/* Section header */}
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
        {shown.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />
        ))}
      </Box>

      {!showAll && hiddenProjects.length > 0 && (
        <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
          <Typography
            component="button"
            onClick={() => setShowAll(true)}
            sx={{
              ...mono,
              fontSize: "0.75rem",
              color: "#606060",
              background: "none",
              border: "1px solid #2E2E2E",
              borderRadius: "999px",
              px: 3,
              py: 1.2,
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
              "&:hover": { color: "#3EFFC2", borderColor: "#3EFFC2" },
            }}
          >
            Show {hiddenProjects.length} more projects
          </Typography>
        </Box>
      )}

      <ProjectModal
        project={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      />
    </SectionWrapper>
  );
}

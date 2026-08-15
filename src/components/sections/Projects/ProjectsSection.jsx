"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { projects, clientWork } from "@/data/projects";
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
          component="h2"
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

      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          p: { xs: 3, md: 4 },
          border: "1px solid #1F1F1F",
          borderRadius: 2,
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              background: "#60A5FA",
              flexShrink: 0,
            }}
          />
          <Typography sx={{ ...mono, color: "#60A5FA" }}>
            Client Work
          </Typography>
          <Box sx={{ width: 1, height: 10, background: "#2E2E2E" }} />
          <Typography sx={{ ...mono, color: "#606060" }}>
            {clientWork.period}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 600,
            fontSize: { xs: "1.6rem", md: "2rem" },
            letterSpacing: "-0.03em",
            color: "#F5F5F5",
            mb: 1.5,
          }}
        >
          {clientWork.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Satoshi",sans-serif',
            color: "#A0A0A0",
            lineHeight: 1.7,
            fontSize: { xs: "0.95rem", md: "1rem" },
            maxWidth: 720,
            mb: 2.5,
          }}
        >
          {clientWork.blurb}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2.5 }}>
          {clientWork.highlights.map((item) => (
            <Box
              key={item}
              sx={{
                px: 1.25,
                py: 0.5,
                border: "1px solid #2E2E2E",
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ ...mono, fontSize: "0.62rem", color: "#808080" }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          component="a"
          href="#experience"
          sx={{
            ...mono,
            fontSize: "0.7rem",
            color: "#3EFFC2",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Full freelance log →
        </Typography>
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

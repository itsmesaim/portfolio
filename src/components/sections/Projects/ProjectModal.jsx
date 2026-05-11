"use client";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

const STATUS_CONFIG = {
  live: { color: "#3EFFC2", label: "Live" },
  "in-progress": { color: "#FFB347", label: "In Progress" },
  academic: { color: "#A78BFA", label: "Research" },
  client: { color: "#60A5FA", label: "Client" },
};

export function ProjectModal({ project, open, onClose }) {
  if (!project) return null;
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG["live"];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            background: "#0F0F0F",
            border: "1px solid #1F1F1F",
            borderRadius: "16px",
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
        {/* Top row: status + close */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: status.color,
                boxShadow: `0 0 8px ${status.color}`,
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <Typography sx={{ ...mono, color: status.color }}>
              {status.label}
            </Typography>
            <Box sx={{ width: 1, height: 12, background: "#2E2E2E" }} />
            <Typography sx={{ ...mono, color: "#606060" }}>
              {project.tagline}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: "#A0A0A0",
              border: "1px solid #2E2E2E",
              borderRadius: 1,
              width: 32,
              height: 32,
              "&:hover": {
                background: "rgba(62,255,194,0.1)",
                color: "#3EFFC2",
                borderColor: "#3EFFC2",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Massive title */}
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3.5rem" },
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#F5F5F5",
            mb: 4,
          }}
        >
          {project.title}
        </Typography>

        {/* Sections — vertical stack */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
              Why I Built It
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Satoshi",sans-serif',
                color: "#A0A0A0",
                lineHeight: 1.75,
                fontSize: "1rem",
              }}
            >
              {project.whyBuilt}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
              How I Built It
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Satoshi",sans-serif',
                color: "#A0A0A0",
                lineHeight: 1.75,
                fontSize: "1rem",
              }}
            >
              {project.howBuilt}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
              Full Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {project.stack.map((tech, i) => (
                <Typography
                  key={tech}
                  sx={{
                    ...mono,
                    color: "#A0A0A0",
                    "&:not(:last-child)::after": {
                      content: '"·"',
                      mx: 1.2,
                      color: "#2E2E2E",
                    },
                  }}
                >
                  {tech}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 5,
            pt: 4,
            borderTop: "1px solid #1F1F1F",
            flexWrap: "wrap",
          }}
        >
          {project.live && (
            <Box
              component="a"
              href={project.live}
              target="_blank"
              rel="noopener"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                py: 1.5,
                background: "#3EFFC2",
                color: "#141414",
                textDecoration: "none",
                borderRadius: 1,
                fontFamily: '"Satoshi",sans-serif',
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "#00C896",
                  transform: "translateY(-1px)",
                  boxShadow: "0 0 20px rgba(62,255,194,0.4)",
                },
              }}
            >
              View Live <OpenInNewIcon sx={{ fontSize: 16 }} />
            </Box>
          )}
          {project.github && (
            <Box
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 3,
                py: 1.5,
                border: "1px solid #2E2E2E",
                color: "#F5F5F5",
                textDecoration: "none",
                borderRadius: 1,
                fontFamily: '"Satoshi",sans-serif',
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#3EFFC2", color: "#3EFFC2" },
              }}
            >
              <GitHubIcon sx={{ fontSize: 18 }} /> Source
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

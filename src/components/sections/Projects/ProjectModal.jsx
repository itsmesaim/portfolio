"use client";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion, AnimatePresence } from "motion/react";

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

function ImageCarousel({ images, title }) {
  const [idx, setIdx] = useState(0);
  const total = images?.length || 0;

  // Auto-advance every 4.5s
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total]);

  if (!total) return null;

  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: "16/10",
        overflow: "hidden",
        borderRadius: 1.5,
        background: "linear-gradient(135deg, #0A1628, #1a3a5c)",
        mb: 4,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </AnimatePresence>

      {/* Counter top-right */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          px: 1.5,
          py: 0.5,
          background: "rgba(13,13,13,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 1,
        }}
      >
        <Typography sx={{ ...mono, fontSize: "0.65rem", color: "#F5F5F5" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Typography>
      </Box>

      {total > 1 && (
        <>
          {/* Prev/Next */}
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(13,13,13,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F5F5F5",
              width: 38,
              height: 38,
              "&:hover": {
                background: "rgba(62,255,194,0.15)",
                borderColor: "#3EFFC2",
                color: "#3EFFC2",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(13,13,13,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F5F5F5",
              width: 38,
              height: 38,
              "&:hover": {
                background: "rgba(62,255,194,0.15)",
                borderColor: "#3EFFC2",
                color: "#3EFFC2",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              px: 1.5,
              py: 1,
              background: "rgba(13,13,13,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 5,
            }}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIdx(i)}
                sx={{
                  width: i === idx ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === idx ? "#3EFFC2" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

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
        {/* Top row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            </Box>
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

        {/* Title */}
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#F5F5F5",
            mb: 4,
          }}
        >
          {project.title}
        </Typography>

        {/* Carousel */}
        {project.images && project.images.length > 0 && (
          <ImageCarousel images={project.images} title={project.title} />
        )}

        {/* Sections */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {project.problem && (
            <Box>
              <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
                The Problem
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  lineHeight: 1.75,
                  fontSize: "1rem",
                }}
              >
                {project.problem}
              </Typography>
            </Box>
          )}

          {project.whatIBuilt && (
            <Box>
              <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
                What I Built
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  lineHeight: 1.75,
                  fontSize: "1rem",
                }}
              >
                {project.whatIBuilt}
              </Typography>
            </Box>
          )}

          {project.unique && (
            <Box>
              <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
                What's Unique
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  lineHeight: 1.75,
                  fontSize: "1rem",
                }}
              >
                {project.unique}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography sx={{ ...mono, color: "#3EFFC2", mb: 1.5 }}>
              Full Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {project.stack.map((tech) => (
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

        {/* Actions */}
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

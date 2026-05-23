"use client";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "motion/react";
import { useCursorState } from "@/hooks/useCursorState";

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

const GRADIENTS = {
  meetx: "linear-gradient(135deg, #0A1628 0%, #1a3a5c 50%, #0A1628 100%)",
  "6g-firewall":
    "linear-gradient(135deg, #1a0a28 0%, #3d1a5c 50%, #1a0a28 100%)",
  "ir-system": "linear-gradient(135deg, #0a1e0a 0%, #1a4a1a 50%, #0a1e0a 100%)",
  cipherhealth:
    "linear-gradient(135deg, #28200a 0%, #5c4a1a 50%, #28200a 100%)",
  "pong-mern": "linear-gradient(135deg, #280a1a 0%, #5c1a3d 50%, #280a1a 100%)",
  "fastapi-f1":
    "linear-gradient(135deg, #280a0a 0%, #5c1a1a 50%, #280a0a 100%)",
  "task-manager":
    "linear-gradient(135deg, #082828 0%, #1a5c5c 50%, #082828 100%)",
  "financial-management":
    "linear-gradient(135deg, #0a280f 0%, #1a5c2a 50%, #0a280f 100%)",
  freelance: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
};

function BlueprintPlaceholder({ project, index }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        zIndex: 0,
      }}
    >
      {/* Grid lines */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(62,255,194,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(62,255,194,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner brackets */}
      {[
        {
          top: 14,
          left: 14,
          borderTop: "1px solid rgba(62,255,194,0.4)",
          borderLeft: "1px solid rgba(62,255,194,0.4)",
        },
        {
          top: 14,
          right: 14,
          borderTop: "1px solid rgba(62,255,194,0.4)",
          borderRight: "1px solid rgba(62,255,194,0.4)",
        },
        {
          bottom: 14,
          left: 14,
          borderBottom: "1px solid rgba(62,255,194,0.4)",
          borderLeft: "1px solid rgba(62,255,194,0.4)",
        },
        {
          bottom: 14,
          right: 14,
          borderBottom: "1px solid rgba(62,255,194,0.4)",
          borderRight: "1px solid rgba(62,255,194,0.4)",
        },
      ].map((style, i) => (
        <Box
          key={i}
          sx={{ position: "absolute", width: 18, height: 18, ...style }}
        />
      ))}

      {/* Big faded number */}
      <Typography
        sx={{
          fontFamily: '"Clash Display",sans-serif',
          fontSize: "clamp(4rem, 10vw, 7rem)",
          fontWeight: 700,
          color: "rgba(62,255,194,0.06)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </Typography>

      {/* Stack chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.75,
          justifyContent: "center",
          px: 3,
          zIndex: 1,
        }}
      >
        {project.stack.slice(0, 5).map((tech) => (
          <Box
            key={tech}
            sx={{
              px: 1.25,
              py: 0.4,
              border: "1px solid rgba(62,255,194,0.12)",
              borderRadius: 1,
              background: "rgba(62,255,194,0.04)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: "0.62rem",
                color: "rgba(62,255,194,0.45)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {tech}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function ProjectCard({ project, index, onClick }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const { setState } = useCursorState();
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG["live"];
  const isAlt = index % 2 === 1;

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => {
        setHovered(true);
        setState("hover");
      }}
      onMouseLeave={() => {
        setHovered(false);
        setState("default");
      }}
      onClick={() => onClick(project)}
      style={{ cursor: "pointer", position: "relative" }}
      whileTap={{ scale: 0.995 }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: isAlt ? "1.2fr 1fr" : "1fr 1.2fr",
          },
          gap: { xs: 4, md: 6 },
          alignItems: "center",
          py: { xs: 4, md: 6 },
          borderTop: "1px solid #1F1F1F",
          position: "relative",
        }}
      >
        {/* Visual */}
        <Box
          sx={{
            order: { xs: 1, md: isAlt ? 2 : 1 },
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            aspectRatio: "16/10",
            background: GRADIENTS[project.id] || GRADIENTS.freelance,
          }}
        >
          {/* Blueprint placeholder — always visible unless image loads */}
          <BlueprintPlaceholder project={project} index={index} />

          {/* Real image — covers placeholder when it loads */}
          <Box
            component="img"
            src={project.images?.[0] || ""}
            alt={project.title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          {/* Spotlight overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(62,255,194,0.15) 0%, transparent 50%)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          />

          {/* Corner number badge */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 3,
              px: 1.5,
              py: 0.5,
              background: "rgba(13,13,13,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 1,
            }}
          >
            <Typography sx={{ ...mono, fontSize: "0.6rem", color: "#F5F5F5" }}>
              {String(index + 1).padStart(2, "0")}
            </Typography>
          </Box>

          {/* View case CTA */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 3,
              px: 2,
              py: 1,
              background: "rgba(13,13,13,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 1,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(8px)",
              transition: "all 0.3s ease",
            }}
          >
            <Typography sx={{ ...mono, fontSize: "0.65rem", color: "#3EFFC2" }}>
              View Case →
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ order: { xs: 2, md: isAlt ? 1 : 2 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
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
            <Box sx={{ width: 1, height: 10, background: "#2E2E2E" }} />
            <Typography sx={{ ...mono, color: "#606060" }}>
              {project.tagline}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 600,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: hovered ? "#3EFFC2" : "#F5F5F5",
              transition: "color 0.3s ease",
              mb: 2.5,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Satoshi",sans-serif',
              color: "#A0A0A0",
              lineHeight: 1.7,
              fontSize: { xs: "0.95rem", md: "1rem" },
              mb: 3,
              maxWidth: 480,
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {project.stack.map((tech) => (
              <Typography
                key={tech}
                sx={{
                  ...mono,
                  color: "#606060",
                  "&:not(:last-child)::after": {
                    content: '"·"',
                    mx: 1,
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
    </motion.div>
  );
}

"use client";
import Box from "@mui/material/Box";
import { techCategories } from "@/data/techStack";

// Flatten all unique tech items
const allTech = techCategories.flatMap((c) => c.items);
const deduped = allTech.filter(
  (item, idx, self) => idx === self.findIndex((t) => t.name === item.name),
);

// Double the list for seamless loop
const doubled = [...deduped, ...deduped];

export function TechMarquee() {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid #1F1F1F",
        borderBottom: "1px solid #1F1F1F",
        py: 3,
        mb: { xs: 6, md: 8 },
        position: "relative",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 5, md: 8 },
          width: "max-content",
          animation: "marquee 50s linear infinite",
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {doubled.map((tech, i) => (
          <Box
            key={`${tech.name}-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexShrink: 0,
              opacity: 0.5,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <Box
              component="img"
              src={tech.icon}
              alt={tech.name}
              sx={{
                width: 28,
                height: 28,
                objectFit: "contain",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <Box
              sx={{
                fontFamily: '"Clash Display",sans-serif',
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "#A0A0A0",
                letterSpacing: "-0.01em",
              }}
            >
              {tech.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

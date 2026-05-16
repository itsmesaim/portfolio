"use client";
import Box from "@mui/material/Box";
import { techCategories } from "@/data/techStack";

const allTech = techCategories.flatMap((c) => c.items);
const deduped = allTech.filter(
  (item, idx, self) => idx === self.findIndex((t) => t.name === item.name),
);
const doubled = [...deduped, ...deduped];

export function TechMarquee() {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid #1F1F1F",
        borderBottom: "1px solid #1F1F1F",
        py: 2.5,
        mb: { xs: 5, md: 7 },
        position: "relative",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 4, md: 6 },
          width: "max-content",
          animation: "marquee 60s linear infinite",
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {doubled.map((tech, i) => (
          <Box
            key={`${tech.name}-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              flexShrink: 0,
              opacity: 0.55,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <Box
              component="img"
              src={tech.icon}
              alt={tech.name}
              sx={{ width: 22, height: 22, objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <Box
              sx={{
                fontFamily: '"Geist Mono","Courier New",monospace',
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "#B8B8B8",
                letterSpacing: "0.02em",
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

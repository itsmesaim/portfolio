import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { AboutSection } from "@/components/sections/About/AboutSection";
import { TechSection } from "@/components/sections/TechStack/TechSection";
import { ProjectsSection } from "@/components/sections/Projects/ProjectsSection";
import { ExperienceSection } from "@/components/sections/Experience/ExperienceSection";
import { ContactSection } from "@/components/sections/Contact/ContactSection";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export default function Home() {
  return (
    <Box component="main" sx={{ position: "relative", zIndex: 1, pt: "44px" }}>
      <HeroSection />
      <AboutSection />
      <TechSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />

      <Box
        component="footer"
        sx={{
          borderTop: "1px solid #1F1F1F",
          py: { xs: 4, md: 5 },
          px: { xs: 3, md: 5, lg: 6 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {/* Left: logo + copyright */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                fontFamily: '"Clash Display",sans-serif',
                fontWeight: 700,
                color: "#F5F5F5",
                fontSize: "1.25rem",
                letterSpacing: "-0.04em",
              }}
            >
              SK
              <Box component="span" sx={{ color: "#3EFFC2" }}>
                .
              </Box>
            </Typography>
            <Box sx={{ width: 1, height: 14, background: "#2E2E2E" }} />
            <Typography sx={{ ...mono, color: "#404040" }}>© 2026</Typography>
            <Box
              sx={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#3EFFC2",
                opacity: 0.5,
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography sx={{ ...mono, color: "#404040" }}>
                Made with
              </Typography>
              <Box
                component="span"
                sx={{
                  color: "#E53935",
                  fontSize: "0.9rem",
                  display: "inline-block",
                  animation: "heartbeat 1.4s ease-in-out infinite",
                  "@keyframes heartbeat": {
                    "0%, 100%": { transform: "scale(1)" },
                    "14%": { transform: "scale(1.35)" },
                    "28%": { transform: "scale(1)" },
                    "42%": { transform: "scale(1.2)" },
                    "70%": { transform: "scale(1)" },
                  },
                }}
              >
                ♥
              </Box>
            </Box>
          </Box>

          {/* Right: stack + back to top */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {["Next.js", "Three.js", "Motion", "MUI"].map((tech, i, arr) => (
                <Box
                  key={tech}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <Typography sx={{ ...mono, color: "#404040" }}>
                    {tech}
                  </Typography>
                  {i < arr.length - 1 && (
                    <Box
                      sx={{
                        width: 2,
                        height: 2,
                        borderRadius: "50%",
                        background: "#3EFFC2",
                        opacity: 0.4,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box
              component="a"
              href="#hero"
              sx={{
                ...mono,
                color: "#3EFFC2",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Top ↑
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

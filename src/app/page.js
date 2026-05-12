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
    <Box
      component="main"
      sx={{
        position: "relative",
        zIndex: 1,
        pt: "44px" /* status bar offset */,
      }}
    >
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
            <Typography sx={{ ...mono, color: "#404040" }}>
              © 2026 · Built in Dublin
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Typography sx={{ ...mono, color: "#404040" }}>
              Next.js · Three.js · Motion
            </Typography>
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

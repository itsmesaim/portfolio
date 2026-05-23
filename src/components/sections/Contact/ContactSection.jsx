"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactForm } from "./ContactForm";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { personal } from "@/data/personal";
import { useCursorState } from "@/hooks/useCursorState";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

const SOCIALS = [
  { label: "LinkedIn", handle: "saim-kaskar", href: personal.social.linkedin },
  { label: "GitHub", handle: "itsmesaim", href: personal.social.github },
  // {
  //   label: "Live Demo",
  //   handle: "meetx.saimjs.com",
  //   href: personal.social.live,
  // },
];

export function ContactSection() {
  const { setState } = useCursorState();
  const cp = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("default"),
  };

  return (
    <SectionWrapper
      id="contact"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 10 },
        px: { xs: 3, md: 5, lg: 6 },
      }}
    >
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
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>05</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography sx={{ ...mono, color: "#606060" }}>Get In Touch</Typography>
      </Box>

      {/* Massive headline */}
      <Box sx={{ mb: { xs: 5, md: 7 } }}>
        <Typography
          sx={{
            fontFamily: '"Clash Display",sans-serif',
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#F5F5F5",
          }}
        >
          Let's build{" "}
          <Box component="span" sx={{ color: "#3EFFC2" }}>
            something
          </Box>
          <br />
          worth shipping.
        </Typography>
      </Box>

      {/* Massive email link */}
      <Box
        component="a"
        href={`mailto:${personal.email}`}
        {...cp}
        sx={{
          display: "inline-block",
          textDecoration: "none",
          mb: { xs: 6, md: 8 },
          position: "relative",
          "&:hover .arrow": { transform: "translateX(8px) rotate(-2deg)" },
          "&:hover .email": { color: "#3EFFC2", borderBottomColor: "#3EFFC2" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, md: 4 },
            flexWrap: "wrap",
          }}
        >
          <Typography
            className="email"
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: "#F5F5F5",
              letterSpacing: "-0.02em",
              borderBottom: "2px solid #2E2E2E",
              transition: "all 0.3s ease",
              pb: 0.5,
            }}
          >
            {personal.email}
          </Typography>
          <Box
            className="arrow"
            sx={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: { xs: "2rem", md: "3rem" },
              color: "#3EFFC2",
              transition: "transform 0.3s ease",
            }}
          >
            ↗
          </Box>
        </Box>
      </Box>

      {/* Two-column: socials + form */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
          gap: { xs: 6, md: 10 },
          borderTop: "1px solid #1F1F1F",
          pt: { xs: 6, md: 8 },
        }}
      >
        {/* Left: socials + status */}
        <Box>
          <Typography sx={{ ...mono, color: "#606060", mb: 3 }}>
            Or find me on
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid #1F1F1F",
            }}
          >
            {SOCIALS.map((s) => (
              <Box
                key={s.label}
                component="a"
                href={s.href}
                target="_blank"
                rel="noopener"
                {...cp}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 2.5,
                  textDecoration: "none",
                  borderBottom: "1px solid #1F1F1F",
                  transition: "padding-left 0.25s ease",
                  "&:hover": {
                    pl: 1.5,
                    "& .handle": { color: "#3EFFC2" },
                    "& .arrow": {
                      color: "#3EFFC2",
                      transform: "translateX(4px)",
                    },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <Typography sx={{ ...mono, color: "#606060" }}>
                    {s.label}
                  </Typography>
                  <Typography
                    className="handle"
                    sx={{
                      fontFamily: '"Satoshi",sans-serif',
                      fontSize: "1rem",
                      color: "#F5F5F5",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {s.handle}
                  </Typography>
                </Box>
                <Box
                  className="arrow"
                  sx={{
                    fontFamily: '"Geist Mono",monospace',
                    color: "#404040",
                    transition: "all 0.2s ease",
                  }}
                >
                  ↗
                </Box>
              </Box>
            ))}
          </Box>

          {/* Status block */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid rgba(62,255,194,0.2)",
              borderRadius: 2,
              background: "rgba(62,255,194,0.03)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#3EFFC2",
                  boxShadow: "0 0 10px #3EFFC2",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <Typography sx={{ ...mono, color: "#3EFFC2" }}>
                Status: Available
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: '"Satoshi",sans-serif',
                color: "#A0A0A0",
                fontSize: "0.9rem",
                lineHeight: 1.65,
              }}
            >
              Open to full-time roles in Dublin, remote across EU, and global
              contracts. Reply within 24 hours.
            </Typography>
          </Box>
        </Box>

        {/* Right: form */}
        <Box>
          <Typography sx={{ ...mono, color: "#606060", mb: 3 }}>
            Or drop a message
          </Typography>
          <ContactForm />
        </Box>
      </Box>
    </SectionWrapper>
  );
}

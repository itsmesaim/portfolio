"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "motion/react";
import { useCursorState } from "@/hooks/useCursorState";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] },
});

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export function HeroText() {
  const { setState } = useCursorState();
  const cp = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("default"),
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        px: { xs: 3, sm: 5, md: 5, lg: 6 },
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* Section indicator — top left */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 100, md: 130 },
          left: { xs: 24, md: 40, lg: 48 },
          pointerEvents: "all",
        }}
      >
        <motion.div {...up(0.1)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 24, height: 1, background: "#3EFFC2" }} />
            <Typography sx={{ ...mono, color: "#3EFFC2" }}>
              00 / Index
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Right column — metadata block */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "auto", md: 130 },
          bottom: { xs: 380, md: "auto" },
          right: { xs: 24, md: 40, lg: 48 },
          pointerEvents: "all",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1.5,
          textAlign: "right",
        }}
      >
        <motion.div {...up(0.25)}>
          <Typography sx={{ ...mono, color: "#404040" }}>
            Engineer · Builder
          </Typography>
        </motion.div>
        <motion.div {...up(0.32)}>
          <Typography sx={{ ...mono, color: "#404040" }}>
            04Y · 15+ Shipped
          </Typography>
        </motion.div>
        <motion.div {...up(0.39)}>
          <Typography sx={{ ...mono, color: "#404040" }}>
            MSc · Griffith Dublin
          </Typography>
        </motion.div>
      </Box>

      {/* Main name — massive, bottom-left */}
      <Box sx={{ pointerEvents: "all", maxWidth: "100%" }}>
        <motion.div {...up(0.35)}>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 600,
              fontSize: "clamp(4rem, 14vw, 14rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.045em",
              color: "#F5F5F5",
              mb: 0.5,
            }}
          >
            Saim
          </Typography>
        </motion.div>

        <motion.div {...up(0.5)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: { xs: 2, md: 3 },
              flexWrap: "wrap",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: '"Clash Display",sans-serif',
                fontWeight: 600,
                fontSize: "clamp(4rem, 14vw, 14rem)",
                lineHeight: 0.86,
                letterSpacing: "-0.045em",
                color: "#3EFFC2",
              }}
            >
              Kaskar
              <Box component="span" sx={{ color: "#F5F5F5" }}>
                .
              </Box>
            </Typography>

            {/* Inline meta */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                flexDirection: "column",
                gap: 1,
                pb: 3,
                ml: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    background: "#3EFFC2",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #3EFFC2",
                  }}
                />
                <Typography sx={{ ...mono, color: "#A0A0A0" }}>
                  Open to opportunities
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  fontSize: "0.95rem",
                  color: "#606060",
                  maxWidth: 260,
                  lineHeight: 1.5,
                }}
              >
                Building real-time and AI-powered products from Dublin.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Bottom row — actions + mobile meta */}
        <motion.div {...up(0.7)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 3,
              mt: { xs: 4, md: 5 },
            }}
          >
            {/* Actions — text-based, not buttons */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 5 },
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box
                component="a"
                href="#projects"
                {...cp}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover .arrow": { transform: "translateX(4px)" },
                  "&:hover .text": { color: "#3EFFC2" },
                }}
              >
                <Typography
                  className="text"
                  sx={{
                    fontFamily: '"Satoshi",sans-serif',
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "#F5F5F5",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    borderBottom: "1px solid #3EFFC2",
                    pb: 0.25,
                  }}
                >
                  See the work
                </Typography>
                <Box
                  className="arrow"
                  sx={{
                    color: "#3EFFC2",
                    transition: "transform 0.25s ease",
                    fontFamily: '"Geist Mono",monospace',
                    fontSize: "1rem",
                  }}
                >
                  →
                </Box>
              </Box>

              <Box
                component="a"
                href="#contact"
                {...cp}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover .text": { color: "#3EFFC2" },
                }}
              >
                <Typography
                  className="text"
                  sx={{
                    fontFamily: '"Satoshi",sans-serif',
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "#606060",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                >
                  Get in touch
                </Typography>
              </Box>
            </Box>

            {/* Mobile-only inline meta */}
            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  background: "#3EFFC2",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #3EFFC2",
                }}
              />
              <Typography sx={{ ...mono, color: "#A0A0A0" }}>
                Available
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

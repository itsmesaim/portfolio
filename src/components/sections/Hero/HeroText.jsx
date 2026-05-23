"use client";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "motion/react";
import { useCursorState } from "@/hooks/useCursorState";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.72rem",
};

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$%";

// Single letter that scrambles then locks
function ScrambleLetter({ char, startDelay, isSpace }) {
  const [display, setDisplay] = useState("█");
  const [locked, setLocked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isSpace) {
      setDisplay(" ");
      setLocked(true);
      return;
    }

    const startTimer = setTimeout(() => {
      // Begin scrambling
      intervalRef.current = setInterval(() => {
        setDisplay(
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        );
      }, 45);

      // Lock to correct char
      const lockTimer = setTimeout(() => {
        clearInterval(intervalRef.current);
        setDisplay(char);
        setLocked(true);
      }, 380);

      return () => clearTimeout(lockTimer);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(intervalRef.current);
    };
  }, [char, startDelay, isSpace]);

  return (
    <motion.span
      animate={{
        color: locked ? undefined : "#3EFFC2",
        opacity: locked ? 1 : 0.9,
      }}
      transition={{ duration: 0.1 }}
      style={{
        display: "inline-block",
        minWidth: isSpace ? "0.3em" : undefined,
      }}
    >
      {display}
    </motion.span>
  );
}

function ScrambleName({ text, color, baseDelay = 0 }) {
  const letters = text.split("");
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: '"Clash Display",sans-serif',
        fontWeight: 600,
        fontSize: "clamp(4rem, 14vw, 14rem)",
        lineHeight: 0.86,
        letterSpacing: "-0.045em",
        color: color,
        display: "block",
      }}
    >
      {letters.map((char, i) => (
        <ScrambleLetter
          key={i}
          char={char}
          isSpace={char === " "}
          startDelay={baseDelay + i * 55}
        />
      ))}
    </Typography>
  );
}

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
});

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
          top: { xs: 80, md: 110 },
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

      {/* Right metadata — desktop only */}
      <Box
        sx={{
          position: "absolute",
          top: { md: 110 },
          right: { md: 40, lg: 48 },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1.5,
          textAlign: "right",
          pointerEvents: "all",
        }}
      >
        {[
          { text: "Engineer · Builder", delay: 0.2 },
          { text: "4Y · 15+ Shipped", delay: 0.28 },
          { text: "MSc · Griffith Dublin", delay: 0.36 },
        ].map(({ text, delay }) => (
          <motion.div key={text} {...up(delay)}>
            <Typography sx={{ ...mono, color: "#505050" }}>{text}</Typography>
          </motion.div>
        ))}
      </Box>

      {/* Main content */}
      <Box sx={{ pointerEvents: "all" }}>
        {/* Names with scramble */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.3 }}
        >
          <ScrambleName text="Saim" color="#F5F5F5" baseDelay={400} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: { xs: 2, md: 3 },
              flexWrap: "wrap",
            }}
          >
            <ScrambleName text="Kaskar." color="#3EFFC2" baseDelay={800} />
          </Box>
        </motion.div>

        {/* CTAs — simple, no repetition */}
        <motion.div {...up(1.4)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 4, md: 6 },
              mt: { xs: 4, md: 5 },
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
                "&:hover .arrow": { transform: "translateX(5px)" },
                "&:hover .label": { color: "#3EFFC2" },
              }}
            >
              <Typography
                className="label"
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 500,
                  color: "#F5F5F5",
                  borderBottom: "1px solid #3EFFC2",
                  pb: 0.25,
                  transition: "color 0.2s ease",
                }}
              >
                See the work
              </Typography>
              <Box
                className="arrow"
                sx={{
                  color: "#3EFFC2",
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: "1.1rem",
                  transition: "transform 0.25s ease",
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
                textDecoration: "none",
                cursor: "pointer",
                "&:hover .label": { color: "#3EFFC2" },
              }}
            >
              <Typography
                className="label"
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 500,
                  color: "#707070",
                  transition: "color 0.2s ease",
                }}
              >
                Get in touch
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

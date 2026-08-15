"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "motion/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { personal } from "@/data/personal";
import { useCursorState } from "@/hooks/useCursorState";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

export function AboutSection() {
  const [journeyOpen, setJourneyOpen] = useState(false);
  const { setState } = useCursorState();
  const cp = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("default"),
  };

  return (
    <SectionWrapper
      id="about"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
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
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>01</Typography>
        <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
        <Typography component="h2" sx={{ ...mono, color: "#606060" }}>
          The Engineer
        </Typography>
      </Box>

      {/* Photo + headline row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "auto 1fr",
            lg: "auto 1fr auto",
          },
          gap: { xs: 4, md: 6 },
          alignItems: "start",
          mb: { xs: 6, md: 8 },
        }}
      >
        {/* Photo — compact card */}
        <Box
          sx={{
            width: { xs: 220, md: 280, lg: 320 },
            flexShrink: 0,
            position: "relative",
            borderRadius: 2.5,
            overflow: "hidden",
            border: "1px solid #1F1F1F",
            aspectRatio: "3/4",
            background: "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
            "&:hover img": {
              filter: "grayscale(0%)",
              transform: "scale(1.03)",
            },
          }}
        >
          <Box
            component="img"
            src="/me.webp"
            alt="Saim Kaskar"
            loading="lazy"
            decoding="async"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "filter 0.4s ease, transform 0.6s ease",
              filter: "grayscale(20%)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {/* Bottom gradient overlay with name */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background:
                "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Clash Display",sans-serif',
                fontWeight: 600,
                color: "#F5F5F5",
                fontSize: "0.95rem",
              }}
            >
              Saim Kaskar
            </Typography>
            <Typography sx={{ ...mono, color: "#606060", fontSize: "0.6rem" }}>
              Dublin, IE
            </Typography>
          </Box>
        </Box>

        <Box>
          {/* Full bio — not split */}
          <Typography
            sx={{
              fontFamily: '"Satoshi",sans-serif',
              color: "#A0A0A0",
              lineHeight: 1.8,
              fontSize: "1rem",
              mb: 2,
              maxWidth: 640,
            }}
          >
            I've been building things since before I really knew what I was
            doing, freelance client work running through most of my BEng:
            billing systems for cafes, inventory tools for restaurants,
            marketing sites that actually brought in customers. Graduated with
            First Class Honours in Computer Engineering, specialising in AI and
            ML in Healthcare. Then came the bigger move, packing up for Ireland
            to do my MSc.
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Satoshi",sans-serif',
              color: "#A0A0A0",
              lineHeight: 1.8,
              fontSize: "1rem",
              maxWidth: 640,
            }}
          >
            Finished that Master in Computing at Griffith College Dublin, and
            I'm back to freelancing full-time, this time building my own things
            too.{" "}
            <Box
              component="a"
              href="https://jobradar.saimjs.com"
              target="_blank"
              rel="noopener"
              sx={{
                color: "#3EFFC2",
                textDecoration: "none",
                borderBottom: "1px solid rgba(62,255,194,0.4)",
                "&:hover": { borderBottomColor: "#3EFFC2" },
              }}
            >
              JobRadar AI
            </Box>{" "}
            is the main one right now: LangChain, structured ratings, a FAISS
            RAG pipeline on Mistral, with DeepSeek or OpenAI if you want. I'm
            pushing that toward LangGraph and agentic flows next.{" "}
            <Box
              component="a"
              href={personal.social.live}
              target="_blank"
              rel="noopener"
              sx={{
                color: "#3EFFC2",
                textDecoration: "none",
                borderBottom: "1px solid rgba(62,255,194,0.4)",
                "&:hover": { borderBottomColor: "#3EFFC2" },
              }}
            >
              MeetX
            </Box>{" "}
            is the other, a real-time video platform on WebRTC and LiveKit.
          </Typography>

          {/* Full journey — collapsed by default */}
          <Box
            component="button"
            onClick={() => setJourneyOpen((v) => !v)}
            {...cp}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mt: 3,
              background: "none",
              border: "none",
              p: 0,
              cursor: "pointer",
              "&:hover .arrow": { transform: "translateX(5px)" },
              "&:hover .label": { color: "#3EFFC2" },
            }}
          >
            <Typography
              className="label"
              sx={{
                fontFamily: '"Satoshi",sans-serif',
                fontSize: "1rem",
                fontWeight: 500,
                color: "#F5F5F5",
                borderBottom: "1px solid #3EFFC2",
                pb: 0.25,
                transition: "color 0.2s ease",
              }}
            >
              {journeyOpen ? "Collapse" : "Read my full journey"}
            </Typography>
            <Box
              className="arrow"
              sx={{
                color: "#3EFFC2",
                fontFamily: '"Geist Mono",monospace',
                fontSize: "1rem",
                transition: "transform 0.25s ease, rotate 0.25s ease",
                rotate: journeyOpen ? "90deg" : "0deg",
              }}
            >
              →
            </Box>
          </Box>

          <AnimatePresence initial={false}>
            {journeyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Satoshi",sans-serif',
                    color: "#A0A0A0",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                    maxWidth: 640,
                    mt: 3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {`Real start was 2020: first year of engineering, entirely over Zoom, mid-COVID. Picked up web basics within that first half-year. By sem 3, I'd built something people actually thought was cool, no AI involved, just docs, Stack Overflow, and whatever the community could tell me. That got me my first paying client, then a site for my college's incubation cell.

From there: React, then a slow slide into AI, ML, DL, NLP, information retrieval, a bit of game theory I've mostly forgotten by now. Alongside the actual coursework: software engineering, Agile, databases (SQL and NoSQL both), big data, computer networks, information security. Freelancing ran in the background the whole time, a mix of clients who paid well and clients who paid in "exposure." Took both kinds of work.

BEng finished May 2024. Moved to Dublin that September for the MSc. Kept freelancing through it, and started building JobRadar AI on the side, a job search platform that rates fit against your CV instead of making you read every posting yourself. It's live now, deployed on a VPS I manage myself. Still adding to it. Still freelancing. Still figuring out the next thing.`}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Pull-quote — fills the dead space on wide screens, hidden below lg */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            maxWidth: 260,
            pl: 4,
            borderLeft: "1px solid #1F1F1F",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 500,
              fontSize: "1.4rem",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              color: "#606060",
              "& span": { color: "#3EFFC2" },
            }}
          >
            I don't just <span>write code.</span> I ship things that get used.
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  );
}

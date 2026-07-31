"use client";
import { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  animate,
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { journeyWaypoints } from "@/data/journey";
import { useIsMobile } from "@/hooks/useMediaQuery";

const RocketMarker = dynamic(
  () => import("./RocketMarker").then((m) => m.RocketMarker),
  { ssr: false, loading: () => null },
);

const MINT = "#3EFFC2";
const VIEW_W = 1200;
const VIEW_H = 460;

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontSize: "0.7rem",
};

// Catmull-Rom -> cubic-bezier "d" string, so the path curves smoothly
// through every waypoint without pulling in a curve library.
function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function JourneySection() {
  const pathRef = useRef(null);
  const pathLength = useRef(0);
  const waypointLens = useRef([]);
  const currentLen = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0, angle: 0 });
  const travelDirection = useRef(1);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const markerSize = isMobile ? 48 : 96;

  const positionMarker = (len) => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(len);
    const ahead = path.getPointAtLength(Math.min(len + 1, pathLength.current));
    // Tangent always points in the curve's 2020->2026 direction — flip
    // it 180° when actually travelling backward (prev button) so the
    // nose faces the way it's really moving instead of flying tail-first.
    const angle =
      (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI +
      (travelDirection.current === -1 ? 180 : 0);
    setMarkerPos({ x: point.x, y: point.y, angle });
  };

  // Precompute each waypoint's arc-length along the smoothed path once, so
  // the marker can tween between exact waypoint positions on click.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    pathLength.current = path.getTotalLength();
    const samples = 600;
    const points = Array.from({ length: samples + 1 }, (_, i) =>
      path.getPointAtLength((pathLength.current * i) / samples),
    );
    waypointLens.current = journeyWaypoints.map((w) => {
      let best = 0;
      let bestDist = Infinity;
      points.forEach((p, i) => {
        const d = (p.x - w.pos[0]) ** 2 + (p.y - w.pos[1]) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return (pathLength.current * best) / samples;
    });
    currentLen.current = waypointLens.current[0];
    positionMarker(currentLen.current);
  }, []);

  useEffect(() => {
    const target = waypointLens.current[activeIndex];
    if (target === undefined) return;
    travelDirection.current = target >= currentLen.current ? 1 : -1;
    if (reducedMotion) {
      currentLen.current = target;
      positionMarker(target);
      return;
    }
    const controls = animate(currentLen.current, target, {
      duration: 1.6,
      ease: [0.45, 0.05, 0.55, 0.95],
      onUpdate: (v) => {
        currentLen.current = v;
        positionMarker(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, reducedMotion]);

  const pathD = smoothPath(journeyWaypoints.map((w) => w.pos));
  const active = journeyWaypoints[activeIndex];

  return (
    <Box id="journey" component="section" sx={{ position: "relative" }}>
      <Box sx={{ px: { xs: 3, md: 5, lg: 6 }, pt: { xs: 10, md: 14 } }}>
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
          <Typography sx={{ ...mono, color: MINT }}>05</Typography>
          <Box sx={{ width: 40, height: 1, background: "#2E2E2E" }} />
          <Typography sx={{ ...mono, color: "#606060" }}>
            The Journey
          </Typography>
        </Box>
        <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 900 }}>
          <Typography
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#F5F5F5",
            }}
          >
            Every year, a different lesson.{" "}
            <Box component="span" sx={{ color: "#606060" }}>
              Use the arrows, or tap a planet.
            </Box>
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 5, lg: 6 }, pt: { xs: 4, md: 6 } }}>
        <Box sx={{ position: "relative" }}>
          <Box
            component="svg"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            sx={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <radialGradient id="planetRock" cx="32%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#4A4A4A" />
                <stop offset="55%" stopColor="#242424" />
                <stop offset="100%" stopColor="#141414" />
              </radialGradient>
              <radialGradient id="planetMint" cx="32%" cy="30%" r="75%">
                <stop offset="0%" stopColor="rgba(190,255,235,0.9)" />
                <stop offset="45%" stopColor="rgba(62,255,194,0.35)" />
                <stop offset="100%" stopColor="rgba(62,255,194,0.06)" />
              </radialGradient>
            </defs>

            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#2E2E2E"
              strokeWidth={2}
              strokeDasharray="6 8"
            />

            {journeyWaypoints.map((w, i) => {
              const glowing = i === activeIndex || w.current || w.highlight;
              const craterAngle = ((i * 53) % 360) * (Math.PI / 180);
              return (
                <g key={w.id}>
                  {glowing && (
                    <circle
                      cx={w.pos[0]}
                      cy={w.pos[1]}
                      r={w.radius + 10}
                      fill="none"
                      stroke="rgba(62,255,194,0.25)"
                      strokeWidth={1}
                      strokeDasharray="3 5"
                    />
                  )}
                  <circle
                    cx={w.pos[0]}
                    cy={w.pos[1]}
                    r={w.radius}
                    fill={glowing ? "url(#planetMint)" : "url(#planetRock)"}
                    stroke={
                      i === activeIndex || hoveredId === w.id
                        ? MINT
                        : glowing
                          ? "rgba(62,255,194,0.6)"
                          : "#3A3A3A"
                    }
                    strokeWidth={i === activeIndex ? 2.5 : glowing ? 2 : 1.5}
                    style={{
                      cursor: "pointer",
                      transition: "stroke 0.2s ease, fill 0.2s ease",
                      filter: glowing
                        ? `drop-shadow(0 0 10px ${MINT})`
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredId(w.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActiveIndex(i)}
                  />
                  {/* Craters — low-poly asteroid texture */}
                  <ellipse
                    cx={w.pos[0] + Math.cos(craterAngle) * w.radius * 0.35}
                    cy={w.pos[1] + Math.sin(craterAngle) * w.radius * 0.35}
                    rx={w.radius * 0.22}
                    ry={w.radius * 0.16}
                    fill="rgba(0,0,0,0.22)"
                    style={{ pointerEvents: "none" }}
                  />
                  <ellipse
                    cx={w.pos[0] - Math.cos(craterAngle + 1.9) * w.radius * 0.4}
                    cy={w.pos[1] - Math.sin(craterAngle + 1.9) * w.radius * 0.4}
                    rx={w.radius * 0.14}
                    ry={w.radius * 0.1}
                    fill="rgba(0,0,0,0.18)"
                    style={{ pointerEvents: "none" }}
                  />
                  <text
                    x={w.pos[0]}
                    y={w.pos[1] + w.radius + 22}
                    textAnchor="middle"
                    fill={i === activeIndex || w.highlight ? MINT : "#707070"}
                    fontFamily='"Geist Mono","Courier New",monospace'
                    fontSize={13}
                    letterSpacing="0.05em"
                    style={{ pointerEvents: "none" }}
                  >
                    {w.year.split(" · ")[0]}
                  </text>

                  {hoveredId === w.id && i !== activeIndex && (
                    <foreignObject
                      x={w.pos[0] - 90}
                      y={w.pos[1] - w.radius - 46}
                      width={180}
                      height={30}
                      style={{ pointerEvents: "none", overflow: "visible" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            fontFamily: '"Geist Mono","Courier New",monospace',
                            fontSize: 10,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: MINT,
                            background: "rgba(20,20,20,0.92)",
                            border: "1px solid rgba(62,255,194,0.4)",
                            borderRadius: 999,
                            padding: "6px 12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {w.hover}
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </Box>

          {/* Rocket marker — real 3D model, tweens between waypoints */}
          <Box
            sx={{
              position: "absolute",
              left: `${(markerPos.x / VIEW_W) * 100}%`,
              top: `${(markerPos.y / VIEW_H) * 100}%`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              width: markerSize,
              height: markerSize,
            }}
          >
            <Suspense fallback={null}>
              <RocketMarker angle={markerPos.angle} size={markerSize} />
            </Suspense>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mt: { xs: 2, md: 3 },
          }}
        >
          <IconButton
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            sx={{
              color: activeIndex === 0 ? "#333" : MINT,
              border: "1px solid #2E2E2E",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ ...mono, color: "#606060" }}>
            {activeIndex + 1} / {journeyWaypoints.length}
          </Typography>
          <IconButton
            onClick={() =>
              setActiveIndex((i) =>
                Math.min(journeyWaypoints.length - 1, i + 1),
              )
            }
            disabled={activeIndex === journeyWaypoints.length - 1}
            sx={{
              color:
                activeIndex === journeyWaypoints.length - 1 ? "#333" : MINT,
              border: "1px solid #2E2E2E",
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 3, md: 5, lg: 6 }, py: { xs: 6, md: 8 } }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box
              sx={{
                mx: "auto",
                maxWidth: 720,
                p: { xs: 3, md: 4 },
                background: "rgba(15,15,15,0.7)",
                border: "1px solid rgba(62,255,194,0.25)",
                borderRadius: 2,
              }}
            >
              <Typography sx={{ ...mono, color: MINT, mb: 1.5 }}>
                {active.year}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Clash Display",sans-serif',
                  fontWeight: 500,
                  color: "#F5F5F5",
                  fontSize: { xs: "1.15rem", md: "1.35rem" },
                  mb: 1.5,
                }}
              >
                {active.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  color: "#A0A0A0",
                  lineHeight: 1.75,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  mb: active.tags?.length ? 2.5 : 0,
                }}
              >
                {active.text}
              </Typography>
              {active.tags?.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {active.tags.map((tag) => (
                    <Typography
                      key={tag}
                      sx={{
                        ...mono,
                        color: "#606060",
                        "&:not(:last-child)::after": {
                          content: '"·"',
                          mx: 1.2,
                          color: "#2E2E2E",
                        },
                      }}
                    >
                      {tag}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

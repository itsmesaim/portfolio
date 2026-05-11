"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCursorState } from "@/hooks/useCursorState";

const NAV_LINKS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Stack", href: "#tech" },
  { num: "03", label: "Work", href: "#projects" },
  { num: "04", label: "Trajectory", href: "#experience" },
  { num: "05", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setState } = useCursorState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cp = {
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("default"),
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 36,
          left: 0,
          right: 0,
          zIndex: 150,
          px: { xs: 3, md: 5 },
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrolled ? "rgba(20,20,20,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid #1F1F1F"
            : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        {/* Logo monogram */}
        <Box
          {...cp}
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.5,
            cursor: "default",
            userSelect: "none",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Clash Display",sans-serif',
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#F5F5F5",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            SK
          </Typography>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#3EFFC2",
              mb: 0.5,
            }}
          />
        </Box>

        {/* Desktop nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Box
              key={link.label}
              component="a"
              href={link.href}
              {...cp}
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.75,
                textDecoration: "none",
                "&:hover .label": { color: "#3EFFC2" },
                "&:hover .num": { color: "#3EFFC2" },
              }}
            >
              <Typography
                className="num"
                sx={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: "0.65rem",
                  color: "#404040",
                  transition: "color 0.2s ease",
                }}
              >
                {link.num}
              </Typography>
              <Typography
                className="label"
                sx={{
                  fontFamily: '"Satoshi",sans-serif',
                  fontSize: "0.875rem",
                  color: "#A0A0A0",
                  fontWeight: 500,
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <IconButton
          sx={{ display: { md: "none" }, color: "#F5F5F5" }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            background: "#0F0F0F",
            borderLeft: "1px solid #1F1F1F",
            p: 4,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 6 }}>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#A0A0A0" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV_LINKS.map((link) => (
            <Box
              key={link.label}
              component="a"
              href={link.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 2,
                textDecoration: "none",
                "&:hover": { "& .num, & .label": { color: "#3EFFC2" } },
              }}
            >
              <Typography
                className="num"
                sx={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: "0.75rem",
                  color: "#606060",
                }}
              >
                {link.num}
              </Typography>
              <Typography
                className="label"
                sx={{
                  fontFamily: '"Clash Display",sans-serif',
                  fontSize: "1.75rem",
                  color: "#F5F5F5",
                  fontWeight: 600,
                }}
              >
                {link.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

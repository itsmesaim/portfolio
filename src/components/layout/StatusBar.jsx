"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const opts = {
        timeZone: "Europe/Dublin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-IE", opts).format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const mono = {
    fontFamily: '"Geist Mono","Courier New",monospace',
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid #1F1F1F",
        background: "rgba(13,13,13,0.85)",
        backdropFilter: "blur(20px)",
        py: 1,
        px: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 200,
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3EFFC2",
            boxShadow: "0 0 8px #3EFFC2",
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>
          Available for work
        </Typography>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 1,
            height: 12,
            background: "#2E2E2E",
          }}
        />
        <Typography
          sx={{
            ...mono,
            color: "#606060",
            display: { xs: "none", md: "block" },
          }}
        >
          Currently shipping MeetX
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          sx={{
            ...mono,
            color: "#606060",
            display: { xs: "none", sm: "block" },
          }}
        >
          Dublin, IE
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: 1,
            height: 12,
            background: "#2E2E2E",
          }}
        />
        <Typography
          sx={{ ...mono, color: "#F5F5F5", minWidth: 75, textAlign: "right" }}
        >
          {time || "--:--:--"}
        </Typography>
      </Box>
    </Box>
  );
}

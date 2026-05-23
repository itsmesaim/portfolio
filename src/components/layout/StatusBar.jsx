"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const mono = {
  fontFamily: '"Geist Mono","Courier New",monospace',
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const opts = {
        timeZone: "Europe/Dublin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-IE", opts).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid #1A1A1A",
        background: "rgba(13,13,13,0.9)",
        backdropFilter: "blur(20px)",
        py: "6px",
        px: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 200,
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
            flexShrink: 0,
          }}
        />
        <Typography sx={{ ...mono, color: "#3EFFC2" }}>Available</Typography>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 1,
            height: 10,
            background: "#2A2A2A",
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            ...mono,
            color: "#505050",
            display: { xs: "none", md: "block" },
          }}
        >
          Shipping MeetX
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          sx={{
            ...mono,
            color: "#505050",
            display: { xs: "none", sm: "block" },
          }}
        >
          Dublin, IE
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: 1,
            height: 10,
            background: "#2A2A2A",
          }}
        />
        <Typography
          sx={{ ...mono, color: "#D0D0D0", minWidth: 72, textAlign: "right" }}
        >
          {time || "--:--:--"}
        </Typography>
      </Box>
    </Box>
  );
}

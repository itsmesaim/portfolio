"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";

const NeuralBackground = dynamic(
  () =>
    import("@/components/layout/NeuralBackground").then(
      (m) => m.NeuralBackground,
    ),
  { ssr: false },
);

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mounted && <NeuralBackground />}
      {children}
    </ThemeProvider>
  );
}

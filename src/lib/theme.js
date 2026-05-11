import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#141414", paper: "#1C1C1C" },
    primary: {
      main: "#3EFFC2",
      dark: "#00C896",
      light: "#6FFFCF",
      contrastText: "#141414",
    },
    secondary: { main: "#FFB347", contrastText: "#141414" },
    text: { primary: "#F5F5F5", secondary: "#A0A0A0", disabled: "#606060" },
    divider: "#2E2E2E",
  },
  typography: {
    fontFamily: '"Satoshi", "Helvetica", sans-serif',
    h1: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.015em",
    },
    h4: { fontFamily: '"Clash Display", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Clash Display", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Clash Display", sans-serif', fontWeight: 500 },
    body1: { fontFamily: '"Satoshi", sans-serif', lineHeight: 1.75 },
    body2: { fontFamily: '"Satoshi", sans-serif', lineHeight: 1.65 },
    caption: {
      fontFamily: '"Geist Mono", "Courier New", monospace',
      letterSpacing: "0.06em",
    },
    overline: {
      fontFamily: '"Geist Mono", "Courier New", monospace',
      letterSpacing: "0.15em",
    },
    button: {
      fontFamily: '"Satoshi", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 24px",
          transition: "all 0.25s ease",
        },
        containedPrimary: {
          background: "#3EFFC2",
          color: "#141414",
          fontWeight: 700,
          "&:hover": {
            background: "#00C896",
            boxShadow: "0 0 28px rgba(62,255,194,0.4)",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0)" },
        },
        outlinedPrimary: {
          borderColor: "rgba(62,255,194,0.5)",
          color: "#3EFFC2",
          "&:hover": {
            background: "rgba(62,255,194,0.07)",
            borderColor: "#3EFFC2",
            transform: "translateY(-1px)",
          },
        },
        sizeLarge: { padding: "12px 32px", fontSize: "1rem" },
        sizeSmall: { padding: "6px 16px", fontSize: "0.8rem" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#1C1C1C",
          border: "1px solid #2E2E2E",
          borderRadius: 16,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { borderColor: "rgba(62,255,194,0.3)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Geist Mono", "Courier New", monospace',
          fontSize: "0.7rem",
          letterSpacing: "0.04em",
          background: "#242424",
          border: "1px solid #2E2E2E",
          color: "#A0A0A0",
          height: 26,
          transition: "all 0.2s ease",
          "&:hover": {
            background: "rgba(62,255,194,0.08)",
            borderColor: "rgba(62,255,194,0.35)",
            color: "#3EFFC2",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#606060",
            fontFamily: '"Satoshi", sans-serif',
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "#3EFFC2" },
          "& .MuiOutlinedInput-root": {
            background: "#1C1C1C",
            fontFamily: '"Satoshi", sans-serif',
            color: "#F5F5F5",
            "& fieldset": { borderColor: "#2E2E2E" },
            "&:hover fieldset": { borderColor: "#3EFFC2" },
            "&.Mui-focused fieldset": {
              borderColor: "#3EFFC2",
              boxShadow: "0 0 0 3px rgba(62,255,194,0.1)",
            },
          },
        },
      },
    },
    MuiDivider: { styleOverrides: { root: { borderColor: "#2E2E2E" } } },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "#3EFFC2",
            height: 2,
            borderRadius: 1,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#606060",
          fontFamily: '"Satoshi", sans-serif',
          fontWeight: 500,
          textTransform: "none",
          fontSize: "0.9rem",
          transition: "color 0.2s ease",
          "&.Mui-selected": { color: "#3EFFC2" },
          "&:hover": { color: "#A0A0A0" },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Satoshi", sans-serif',
          "&:hover": { background: "rgba(62,255,194,0.06)" },
          "&.Mui-selected": {
            background: "rgba(62,255,194,0.1)",
            color: "#3EFFC2",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#1C1C1C",
          border: "1px solid #2E2E2E",
          borderRadius: 20,
        },
      },
    },
  },
});

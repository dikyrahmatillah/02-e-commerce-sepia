"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fbf7f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#2b1d17",
      secondary: "#8b6f66",
    },
    primary: {
      main: "#d66385",
      light: "#eab8c6",
      dark: "#c45578",
      contrastText: "#ffffff",
    },
    divider: "rgba(216, 145, 160, 0.2)",
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily:
      "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

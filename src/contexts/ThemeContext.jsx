import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // محاولة قراءة الثيم من localStorage عند البداية
    return localStorage.getItem("theme") || "dark";
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode); // حفظ الثيم الجديد
      return newMode;
    });
  };

  // theme object
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        ...(mode === "dark"
          ? {
              background: {
                default: "#121212",
                paper: "#1e1e1e",
              },
            }
          : {
              background: {
                default: "#f5f5f5",
                paper: "#ffffff",
              },
            }),
      },
    }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

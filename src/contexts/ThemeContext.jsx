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
    ...(mode === 'dark'
      ? {
          background: {
            default: '#0a0f0d', // أسود مخضر داكن جدًا
            paper: '#121814', // رمادي غامق بخلفية خضراء خفيفة
          },
          text: {
            primary: '#d1fae5', // أخضر فاتح ناعم (نعناعي)
            secondary: '#9ca3af', // رمادي فاتح للنصوص الثانوية
          },
          primary: {
            main: '#1d805cff', // أخضر زمردي متناسق
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#4b5563', // رمادي داكن
            contrastText: '#ffffff',
          },
          divider: '#1f2937', // فاصل رمادي غامق
        }
      : {
          background: {
            default: '#f9fafb', // رمادي فاتح جدًا
            paper: '#ecfdf5', // أخضر باهت للكروت والعناصر
          },
          text: {
            primary: '#111827', // أسود رمادي للنصوص الرئيسية
            secondary: '#374151', // رمادي متوسط للنصوص الثانوية
          },
          primary: {
            main: '#10b981', // أخضر نابض بالحياة
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#6b7280', // رمادي أنيق
            contrastText: '#ffffff',
          },
          divider: '#d1d5db', // فاصل رمادي فاتح
        }),
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none', // لإزالة الظلال الافتراضية
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
        },
      },
    },
  },
}

), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

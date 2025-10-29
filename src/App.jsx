
import './App.css'
import LargeComponent from './Large_component.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useMemo  } from "react";


function App() {
const getCustomTheme = (mode) =>
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
            main: '#1f7e5bff', // أخضر زمردي متناسق
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
            main: '#098058ff', // أخضر نابض بالحياة
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
});


const [mode, setMode] = useState(() => {
  const savedMode = localStorage.getItem('themeMode');
  if (savedMode) return savedMode;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
});

  const theme = useMemo(() => getCustomTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };


  return (
    <>
     <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
          <div
        style={{
          margin: 0,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
    <LargeComponent />
       </div>
    </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App

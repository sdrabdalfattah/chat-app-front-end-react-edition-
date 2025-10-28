
import './App.css'
import LargeComponent from './Large_component.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect  } from "react";


function App() {
const getCustomTheme = (mode) =>
  createTheme({
palette: {
  mode,
  ...(mode === 'dark'
    ? {
        background: {
          default: '#0d0b1a', // خلفية داكنة جدًا بنفسجية مائلة للأسود
          paper: '#1a1625',   // خلفية الكروت/العناصر بدرجة أفتح قليلاً
        },
        text: {
          primary: '#e9d5ff',   // نص بنفسجي فاتح مريح للعين
          secondary: '#c4b5fd', // نص ثانوي أفتح بدرجة lavender
        },
        primary: {
          main: '#8b5cf6', // بنفسجي متوسط (هادئ وفخم)
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#6d28d9', // بنفسجي داكن أكثر قوة
          contrastText: '#ffffff',
        },
      }
    : {
        background: {
          default: '#ffffff', // خلفية فاتحة
          paper: '#f5f3ff',   // بنفسجي باهت للكروت
        },
        text: {
          primary: '#2e1065', // بنفسجي داكن للنصوص
          secondary: '#6b21a8',
        },
        primary: {
          main: '#9333ea', // بنفسجي قوي
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#c084fc', // بنفسجي فاتح
          contrastText: '#ffffff',
        },
      }),
}
,

    shape: {
      borderRadius: 16, 
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
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

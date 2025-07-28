
import './App.css'
import LargeComponent from './Large_component.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect  } from "react";


function App() {
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  const handleResize = () => {
    const vp = window.visualViewport;
    if (!vp) return;

    const heightDiff = window.innerHeight - vp.height - vp.offsetTop;
    setKeyboardHeight(heightDiff > 150 ? heightDiff : 0); // عتبة 150px لتفادي تغيّرات غير مهمة
  };

  const vp = window.visualViewport;
  if (vp) {
    vp.addEventListener("resize", handleResize);
    vp.addEventListener("scroll", handleResize); // مهم جدًا لبعض الأجهزة
  }

  return () => {
    if (vp) {
      vp.removeEventListener("resize", handleResize);
      vp.removeEventListener("scroll", handleResize);
    }
  };
}, []);


  return (
    <>
     <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          <div
        style={{
          margin: 0,
          width: '100%',
          paddingBottom: `${keyboardHeight}px`,
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


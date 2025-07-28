
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

const [inputBottom, setInputBottom] = useState(0);

useEffect(() => {
  const handleViewportResize = () => {
    const vp = window.visualViewport;
    if (vp) {
      const keyboardHeight = window.innerHeight - vp.height - vp.offsetTop;
      setInputBottom(keyboardHeight > 0 ? keyboardHeight : 0);
    }
  };

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", handleViewportResize);
  }

  return () => {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener("resize", handleViewportResize);
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
          padding:0,
          transform: `translateY(-${inputBottom}px)`,
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


import './App.css'
import LargeComponent from './Large_component.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

function App() {
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


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
          minHeight: '100dvh',
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

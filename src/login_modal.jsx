import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react'
import axios from 'axios';

export default function LoginComponent({ setIsLogged }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });


  const [loading, setLoading] = useState(false);

const [dataShown , setDataShown] = useState({
  Msg: "register to this website to chat with users.",
  errState: false
});

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
      setLoading(true);
    axios.post('https://chat-app-backend-1-tni2.onrender.com/login', data)
      .then((response) => {
         setDataShown({ Msg: "register to this website to chat with users.", errState: false });
          setLoading(false);
       const user = response.data.user;
       const token = response.data.token;
       localStorage.setItem('user', JSON.stringify(user));
       localStorage.setItem('token', token);
       window.location.reload();
      })
        .catch((err) => {
   setDataShown({
  Msg: err.response?.data?.error || "undefind",
  errState: true
});

          setLoading(false);
      });
  };

  const handleIsLogged = () => {
    setIsLogged(false);
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          marginInline:"5px",
          bgcolor:"background.paper",
          color:"text.primary",
          borderRadius:'8px',
          padding: '20px',
          flexDirection: 'column',
          width: '600px',
          display: 'flex',
          border: '1px dashed white'
        }}
      >
        <Typography sx={{ textAlign: 'left' }} variant="h5">
          Login
        </Typography>
        <Typography sx={{ textAlign: 'left',color: dataShown.errState ? 'rgb(255, 84, 84)': 'text.primary', marginBlock: '10px' }} variant="body2">
          {dataShown.Msg}
        </Typography>

        <TextField
          fullWidth
          label="Your Email"
          variant="outlined"
          margin="normal"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="Your Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Typography sx={{ textAlign: 'left', mt: 1 }} variant="body2">
          If you don't have an account{' '}
          <Link sx={{ cursor: 'pointer' }} onClick={handleIsLogged} underline="always">
            click here
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
          <Button variant="contained" loading={loading} onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

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
import { Email, Password } from '@mui/icons-material';
import axios from 'axios';


export default function RegisComponent({setIsLogged,setIsExistUser}) {

  const [data, setData] = useState({
    email:"",
    name:"",
    password:""})

const [loading, setLoading] = useState(false);

const [dataShown , setDataShown] = useState({
  Msg: "register to this website to chat with users.",
  errState: false
});

const handelregister = () => {
  setLoading(true);

  axios.post('https://chat-app-backend-z319.onrender.com/register', data)
    .then((response) => {
        setDataShown({ Msg: "register to this website to chat with users.", errState: false });
      setLoading(false);

      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setIsExistUser(true);
          window.location.reload();
    })
    .catch((error) => {
         setDataShown({
  Msg: error.response?.data?.error || "undefind",
  errState: true
});
      console.log(error.response.data.error);
      setLoading(false);
    });
};


  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


const  handelislogged = ()=> {
  setIsLogged(true)
}

  return (
    <>
    
   <Box
        component="section"
        sx={{
          color:"text.primary",
          marginInline:"5px",
          bgcolor:"background.paper",
          borderRadius:'8px',
          padding: '20px',
          flexDirection: 'column',
          width: '600px',
          display: 'flex',
          border: '1px dashed grey'
        }}
      >
     <Typography sx={{textAlign:"left"}} variant='h5'>register</Typography>
     <Typography sx={{textAlign:"left",color: dataShown.errState ? 'rgb(255, 84, 84)': 'text.primary',marginBlock:"10px"}} variant='h7'>{dataShown.Msg}</Typography>
       <TextField id="outlined-basic" value={data.email} onChange={(e)=> {setData({...data,email:e.target.value})}}  label="your email" variant="outlined" sx={{marginBlock:"10px"}} />
         <TextField id="outlined-basic" value={data.name} onChange={(e)=> {setData({...data,name:e.target.value})}} label="your name" variant="outlined" sx={{marginBlock:"10px"}} />
       <TextField
       value={data.password} onChange={(e)=> {setData({...data,password:e.target.value})}}
         label="Your Password"
         variant="outlined"
         type={showPassword ? 'text' : 'password'}
         fullWidth
         margin="normal"
         InputProps={{
           endAdornment: (
             <InputAdornment position="end">
               <IconButton onClick={togglePassword} edge="end">
                 {showPassword ? <VisibilityOff /> : <Visibility />}
               </IconButton>
             </InputAdornment>
           ),
         }}
       />
           <Typography sx={{textAlign:"left"}} variant='h7'>if you have an account <Link sx={{cursor:"pointer"}} onClick={handelislogged} href="#" underline="always">
click here
</Link> </Typography>
<Box sx={{ display: 'flex',justifyContent:"right", mt: 2 }}>
<Button loading={loading} variant="contained" sx={{marginLeft:"5px"}} onClick={handelregister}>register</Button>

</Box>
    </Box>
 
    </>
  )
}
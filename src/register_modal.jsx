import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import axios from 'axios';

export default function RegisComponent({ setIsLogged, setIsExistUser }) {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    image: null, // الصورة التي سيرفعها المستخدم
  });

  const [imagePreview, setImagePreview] = useState(null); // معاينة الصورة
  const [loading, setLoading] = useState(false);
  const [dataShown, setDataShown] = useState({
    Msg: "register to this website to chat with users.",
    errState: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 🟢 عند اختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // 🟢 عند التسجيل
  const handelregister = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("password", data.password);
      if (data.image) formData.append("image", data.image);

      const response = await axios.post(
        "https://chat-app-backend-1-tni2.onrender.com/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setDataShown({ Msg: "Registered successfully!", errState: false });
      setLoading(false);

      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setIsExistUser(true);
      window.location.reload();
    } catch (error) {
      setDataShown({
        Msg: error.response?.data?.error || "Undefined error",
        errState: true,
      });
      console.log(error);
      setLoading(false);
    }
  };

  const handelislogged = () => {
    setIsLogged(true);
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          color: "text.primary",
          marginInline: "5px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          padding: "20px",
          flexDirection: "column",
          width: "600px",
          display: "flex",
          border: "1px dashed grey",
        }}
      >
        <Typography sx={{ textAlign: "left" }} variant="h5">
          Register
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            color: dataShown.errState ? "rgb(255, 84, 84)" : "text.primary",
            marginBlock: "10px",
          }}
          variant="h7"
        >
          {dataShown.Msg}
        </Typography>

        <TextField
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          label="Your Email"
          variant="outlined"
          sx={{ marginBlock: "10px" }}
        />

        <TextField
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          label="Your Name"
          variant="outlined"
          sx={{ marginBlock: "10px" }}
        />

        <TextField
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          label="Your Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
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

        {/* 🟢 رفع الصورة */}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* 🖼️ معاينة الصورة */}
        {imagePreview && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Typography sx={{ textAlign: "left", mt: 2 }} variant="h7">
          If you have an account{" "}
          <Link
            sx={{ cursor: "pointer" }}
            onClick={handelislogged}
            underline="always"
          >
            click here
          </Link>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ marginLeft: "5px" }}
            onClick={handelregister}
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

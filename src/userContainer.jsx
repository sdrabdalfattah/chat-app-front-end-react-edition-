import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divder from '@mui/material/Divider';

import axios from 'axios';
import UserContainer from './user';

import { useSelectedUser } from "./contexts/SelectedUserContext";
import { useSidebar } from './contexts/SidebarContext';
import { useAppTheme } from "./contexts/ThemeContext";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import LogoutDialog from './logOutDialog';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect,useState } from 'react';
import { socket } from "./socket";
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { Avatar } from '@mui/material';

export default function UsersContainer() {


    const { isWide, setIswide } = useSidebar();
const userinfo = JSON.parse(localStorage.getItem("user")) || null;
const username = userinfo?.username
const image = userinfo?.image

const [unreadBadgeMap, setUnreadBadgeMap] = useState({});

const [onlineUsers, setOnlineUsers] = useState([]);

    const { mode, toggleTheme } = useAppTheme();

    const { selectedUser } = useSelectedUser()

    const [refreshUsers , SetrefreshUsers] = useState(false)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);


useEffect(() => {
userinfo?.id && socket.emit("user_connected", { userId: userinfo.id });

  socket.on("user_connected", ({ userId }) => {
    setOnlineUsers((prev) =>
      prev.includes(userId) ? prev : [...prev, userId]
    );
  });

  socket.on("online_users", (userIds) => {
    setOnlineUsers(userIds);
  });

  socket.on("user_disconnected", ({ userId }) => {
    setOnlineUsers((prev) => prev.filter((id) => id !== userId));
  });

  return () => {
    socket.off("user_connected");
    socket.off("online_users");
    socket.off("user_disconnected");
  };
}, []);




const handelgetusers = () => {
  SetrefreshUsers(true)

    axios.get('https://chat-app-backend-1-tni2.onrender.com/all_users')
      .then((response) => {

        SetrefreshUsers(false)
        console.log(response.data.users);
        setUsers(response.data.users);
        setCount(response.data.count);
      })
      .catch((error) => {
        SetrefreshUsers(false)
      
      });
}

useEffect(() => {handelgetusers()}, [])





return (
  <Box
    sx={{
      flexShrink:"0",
      width: { xs: isWide ? "0%" : "100%", 
               md: isWide ? "0%" : "30%",
               lg: isWide ? "0%" : "30%"},
      overflow: "hidden",
      transition: "0.4s",
      left: { xs: "0", md: "0", lg: "0" },
      marginRight:{ xs: "0",
                    md: "auto",
                    lg: "auto"},
      height: "100vh",
      zIndex:"999" ,
      borderRight: "1px solid",
      borderColor: "divider",
      position: { xs: "fixed",
                  md: "sticky",
                  lg: "sticky"},

      alignItems: "center",
      bgcolor: "background.default",
      color: "text.primary",
    }}
  >
    <Box
      sx={{
        bgcolor: "background.paper",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          whiteSpace: "nowrap",
        }}
      >
        <GroupIcon sx={{ marginRight: "5px", color: "text.primary" }} />
        Users List ({count})
        <Box sx={{marginLeft:"auto"}}>
          <IconButton
            sx={{ marginLeft: "auto", marginRight: "10px" }}
            onClick={toggleTheme}
          >
            {mode === "light" ? (
              <DarkModeIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
            ) : (
              <LightModeIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
            )}
          </IconButton>

            <IconButton
             disabled={refreshUsers}
            sx={{ marginLeft: "auto", marginRight: "10px" }}
            onClick={handelgetusers}
          >
           <RefreshIcon   sx={{
                  fontSize: "28px",
                  cursor: "pointer",
                  transform: "rotate(90deg)",
                }}/>
          </IconButton>

          {selectedUser && (
            <IconButton
              sx={{ marginLeft: "auto", marginRight: "10px" }}
              onClick={() => {
                setIswide(!isWide);
              }}
            >
              <ExpandCircleDownIcon
                sx={{
                  fontSize: "28px",
                  cursor: "pointer",
                  transform: "rotate(90deg)",
                }}
              />
            </IconButton>
          )}
        </Box>
      </Typography>

      <Divder sx={{ width: "100%", marginBlock: "10px" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            alignItems: "center",
            display: "flex",
            paddingInline: "5px",
          }}
        >
          <Avatar src={image} sx={{ width: 46, height: 46,marginRight:"10px" }} />
          {username}
        </Typography>

        <Button variant="contained" color="error" onClick={handleClickOpen}>
          <LogoutIcon sx={{ marginRight: "5px" }} />
          Log Out
        </Button>
      </Box>
    </Box>

    <Box sx={{ maxHeight: "85vh", overflowY: "auto" }}>
       {refreshUsers &&<LinearProgress />}
      <UserContainer unreadBadgeMap={unreadBadgeMap} setUnreadBadgeMap={setUnreadBadgeMap} onlineUsers={onlineUsers} users={users} />
    </Box>

    <LogoutDialog handleClose={handleClose} open={open} />

  </Box>
);


}


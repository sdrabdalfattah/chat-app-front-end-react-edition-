import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { useSelectedUser } from "./contexts/SelectedUserContext";
import { useMessages } from './contexts/MessagesContext';
import axios from 'axios';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useSidebar } from './contexts/SidebarContext';
import { useUnread } from "./contexts/UnreadContext";
import Avatar from '@mui/material/Avatar';


export default function UserContainer({ users , onlineUsers }) {

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  
const { clearUnread , unreadCounts} = useUnread();

    const { setIswide } = useSidebar();
    const { setSelectedUser } = useSelectedUser();
    const { setMessages } = useMessages()

  const userinfo = JSON.parse(localStorage.getItem("user"));

  const handelgetuser = (user) => {


    setSelectedUser(user)
axios.get(`https://chat-app-backend-1-tni2.onrender.com/messages/${userinfo.id}/${user._id}`).then((Response)=> {

 setMessages(Response.data.messages);
  
if (isSmallScreen) {
  setIswide(true);
}

 clearUnread(user._id);

console.log(userinfo.id, "---",user._id)
}).catch((error) => {
  console.error("Error fetching user data:", error);
})
  }



  return (
    <>
      {userinfo && users.filter(user => user._id !== userinfo.id).map((user) => (
        <Box
          onClick={() => handelgetuser(user)}
          key={user._id} sx={{
          cursor: 'pointer',
          flexDirection: 'row',  
          whiteSpace: 'nowrap',
          overflowX:"hidden",
          background: "rgba(80, 80, 80, 0)",
          padding: "10px",
          marginBlock: "5px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          '&:hover': {
            backgroundColor: 'rgba(80, 80, 80, 0.21)',
          },
        }}>
<Badge
  overlap="circular"
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  variant="dot"
  sx={{
    "& .MuiBadge-dot": {
      backgroundColor: onlineUsers.includes(user._id) ? "rgba(5, 150, 0, 1)" : "rgba(46, 46, 46, 1)", // اللون الأخضر للحالة النشطة
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },
  }}
>
  <Avatar src={user.image} sx={{ width: 46, height: 46 }} />
</Badge>
          <Typography variant="h6" sx={{marginLeft:"10px"}}>{user.name}</Typography>
            <Badge 
  badgeContent={unreadCounts[user._id] ?? user.unreadCount ?? 0} 
  sx={{ marginLeft: "auto", marginRight: "20px" }} 
  color="error" 
/>

        </Box>
      ))}
    </>
  );
}






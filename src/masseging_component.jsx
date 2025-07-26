
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

import './App.css'

import { useTheme } from '@mui/material/styles';
import DelelteDialog from "./delete_chat.jsx"
import Tooltip from '@mui/material/Tooltip';
import ImgReview from './imgReview';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { useSidebar } from './contexts/SidebarContext';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import { useSelectedUser } from "./contexts/SelectedUserContext";
import { useMessages } from './contexts/MessagesContext';
import ImageIcon from '@mui/icons-material/Image';
import { useState, useEffect,useRef,useMemo  } from "react";
import { socket } from "./socket";

export default function MassegingComponent({typing , setTyping}) {

  const theme = useTheme();

    const userinfo = JSON.parse(localStorage.getItem("user"));
    const id = userinfo.id

    const [showTooltip, setShowTooltip] = useState(false);
    const [openIMG, setopenIMG] = useState(false); 
    const [img , setImg] = useState(null)
    const { selectedUser } = useSelectedUser()
    const { messages, setMessages } = useMessages();

    const { isWide, setIswide } = useSidebar();


    const [inputBottom, setInputBottom] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [messageJSON, setmessageJSON] = useState({
    reciverid:null,
    message: "",
    senderId:id,
  });


const [isLoading , setIsLoading] = useState(false)

useEffect(() => {
 if (selectedUser) {
    setmessageJSON((prev) => ({
      ...prev,
      reciverid: selectedUser._id,
    }));
  }

}, [selectedUser]);

  const [open , setOpen] = useState(false)

    const handleClose = () => {
    setOpen(false);
  };





  const messagesEndRef = useRef(null);


useEffect(() => {
  const container = messagesEndRef.current;
  if (!container) return;
  const threshold = 2000; 
  const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;

  if (isNearBottom) {
    container.scrollTop = container.scrollHeight;
  }
}, [messages,typing]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages ]);



const handelImgReview = (image) => {
setImg(image)
setopenIMG(true)
}

const handelsend = () => {
  const data = {
    reciverid: messageJSON.reciverid,
    message: messageJSON.message,
    senderId: messageJSON.senderId,
     type: "text",
  };

socket.emit("send_message", data);
setmessageJSON((prev) => ({ ...prev, message: "" }));
}


useEffect(() => {
  let timeout;

  socket.on("typing", () => {
    setTyping(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setTyping(false);
    }, 3000);
  });

  return () => {
    socket.off("typing");
    clearTimeout(timeout);
  };
}, []);



useEffect(() => {
  const handleResize = () => {
    const vp = window.visualViewport;
    if (vp) {
      const keyboardHeight = window.innerHeight - vp.height - vp.offsetTop;
      setInputBottom(keyboardHeight > 0 ? keyboardHeight : 0);
    }
  };

  const vp = window.visualViewport;
  if (vp) {
    vp.addEventListener("resize", handleResize);
    handleResize(); // مرة أولى
  }

  return () => {
    if (vp) {
      vp.removeEventListener("resize", handleResize);
    }
  };
}, []);


  
const keyboardHeight = window.innerHeight - vp.height - vp.offsetTop;
setInputBottom(keyboardHeight > 0 ? keyboardHeight : 0);
setIsKeyboardOpen(keyboardHeight > 0);

const handelistyping = () => {
  const sender_id = userinfo.id;
  const receiver_id  = messageJSON.reciverid;



 socket.emit("typing", { sender_id, receiver_id }); 
};



const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);
 setIsLoading(true);
  try {
    const res = await axios.post("https://chat-app-backend-z319.onrender.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    const imageUrl = res.data.url;
    const reciverid = messageJSON.reciverid

  const data = {
    reciverid: reciverid,
    senderId: messageJSON.senderId,
       type: "image",
      content: imageUrl,
  };


    socket.emit("send_message", data);

  } catch (err) {

    setShowTooltip(true)
     setTimeout(() => setShowTooltip(false), 3000);
    setIsLoading(true)

   }finally {
    setIsLoading(false); 
  }
};





const renderedMessages = useMemo(() => {
  return messages.map((msg, index) => {
    const date = new Date(msg.createdAt);
    const dateTime = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const isMine = msg.sender_id === userinfo.id;

return (
  <Box
    sx={{
      alignSelf: isMine ? "flex-end" : "flex-start",
      marginBottom: "10px",
    }}
    key={index}
  >
    {msg.image && (
      <Box
        sx={{
          maxWidth: "500px",
          borderRadius: "15px",
          overflow: "hidden",
          marginBottom: "5px",
        }}
      >
    <Box
  component="img"
  onClick={() => handelImgReview(msg.image)}
  src={`https://chat-app-backend-z319.onrender.com${msg.image}`}
  alt="sent"
  sx={{
    cursor: "pointer",
    maxWidth: {
      xs: "200px",
      sm: "300px",
      md: "300px",
      xl: "300px",
    },
    borderRadius: "15px",
    display: "block",
  }}
/>
      </Box>
    )}

    {msg.message_body && (
      <Typography
 sx={(theme) => ({
  width: "fit-content",
  wordBreak: "break-word",
  bgcolor: isMine
    ? theme.palette.mode === "dark"
      ? "rgb(144, 202, 249)"
      : "rgb(25, 118, 210)"
    : "transparent",
  border: isMine ? "none" : "1px solid #505050ff",
 color: isMine ?"background.paper" : "text.primary",
  padding: "10px",
  marginLeft: isMine ? "auto" : "0",
  borderRadius: "20px",
  maxWidth: "500px",
})}

      >
        {msg.message_body}
      </Typography>
    )}

         <Box sx={{ display: "flex",color: "text.primary", alignItems: "center", fontSize: "14px", marginTop: "3px" }}>
     {dateTime}
    </Box>
  </Box>
);

  });
}, [messages, userinfo.id]);




return (
    <>
<Box sx={{width: isWide ? "100%" :"70%" ,height:"100vh",transition:"0.4s",display:"flex",flexDirection:"column",bgcolor: "background.default",}}>
      <Box sx={{bgcolor: "background.paper",position:{  xl: "sticky",md: "sticky",sm: "fixed",xs: "fixed", },top:"0",width:"100%",padding:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {isWide ? <IconButton onClick={()=> {setIswide(false)}} sx={{marginRight:"10px",}}> <ExpandCircleDownIcon sx={{fontSize:"25px",cursor:"pointer",transform:"rotate(-90deg)"}}/> </IconButton> : ""}
<Typography sx={{display:"flex",alignItems:"center",color: "text.primary",justifyContent:"center"}}>  {selectedUser ? (<><PersonIcon sx={{marginRight:"7px"}} /> {selectedUser.name}</>) : "Select user to chat with"}</Typography>
            <IconButton onClick={()=> {setOpen(true)}} aria-label="delete" sx={{marginLeft:"auto"}}>
        <DeleteIcon />
      </IconButton>
      </Box>



 <Box ref={messagesEndRef} sx={{
  padding: {
    xl: isWide ? "10px 200px" : "10px 30px",
    md: isWide ? "10px 200px" : "10px 30px",
    sm: "30px",
    xs: "30px", 
  },
  transition: "0.4s",
  scrollBehavior: "smooth",
  display: "flex",
  maxHeight: {  xl: "85vh",md: "85vh",sm: "none",xs: "none", },
  overflowY: {  xl: "auto",md: "auto",sm: "visible",xs: "visible", },
  bgcolor: "background.default",
  flexDirection: "column",
  gap: "10px"
}}
>

{
  messages.length === 0 ? (
    <Typography
      sx={{
        color: "text.primary",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      variant="h5"
    >
      No messages
    </Typography>
  ) : (
    renderedMessages
  )
}


      <Box 
      sx={{background:"rgba(66, 66, 66, 1)",animation: "blink 2s ease-in-out infinite",padding:"10px 12px",width:"fit-content",borderRadius:"50px",display: typing ? "flex" : "none",alignItems:"center", justifyContent:"center"}}> <CreateIcon sx={{marginRight:"10px"}}/>{selectedUser ?  selectedUser.name + "is typing ..." : ""}</Box>
    </Box>




<Box
  sx={{
    bgcolor: "background.paper",
    position: {
      xl: "sticky",
      md: "sticky",
      sm: isKeyboardOpen ? "fixed" : "relative",
      xs: isKeyboardOpen ? "fixed" : "relative",
    },
    bottom: `${inputBottom}px`,
    transition: "bottom 0s",
    scrollBehavior: "auto",

    padding: {
      xl: "10px 30px",
      md: "10px 30px",
      sm: "10px 5px",
      xs: "10px 5px",
    },
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  }}
>




       <TextField
              readonly
              onFocus="this.removeAttribute('readonly');"
              autoComplete="off"
              onInput={handelistyping}
              value={messageJSON.message}
              onChange={(e) =>setmessageJSON((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Type your message here..."
              size="small"
              sx={{width:"100%",background:"trasparent"}}
             InputProps={{
          sx: {
            
            zIndex:"1" ,
              fontSize: {  xl: "18px",md: "18px",sm: "16px",xs: "16px", },
              padding:{  xl: "5px 10px",md: "5px 10px",sm: "5px 2px",xs: "5px 5px", },
            borderRadius: "50px",
          },
        }}
              hiddenLabel
            />
      

<Tooltip
  open={showTooltip}
  arrow
    disableFocusListener
      disableHoverListener
      disableTouchListener
  title="This image must be smaller than 1024px"
  componentsProps={{
    tooltip: {
      sx: {
        zIndex:"30" ,
        border: '1px solid red',
        backgroundColor: 'rgba(34, 34, 34, 0.68)',
        color: 'white',
        fontSize: {  xl: "15px",md: "15px",sm: "11px",xs: "11px", },
        marginTop: '0px',
      },
    },
  }}
>
<label htmlFor="image-upload">
  <input
    id="image-upload"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    style={{ display: "none" }}
  />
  <Fab
    size="small"
    aria-label="add"
    sx={{
      zIndex:"1" ,
         color:
   theme.palette.mode === "dark"
              ?  "rgba(41, 41, 41, 1)"
              : "rgba(255, 255, 255, 1)",  
                 bgcolor:
   theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(41, 41, 41, 1)",  
      flexShrink: '0',
      marginInline: "10px",
      width: {  xl: "50px",md: "50px",sm: "45px",xs: "45px", },
      height: {  xl: "50px",md: "50px",sm: "45px",xs: "45px", },
  "&:hover": {
      bgcolor:
   theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(41, 41, 41, 1)",        
  }
  
    }}
    component="span"
  >
  {isLoading ? (
  <CircularProgress size={25} sx={{  color:"background.paper", }} />
) : (
  <ImageIcon />
)}

  </Fab>
</label>
</Tooltip>

          <Fab onClick={handelsend}  disabled={messageJSON.message.trim() === ""}  size="small" color="primary" aria-label="add" sx={{flexShrink:'0',zIndex:"1" ,marginleft:"10px",width:{  xl: "50px",md: "50px",sm: "45px",xs: "45px", },height:{  xl: "50px",md: "50px",sm: "45px",xs: "45px", }}}>
        <SendIcon />
      </Fab>

        </Box>
       
</Box>

<ImgReview setopenIMG={setopenIMG} img={img} openIMG={openIMG}/>
<DelelteDialog open={open} handleClose={handleClose}/>
    </>
  );
}

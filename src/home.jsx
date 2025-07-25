

import UsersContainer from "./userContainer"
import MassegingComponent from "./masseging_component"
import { useSelectedUser } from "./contexts/SelectedUserContext";
import { Typography } from "@mui/material";
import SocketListener from "./SocketListener";
import { Box } from "@mui/material"
import { useState } from "react";


export default function HomeComponent() {

    const [typing, setTyping] = useState(false);

    const { selectedUser } = useSelectedUser()

return (
    <>
        <SocketListener setTyping={setTyping} />
<UsersContainer />
{selectedUser ? <MassegingComponent  setTyping={setTyping} typing={typing}/> : <Box sx={{width:"100%",height:"100vh",alignItems:"center",justifyContent:"center",bgcolor:"background.default",display:"flex",fontSize:"30px",color:"text.primary",margin:"0"}}>Select a user to chat with</Box>}

</>
)

}
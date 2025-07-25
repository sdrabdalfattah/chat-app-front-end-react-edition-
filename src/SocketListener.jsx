// components/SocketListener.jsx
import { useEffect } from "react";
import { useMessages } from './contexts/MessagesContext';
import { socket } from "./socket";
import { useSelectedUser } from "./contexts/SelectedUserContext";

import { useUnread } from "./contexts/UnreadContext";


const SocketListener = ({setTyping}) => {


const { addUnread } = useUnread();
 const { selectedUser } = useSelectedUser();



  const { addMessage } = useMessages();

  useEffect(() => {

    const handleReceiveMessage = (saved) => {
      console.log("📥 receive message", saved);
      addMessage(saved); 
      setTyping(false)

      console.log("77",selectedUser)
if (!selectedUser || String(selectedUser._id).trim() !== String(saved.sender_id).trim()
)
 {

        addUnread(saved.sender_id);
      }


    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket,selectedUser]);

  return null;
};

export default SocketListener;

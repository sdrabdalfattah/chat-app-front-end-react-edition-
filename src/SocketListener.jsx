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
      setTyping(false)

   if (
      selectedUser &&
      (
        String(saved.sender_id).trim() === String(selectedUser._id).trim() ||
        String(saved.receiver_id).trim() === String(selectedUser._id).trim()
      )
    ) {
      addMessage(saved); 
      setTyping(false)
    } else {
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





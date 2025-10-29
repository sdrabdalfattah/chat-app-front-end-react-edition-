// components/SocketListener.jsx
import { useEffect, useRef } from "react";
import { useMessages } from "./contexts/MessagesContext";
import { useSelectedUser } from "./contexts/SelectedUserContext";
import { useUnread } from "./contexts/UnreadContext";
import { socket } from "./socket";
import notSound from "./assets/mixkit-interface-option-select-2573 (1).wav";

const SocketListener = ({ setTyping }) => {
  const { addUnread } = useUnread();
  const { selectedUser } = useSelectedUser();
  const { addMessage } = useMessages();
  const audioRef = useRef(new Audio(notSound));

  // 🔹 هذا هو المعرف الحالي للمستخدم الذي يستخدم التطبيق
  const currentUserId = localStorage.getItem("userId"); // أو استخدم السياق إن وجد

  useEffect(() => {
    const handleReceiveMessage = (saved) => {
      const senderId = String(saved.sender_id).trim();
      const receiverId = String(saved.receiver_id).trim();
      const selectedId = selectedUser ? String(selectedUser._id).trim() : null;

      // ✅ لا تشغل الصوت إذا كانت الرسالة من المستخدم الحالي
      if (senderId !== currentUserId) {
        try {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        } catch (err) {
          console.warn("Failed to play sound:", err);
        }
      }

      setTyping(false);

      if (selectedId && (senderId === selectedId || receiverId === selectedId)) {
        addMessage(saved);
      } else {
        addUnread(senderId);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [addMessage, addUnread, selectedUser, setTyping, currentUserId]);

  return null;
};

export default SocketListener;



// UnreadContext.js
import { createContext, useContext, useRef, useState } from "react";
import notSound from "./assets/mixkit-interface-option-select-2573 (1).wav";

const UnreadContext = createContext();

export const UnreadProvider = ({ children }) => {
  const [unreadCounts, setUnreadCounts] = useState({});
  const audioRef = useRef(new Audio(notSound));

  const currentUserId = localStorage.getItem("userId"); // أو من السياق إن وجد

  const addUnread = (userId) => {
    // ✅ لا تشغّل الصوت إذا كانت الرسالة من المستخدم الحالي نفسه
    if (userId !== currentUserId) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } catch (err) {
        console.warn("Failed to play sound:", err);
      }
    }

    setUnreadCounts((prev) => ({
      ...prev,
      [userId]: (prev[userId] || 0) + 1,
    }));
  };

  const clearUnread = (userId) => {
    setUnreadCounts((prev) => ({
      ...prev,
      [userId]: 0,
    }));
  };

  return (
    <UnreadContext.Provider value={{ unreadCounts, addUnread, clearUnread }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => useContext(UnreadContext);


// UnreadContext.js
import { createContext, useContext, useState } from "react";

const UnreadContext = createContext();

export const UnreadProvider = ({ children }) => {
  const [unreadCounts, setUnreadCounts] = useState({});

  const addUnread = (userId) => {
     console.log("🔴 addUnread called for user:", userId)
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

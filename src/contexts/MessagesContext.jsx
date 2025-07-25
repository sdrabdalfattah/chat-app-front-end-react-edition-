import { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <MessagesContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessagesContext);
}

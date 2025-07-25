// context/SidebarContext.jsx
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isWide, setIswide] = useState(false);

  return (
    <SidebarContext.Provider value={{ isWide, setIswide }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

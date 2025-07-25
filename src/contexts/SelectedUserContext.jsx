// SelectedUserContext.js
import { createContext, useContext, useState } from "react";

const SelectedUserContext = createContext();

export function SelectedUserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
}

export function useSelectedUser() {
  return useContext(SelectedUserContext);
}

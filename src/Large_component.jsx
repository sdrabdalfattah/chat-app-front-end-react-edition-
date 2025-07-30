import LoginComponent from './login_modal.jsx';
import RegisComponent from './register_modal.jsx';
import HomeComponent from './home.jsx';
import { SelectedUserProvider } from "./contexts/SelectedUserContext";
import { MessagesProvider } from './contexts/MessagesContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ThemeProvider } from "./contexts/ThemeContext";
import { UnreadProvider } from './contexts/UnreadContext';
import WelcomeModal from './welcome_modal';
import axios from 'axios'


import { useState, useEffect } from 'react';

export default function LargeComponent() {
  const [isLogged, setIsLogged] = useState(false);
  const [isExistUser, setIsExistUser] = useState(null);


    const [showWelcome, setShowWelcome] = useState(true);

  const [serverawake, setServerawake] = useState(false);
useEffect(() => {
    axios.delete('https://chat-app-backend-1-tni2.onrender.com/delete_chat')
      .finally(() => {
        setServerawake(true);
      });
}, []);

  

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsExistUser(!!user);
  }, []);


  if (isExistUser === null) {
  return <div></div>;
}


  return (
    <>
    <ThemeProvider>
<SelectedUserProvider>
<MessagesProvider>
 <SidebarProvider>
  <UnreadProvider>



      {isExistUser ? (
        <HomeComponent />
      ) : (
        isLogged ? (
          <LoginComponent key="login" setIsExistUser={setIsExistUser}  setIsLogged={setIsLogged} />
        ) : (
          <RegisComponent key="register" setIsExistUser={setIsExistUser} setIsLogged={setIsLogged} />
        )
      )}



  <WelcomeModal open={showWelcome} serverawake={serverawake} onClose={() => setShowWelcome(false)} />

</UnreadProvider>
</SidebarProvider>
</MessagesProvider>
</SelectedUserProvider>
</ThemeProvider>
    </>
  );
}

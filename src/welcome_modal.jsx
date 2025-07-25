import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Box,
  Link
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { styled, useTheme } from '@mui/material/styles';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import CheckIcon from '@mui/icons-material/Check';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function WelcomeModal({ open, onClose, serverawake }) {
  const theme = useTheme();
  const [isShown, setIsShown] = useState(() => {
    return sessionStorage.getItem('welcomeShown') === 'true';
  });

  const handleClose = () => {
    sessionStorage.setItem('welcomeShown', 'true');
    setIsShown(true);
    onClose();
  };

  if (isShown) return null;

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ backdropFilter: 'blur(20px)' }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          alignItems: 'center',
          display: 'flex',
          gap: '10px',
        }}
      >
        <InfoOutlineIcon /> Notice
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: '450px',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        dividers
      >
        <Typography variant="body1" gutterBottom>
          Welcome to the platform. This website is a <strong>real-time chat application</strong> designed to demonstrate full-stack capabilities using the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js).
        </Typography>

        <Typography variant="h6">Frontend (React)</Typography>
        <ul>
          <li>React.js (SPA architecture)</li>
          <li>Material UI (component-based layout)</li>
          <li>React Hooks and Context</li>
          <li>Axios for HTTP requests</li>
        </ul>

        <Typography variant="h6">Backend (Node.js + Express)</Typography>
        <ul>
          <li>Express.js REST API</li>
          <li>MongoDB with Mongoose ODM</li>
        </ul>

        <Typography variant="h6">Hosting</Typography>
        <ul>
          <li>Frontend: Vercel</li>
          <li>Backend: Render (free tier)</li>
          <li>Database: MongoDB Atlas</li>
        </ul>

        <Typography variant="h6">Key Features</Typography>
       <ul>
   <li>Authentication (Login/Register)</li>
   <li>Real-time messaging with Socket.IO</li>
  <li>Typing indicators, unread message badges</li>
   <li>Image sending capability</li>
   </ul>


        <Typography variant="h6">Author</Typography>
        <Typography gutterBottom>
          Created by <strong>Mopok DH</strong> - MERN Stack Developer.
        </Typography>

        <Typography variant="h6">Important Notes</Typography>
 <Typography
        sx={{
          display: "flex",
          borderRadius: "8px",
          marginBlock: "15px",
          padding: "5px 10px",
          border: `1px solid ${theme.palette.error.main}`,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 0, 0, 0.15)"
              : "rgba(255, 164, 164, 0.34)",
          color: theme.palette.text.primary,
          fontSize: "15px",
        }}
        gutterBottom
      >
        <WarningIcon
          sx={{
             color:
             theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 0, 0, 1)",
            alignSelf: "center",
            marginBottom: "4px",
            marginRight: "10px",
            fontSize: "20px",
          }}
        />
        For technical reasons, all user accounts will be deleted after 30 days and all conversations will be deleted after 7 days.
      </Typography>


      <Typography
        sx={{
          display: "flex",
          borderRadius: "8px",
          marginBlock: "15px",
          padding: "5px 10px",
          border: `1px solid ${theme.palette.warning.main}`,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 165, 0, 0.15)"
              : "rgba(255, 218, 149, 0.28)",
          color: theme.palette.text.primary,
          fontSize: "15px",
        }}
        gutterBottom
      >
        <InfoOutlineIcon
          sx={{
            color:
             theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 136, 0, 1)",
            alignSelf: "center",
            marginBottom: "4px",
            marginRight: "10px",
            fontSize: "20px",
          }}
        />    
For technical reasons, all user accounts will be deleted 30 days after their creation, and all conversations will be deleted 7 days after they are created.
      </Typography>


        <Typography variant="body2" sx={{ color: 'gray' }}>
          * Source Code:&nbsp;
          <Link
            href="https://github.com/sdrabdalfattah/chat-app-front-end-react-edition-"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            GitHub Repository
          </Link>
          <br />
          * View more projects on&nbsp;
          <Link
            href="https://www.linkedin.com/in/mopok-dh-75415a34a/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            LinkedIn
          </Link>
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Box
          sx={{
            height: { xs: 'auto', sm: '40px' },
            bgcolor: theme.palette.background.default,
            p: 2,
            gap: '10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            width: '100%',
            color: theme.palette.text.primary,
          }}
        >
          {serverawake ? (
            <>
              <CheckIcon sx={{ color: 'green' }} />
              <span>Server is ready</span>
            </>
          ) : (
            <>
              <CircularProgress size="23px" sx={{ flexShrink: 0 }} />
              <Typography sx={{ ml: 1 }}>Starting server... this may take a few seconds</Typography>
            </>
          )}
        </Box>

        <Button
          disabled={!serverawake}
          onClick={handleClose}
          variant="contained"
        >
          ok
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

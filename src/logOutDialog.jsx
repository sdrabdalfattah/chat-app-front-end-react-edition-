
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LogoutDialog({handleClose , open}) {


const handleLogout = () => {
  localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
  window.location.reload(); 
};



 return (
   <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="logout-dialog-title"
  aria-describedby="logout-dialog-description"
>
  <DialogTitle id="logout-dialog-title">
    {"Are you sure you want to log out?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="logout-dialog-description">
      You will be logged out from your current session. Do you want to continue?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button variant='contained' onClick={handleLogout} color="error" autoFocus>
      log out
    </Button>
  </DialogActions>
</Dialog>

  );
}
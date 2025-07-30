
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useSelectedUser } from "./contexts/SelectedUserContext";




export default function DelelteDialog({handleClose , open}) {

const { selectedUser } = useSelectedUser();
const receiverId = selectedUser?._id;

const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

const handleDelete = async () => {
    console.log(userId , "--", selectedUser)
  if (!userId || !receiverId) return;

  try {
    await axios.delete(`https://chat-app-backend-1-tni2.onrender.com/delete_chat/${userId}/${receiverId}`);



    location.reload()
    console.log("Chat deleted successfully");
  } catch (error) {
    console.error("Failed to delete chat:", error);
  }
};

 return (
   <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="logout-dialog-title"
  aria-describedby="logout-dialog-description"
>
  <DialogTitle id="logout-dialog-title">
    {"delete chat"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="logout-dialog-description">
      are you shure you want to delete this chat ?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button variant='contained' onClick={handleDelete} color="error" autoFocus>
      delete
    </Button>
  </DialogActions>
</Dialog>

  );
}

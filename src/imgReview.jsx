import Modal from '@mui/material/Modal';

export default function ImgReview({setopenIMG,openIMG,img}) {

  const handleClose = () => {
    setopenIMG(false);
  };


  return (
    <>

      <Modal 
        open={openIMG}
        onClose={handleClose}
      sx={{alignItems:"center",backdropFilter:"blur(15px)",background:"rgba(0, 0, 0, 0.47)",justifyContent:"center",display:"flex"}}
      >
        <img
          style={{ borderRadius: "10px", maxWidth: "80%",maxHeight:"80vh",outline:"none" ,border:"none"}}
          src={`https://chat-app-backend-z319.onrender.com${img}`}
          alt="preview"
        />
      </Modal>
    </>
  );
}

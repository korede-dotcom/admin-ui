import React,{useState} from 'react'
import { TextField,Modal,Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function EditModal({children,open,handleClose}) {
    const [opens,setOpen] = useState(open && open)

    // const handleOpen = () => {
    //     setOpen(open);
    //   };
    
      // const handleClose = () => {
      //   setOpen(!opens);
      // };

  return (
    <div>
        
          <Modal
               open={opens}
               onClose={handleClose}
               aria-labelledby="modal-title"
               aria-describedby="modal-description"
             >
               <Box
                 sx={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   bgcolor: 'background.paper',
                   border: '2px solid #000',
                   boxShadow: 24,
                   p: 4,
                   width: 400,
                 }}
               >
                 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
       
                {children}
              </Box>
            </Modal>

    </div>
  )
}

export default EditModal
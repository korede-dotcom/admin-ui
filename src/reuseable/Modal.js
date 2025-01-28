import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Modal as Moda} from '@mui/material/';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

function Modal({children}) {
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalCompo>
    <Moda
        open={open}
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
            width:400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius:10,
            p: 4,
          }}
          css={`
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  `}
         
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 id="modal-title">Add Event Manager</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <p id="modal-description">Please fill out the form below:</p>
          <form noValidate autoComplete="off">
            {/* <TextField fullWidth label="Name" sx={{py:1}} />
            <TextField fullWidth label="Email" sx={{py:1}} />
            <TextField fullWidth label="Phone Number" sx={{py:1}} />
            <TextField fullWidth label="address" sx={{py:1}} /> */}

            {children}
          
            <Button
                variant="contained"
                fullWidth
                onClick={handleClose}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>

          </form>
        </Box>
      </Moda>
    </ModalCompo>

  )
}

const ModalCompo = styled.div`
  background-color: red !important;


 

`

export default Modal
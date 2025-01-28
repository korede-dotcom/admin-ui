import React, { Children, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
// import SettingsIcon from '@mui/icons-material/Add';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

function Add({contentText,children,isLarge,btntext,onSubmit,sty,formdata,Close}) {
  const [open, setOpen] = useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() =>{
    setOpen(false);
  },[Close])


  return (
    <div>
      {isLarge ? 
        <Button variant="contained" onClick={handleOpen} sx={{color:"#fff",float:'left'}}>
          {btntext}
        </Button>:
         <Button variant="contained" onClick={handleOpen} sx={{color:"#fff",float:'right'}}>
         {btntext}
       </Button>
    //   :   <IconButton onClick={handleOpen}
    //     style={{ float: 'right', color: 'info', background: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}
    //     aria-label="add">
    //   <SettingsIcon />
    // </IconButton>
        
        
        }
      <Modal
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
              width: '50vw',
              maxWidth: '70%',
              bgcolor: 'background.paper',
              boxShadow: 54,
              borderRadius: 10,
              p: 4,
            }}
          
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 id="modal-title">{contentText}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <p id="modal-description">Please fill out the form below:</p>
          <form noValidate autoComplete="off" style={sty} encType={formdata ? 'encType="multipart/form-data' : ''}>
            {children}
            {/* <TextField fullWidth label="Name" sx={{py:1}} color="primary"  />
            <TextField fullWidth label="Email" sx={{py:1}}color="primary"  />
            <TextField fullWidth label="Phone Number" sx={{py:1}}color="primary"  />
            <TextField fullWidth label="address" sx={{py:2}} color="primary" />
            <small>Manager type</small>
            <Select sx={{width:'100%',py:1}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          placeholder="manager type"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
          
            {/* <Button
                variant="contained"
                fullWidth
                onClick={onSubmit}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button> */}

          </form>
        </Box>
      </Modal>
    </div>
  );
}


export default Add
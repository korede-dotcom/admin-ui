import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

function Selector(handlechange) {
  const [value, setValue] = useState('');

//   const handleChange = (e) => handlechange;
//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

  return (
  
      <Select value={value} onChange={handlechange} label="Select an option">
      <MenuItem value="">None</MenuItem>
      <MenuItem value="option1" disabled={value === "option1"}>Option 1</MenuItem>
      <MenuItem value="option2" disabled={value === "option2"}>Option 2</MenuItem>
      <MenuItem value="option3" disabled={value === "option3"}>Option 3</MenuItem>
    </Select>
  );
}

export default Selector
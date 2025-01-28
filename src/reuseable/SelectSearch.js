import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%',
    height:'100%'
  },
  room:{
    paddingTop:"10px",
    outline:"none"
  }
}));

function SearchAndSelect({users,handleChange,selectedOption,placeholder,style}) {
  const classes = useStyles();
//   const [selectedOption, setSelectedOption] = useState('');

  const options =  users ;

//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   };

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        className={style ? classes.room : classes.select}
        placeholder={placeholder ? placeholder : "Select a staff"}
        isSearchable
      />
    </div>
  );
}

export default SearchAndSelect;

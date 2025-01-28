/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {useEffect, useState} from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/branch/data/authorsTableData";
import projectsTableData from "layouts/branch/data/projectsTableData";
import Add from "reuseable/add";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Add';

import { CreateBranch,getAllBranch,UpdateBranch } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import MenuItem from '@mui/material/MenuItem';
import EditModal from "reuseable/EditModal";
import {useBooleanStore} from "context"



function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [values, setValues] = useState([]);
  const [age, setAge] = useState('');
  const [branch,setBranch] = useState([])
  const [errrmsg, seterrrmsg] = useState('');
  const [closemodal,setclosemodal] = useState(false)
  const [showEditModal,setshowEditModal] = useState(false)
  const handleChange = (event) => {
    setAge(event.target.value);
  };
 
  const [select, setselect] = useState({
    name:"",
    state:"",
    address:"",
   })
   
   const handleOnChange = (e) => {
     const { value, name } = e.target
     
     setselect((prev) => {
       return {...prev, [name]:value}
      })
      
    }
    console.log("🚀 ~ select:", select)

 const createBranch = (event) => {
  mutate(select)
};


const booleanState = useBooleanStore((state) => state.booleanState);

// useEffect(() => {
//   setshowEditModal(booleanState)
// },[booleanState])

  const { mutate, isLoading,isError} = useMutation({
    mutationFn: CreateBranch,
    onSuccess: (data) => {
      window.location.assign('/branch')
      setclosemodal(true)
    }  ,
    onError: (err) => {
      console.log("🚀 ~ file: index.js:145 ~ err:", err?.response?.data.errors[0].msg)
      seterrrmsg(err?.response?.data.errors[0].msg)
      setTimeout(()=> {
        seterrrmsg("")
      },2000)
      
    } 
});

  const { mutate:updateBranchs, isLoadingBranch,isErrorBranch} = useMutation({
    mutationFn: UpdateBranch,
    onSuccess: (data) => {
      window.location.assign('/branch')
      setclosemodal(true)
    }  ,
    onError: (err) => {
      console.log("🚀 ~ file: index.js:145 ~ err:", err?.response?.data.errors[0].msg)
      seterrrmsg(err?.response?.data.errors[0].msg)
      setTimeout(()=> {
        seterrrmsg("")
      },2000)
      
    } 
});

const updateB = (event) => {
  updateBranchs({body:{...select},id:JSON.parse(localStorage.getItem("branchId"))})
};


const { datah} = useQuery({
  
  queryKey:['getAllBranch'],
  queryFn: () => getAllBranch(),
  onSuccess:(d) =>{
    setBranch(d?.data?.braches)
  }
  // onError: (err) => {
 
});


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Add isLarge={true} btntext="Add Branch" >
        <p style={{color:"red"}}>{errrmsg}</p>
           <TextField fullWidth label="Name" name="name" sx={{py:1}} color="primary" onChange={handleOnChange} />
            <TextField fullWidth label="state" name="state" sx={{py:1}}color="primary" onChange={handleOnChange}  />
            <TextField fullWidth label="address" name="address" sx={{py:2}} color="primary" onChange={handleOnChange} />
            {/* <small>Manager type</small>
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
        <Button
                variant="contained"
                fullWidth
                onClick={createBranch}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>
        </Add>
        <Add  btntext="add image to branch" />
     
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {
              booleanState  && (
                <EditModal open={booleanState}  handleClose={ () => {useBooleanStore.setState({ booleanState: !booleanState })}}>
                 <TextField fullWidth label="Name" name="name" sx={{py:1}} color="primary" onChange={handleOnChange} />
            <TextField fullWidth label="state" name="state" sx={{py:1}}color="primary" onChange={handleOnChange}  />
            <TextField fullWidth label="address" name="address" sx={{py:2}} color="primary" onChange={handleOnChange} />
            <Button
                variant="contained"
                fullWidth
                onClick={updateB}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>
            </EditModal>
              )
            }
      
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Branch Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
              <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  canNextPage={true}
                  rowsPerPageOptions={[1]}
                  pageSize={[1]}
                  canSearch={true}

                />

           
                
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  pageSize={3}
                  rowsPerPageOptions={[5]}
                  
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;

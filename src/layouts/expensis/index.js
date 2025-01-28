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
import {useState} from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "./data/authorsTableData";
import projectsTableData from "./data/projectsTableData";
import Add from "reuseable/add";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Add';

import { CreateBranch,getAllBranch,CreateExpensis,getAllUsers,UpdateAnyUser,AllExpensis } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import {useBooleanStore} from "context"
import EditModal from "reuseable/EditModal";

function Tables () {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate()
  const role_id = JSON.parse(localStorage.getItem("role_id"))

  const [values, setValues] = useState([]);
  const [sec, setSec] = useState([
    <MenuItem value={2}>eventmanager</MenuItem>,
    <MenuItem value={3}>gymmanager</MenuItem>,
    <MenuItem value={4}>shortletmanager</MenuItem>,
    <MenuItem value={5}>secretary</MenuItem>,
    <MenuItem value={7}>hotel receptionist</MenuItem>,
    <MenuItem value={8}>gym receptionist</MenuItem>,
    <MenuItem value={9}>event receptionist</MenuItem>,
    <MenuItem value={6}>Other staffs</MenuItem> 
  ]);
  const [ceomap, setCeomap] = useState([
    <MenuItem value={2}>eventmanager</MenuItem>,
    <MenuItem value={3}>gymmanager</MenuItem>,
    <MenuItem value={4}>shortletmanager</MenuItem>,
    <MenuItem value={5}>secretary</MenuItem>,
    <MenuItem value={7}>shortlet receptionist</MenuItem>,
    <MenuItem value={8}>gym receptionist</MenuItem>,
    <MenuItem value={9}>event receptionist</MenuItem>,
    <MenuItem value={6}>Other staffs</MenuItem>
  ]);
  const [staff, setStaff] = useState('');
  const [errrmsg, seterrrmsg] = useState('');
  const [branch,setBranch] = useState([])
  const [staffbranch,setStaffBranch] = useState('')
  const [closemodal,setclosemodal] = useState(false)
  const [getusers,setUsers] = useState([])
  const [getExpensis,setExpensis] = useState([])
  console.log("🚀 ~ file: index.js:74 ~ getusers:", getusers)

  const booleanState = useBooleanStore((state) => state.booleanState);
  const staffDetails = JSON.parse(localStorage.getItem("staffId"))

  const [select, setselect] = useState({
    name:"",
    amount:"",
      
   })
  console.log("🚀 ~ select:", select)
  const [select2, setselect2] = useState({
    name:"",
    address:"",
    phonenumber:"",
    email:"",
    // branch_id:"",
    // role_id:"",
    // state:"",
    
   })
  const handleChange = (event) => {
    const { value, name } = event.target
    setStaff(value);

    setselect(prev => {
      return {
        ...prev,
        [name]:parseInt(value)
      }
    })
  };

  const handleStaffChange = (event) => {
    const { value, name } = event.target
    setStaffBranch(value);
    setselect(prev => {
      return {
        ...prev,
        [name]:parseInt(value)
      }
    })

  };

  const handleStaffEditChange = (event) => {
    const { value, name } = event.target
    console.log("🚀 ~ handleStaffEditChange ~ value, name:", value, name)
    // setStaffBranch(value);
    setselect2(prev => {
      return {
        ...prev,
        [name]:value
      }
    })

  };

  console.log(staffbranch)
 
  console.log("🚀 ~ file: index.js:70 ~ select:", select2)

  const handleOnChange = (e) => {
    const { value, name } = e.target
   
    setselect((prev) => {
        return {...prev, [name]:value}
     })
     
 }

 const CreateAnyUserBtn = (event) => {
  mutate(select)
};
 const UpadaterAnyUserBtn = (event) => {
  updatedUser({body:{...select2},id:staffDetails?.user?._id})
};

  const { mutate, isLoading,isError} = useMutation({
    mutationFn: CreateExpensis,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      window.location.href = '/expensis'
      setclosemodal(true)
      
    },
    onError: (err) => {
      console.log("🚀 ~ file: index.js:145 ~ err:", err?.response?.data.errors[0].msg)
      seterrrmsg(err?.response?.data.errors[0].msg)
      setTimeout(()=> {
        seterrrmsg("")
      },2000)
      
    }  
});
  const { mutate:updatedUser} = useMutation({
    mutationFn: UpdateAnyUser,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      window.location.href = '/staffs'
      setclosemodal(true)
      
    },
    onError: (err) => {
      console.log("🚀 ~ file: index.js:145 ~ err:", err?.response?.data.errors[0].msg)
      seterrrmsg(err?.response?.data.errors[0].msg)
      setTimeout(()=> {
        seterrrmsg("")
      },2000)
      
    }  
});


const {fecthBranch} = useQuery({
  
  queryKey:['getAllBranch'],
  queryFn: () => getAllBranch(),
  onSuccess:(d) =>{
    setBranch(d?.data?.braches)

  }
  // onError: (err) => {
 
});

const {getAllUser} = useQuery({
  
  queryKey:['getAllUsers'],
  queryFn: () => getAllUsers(),
  onSuccess:(d) =>{
    setUsers(d?.data?.users)
  }
  // onError: (err) => {
 
});

  
  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Add isLarge={true} btntext="Add Expensis" Close={closemodal} >
       
          <p style={{color:"red"}}>{errrmsg}</p>
           <TextField fullWidth label="type" name="name" sx={{py:1}} color="primary" onChange={handleOnChange} />
            <TextField fullWidth label="amount" name="amount" sx={{py:1}}color="primary" onChange={handleOnChange}  />
     
           
            {
              staff && staff !== 5 && (
                <>
                <small sx={{fontSize:'14px'}}>staff branch</small>
                <Select sx={{width:'100%',py:1}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={staffbranch}
                    label="Staff Branch"s
                    onChange={handleStaffChange}
                    placeholder="staffbranch"
                    name="branch_id"
                  >
                  {branch && branch.map(d => {
                    return (
                      <MenuItem value={d._id}>{d.name}</MenuItem>
                      // <MenuItem value={0}>{'work for ceo'}</MenuItem>
                    )
                  })}
                
              </Select>
            </>
              )
            }
        <Button
                variant="contained"
                fullWidth
                onClick={CreateAnyUserBtn}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>
        </Add>
        {/* <Add  btntext="add image to branch" /> */}

        {
              booleanState  && (
                <EditModal open={booleanState}  handleClose={ () => {useBooleanStore.setState({ booleanState: !booleanState })}}>
                  <>
                  <p style={{color:"red"}}>{errrmsg}</p>
           <TextField fullWidth defaultValue={staffDetails?.user?.name}  label="Name" name="name" sx={{py:1}} color="primary" onChange={handleStaffEditChange} />
            <TextField fullWidth defaultValue={staffDetails?.phonenumber} label="phonenumber" name="phonenumber" sx={{py:1}}color="primary" onChange={handleStaffEditChange}  />
            <TextField fullWidth defaultValue={staffDetails?.address} label="address" name="address" sx={{py:2}} color="primary" onChange={handleStaffEditChange} />
            <TextField fullWidth defaultValue={staffDetails?.user?.email} label="email" name="email" sx={{py:2}} type="email" color="primary" onChange={handleStaffEditChange} />
            {/* <TextField fullWidth label="state" name="state" sx={{py:2}} type="text" color="primary" onChange={handleOnChange} /> */}
            {/* <small sx={{fontSize:'14px'}}>Manager type</small> */}
            {/* <Select defaultValue={staffDetails?.user?.role_id} sx={{width:'100%',py:1,mb:3}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={staff}
                label="Staff"
                onChange={handleChange}
                placeholder="Staff type"
                name="role_id"
              >
                {[2,3,4].includes(role_id) ? 
                   <MenuItem value={6}>Other staffs</MenuItem>
                   :
                   (role_id === 5) ? 
                    sec.map(d => d)
                  
                   :
                  ceomap.map(d => d)
              
              }
             
          </Select>
            {
              staff && staff !== 5 && (
                <>
                <small sx={{fontSize:'14px'}}>staff branch</small>
                <Select sx={{width:'100%',py:1}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={staffbranch}
                    label="Staff Branch"
                    onChange={handleStaffChange}
                    placeholder="staffbranch"
                    name="branch_id"
                  >
                  {branch && branch.map(d => {
                    return (
                      <MenuItem value={d._id}>{d.name}</MenuItem>
                      // <MenuItem value={0}>{'work for ceo'}</MenuItem>
                    )
                  })}
                
              </Select>
            </>
              )
            } */}
        <Button
                variant="contained"
                fullWidth
                onClick={UpadaterAnyUserBtn}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>
    
                  </>
                </EditModal>
              )

        }
     
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                  Expensis Table
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
                  rowsPerPageOptions={5}
                  pageSize={5}
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

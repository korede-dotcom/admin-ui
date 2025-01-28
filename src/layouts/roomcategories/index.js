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

import { CreateBranch,getAllBranch,Rooms,getAllUsers,CreateRoom } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import MenuItem from '@mui/material/MenuItem';
import RoomTable from  "reuseable/RoomTable"
import Checkbox from '@mui/material/Checkbox';
import { MuiFileInput } from 'mui-file-input'
import { Input } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedIcon from '@mui/icons-material/Bed';

function Tables() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const role_id = JSON.parse(localStorage.getItem("role_id"))

  const [values, setValues] = useState([]);
  const [file, setFile] = useState(null)
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
    <MenuItem value={7}>hotel receptionist</MenuItem>,
    <MenuItem value={8}>gym receptionist</MenuItem>,
    <MenuItem value={9}>event receptionist</MenuItem>,
    <MenuItem value={6}>Other staffs</MenuItem>
  ]);
  const [staff, setStaff] = useState('');
  const [branch,setBranch] = useState([])
  const [staffbranch,setStaffBranch] = useState('')
  const [getusers,setUsers] = useState([])
  const [getRooms,setRooms] = useState([])
  const [getclose,setclose] = useState(false)
  console.log("🚀 ~ file: index.js:74 ~ getusers:", getRooms)

  const [select, setselect] = useState({
           room_number: null,
            room_name: "",
            type: null,
            price: null,
            num_beds: null,
            number_of_guests: null,
            has_wifi: true,
            description: "",
            service_id: 2,
            branch: null,
            image: null
            
    
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
    console.log("🚀 ~ file: index.js:101 ~ select:", select)
  
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
  const handleNumberChange = (event) => {
    const { value, name } = event.target
    setselect(prev => {
      return {
        ...prev,
        [name]:parseInt(value)
      }
    })

  };

  console.log(staffbranch)
 
  console.log("🚀 ~ file: index.js:70 ~ select:", select)

  const handleFileUpload = (event) => {
    // const files = event.target.files;
    setselect(prevState => ({ ...prevState, image: event.target.files }));


  };

  const handleOnChange = (e) => {
    const { value, name } = e.target
   
    setselect((prev) => {
        return {...prev, [name]:value}
     })
     
 }

 const CreateAnyUserBtn = (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('room_number', select.room_number);
  formData.append('room_name', select.room_name);
  formData.append('type', select.type);
  formData.append('price', select.price);
  formData.append('num_beds', select.num_beds);
  formData.append('number_of_guests', select.number_of_guests);
  formData.append('has_wifi', select.has_wifi);
  formData.append('description', select.description);
  formData.append('service_id', select.service_id);
  formData.append('branch', select.branch);
  formData.append('status', select.status);
  Array.from(select.image).forEach((file, index) => {
    formData.append(`image`, file);
  });
  mutate(formData)
};
// const {geRooms} = useQuery({
  
//   queryKey:['Rooms'],
//   queryFn: () => Rooms(),
//   onSuccess:(d) =>{
//     setRooms(d?.data?.pkgs)
//   }
//   // onError: (err) => {
 
// });
const { data, isloading, error, refetch } = useQuery({
  queryKey: ['Rooms'],
  queryFn: () => Rooms(),
  onSuccess: (d) => {
    setRooms(d?.data?.pkgs)
  },
  // onError: (err) => {},
});



//   const { mutate, isLoading,isError} = useMutation({
//     mutationFn: CreateRoom,
//     onSuccess: (data) => {
//       if(data?.data?.status){
//         const { data, isloading, error, refetch } = useQuery({
//           queryKey: ['Rooms'],
//           queryFn: () => Rooms(),
//           onSuccess: (d) => {
//             setRooms(d?.data?.pkgs)
//           },
//           // onError: (err) => {},
//         });
//         setTimeout(() => {
//           refetch();
//         }, 5000);

//       }
      
//         return  setclose(!getclose)
      
     
//     }  
// });

const { mutate, isLoading, isError } = useMutation({
  mutationFn: CreateRoom,
  onSuccess: (data) => {
    if (data?.data?.status) {
      setRooms((prevRooms) => [...prevRooms, data?.data?.pkg]);
    }
    return  setclose(!getclose)
  },
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
        <Add Close={getclose ? true : false} formdata={true} isLarge={true} btntext="Add Rooms" sty={{height:"70vh",overflow:"scroll",display:"flex",gap:"5px",flexWrap:"wrap",width:"100%"}} >
           <TextField fullWidth label="Name" name="room_name" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth label="Room Number" name="room_number" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth label="Room Type" name="type" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
           <TextField fullWidth label="Room price" name="price" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
            <TextField fullWidth label="number of beds" name="num_beds" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  />
            <TextField fullWidth label="number of guest" name="number_of_guests" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  />
              <TextField fullWidth label="description" name="description" sx={{py:1,width:"80%"}} color="primary" onChange={handleOnChange} />
              {
              // staff && staff !== 5 && (
                <div style={{width:"100%"}}>
                <small sx={{fontSize:'14px'}}>branch</small>
                <Select sx={{width:'100%',py:1}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={staffbranch}
                    label="Staff Branch"
                    onChange={handleStaffChange}
                    placeholder="staffbranch"
                    name="branch"
                  >
                  {branch && branch.map(d => {
                    return (
                      <MenuItem value={d._id}>{d.name}</MenuItem>
                      // <MenuItem value={0}>{'work for ceo'}</MenuItem>
                    )
                  })}
                
              </Select>
            </div>
              // )
            }
            <div style={{width:"80%"}}>
              <span style={{fontWeight:"100",fontSize:"15px"}}>wifi</span>
              <Select sx={{width:'100%',py:1,mb:3}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={staff}
                label="Staff"
                onChange={handleChange}
                placeholder="Staff type"
                name="role_id"
              >
               
              <MenuItem value={"yes"}>yes</MenuItem>
              <MenuItem value={"no"}>no</MenuItem>
              
          </Select>
            </div>
            <Input
      type="file"
      name="image"
      inputProps={{ multiple: true }}
      onChange={handleFileUpload}/>
     
           
        <Button
                variant="contained"
                fullWidth
                onClick={CreateAnyUserBtn}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            {isLoading ? "...loading" : "Submit"}
            </Button>
        </Add>
        {/* <Add  btntext="add image to branch" /> */}
        {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
      <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Eventhall"
                  icon={
                   <EventAvailableIcon/>
                  }
                />
                <Tab
                  label="Shortlet"
                  icon={
                    // <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    //   email
                    // </Icon>
                    <BedIcon/>
                  }
                />
                <Tab
                  label="Gym"
                  icon={
                   <FitnessCenterIcon/>
                  }
                />
              </Tabs>
            </AppBar>
            </Grid> */}
     
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
                  Rooms Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <RoomTable data={getRooms && getRooms}/> */}
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
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  canNextPage={true}
                  rowsPerPageOptions={[1]}
                  pageSize={[1]}
                  canSearch={true}
                  

                /> */}
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

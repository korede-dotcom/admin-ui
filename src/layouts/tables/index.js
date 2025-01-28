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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Add from "reuseable/add";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Modal from "reuseable/Modal";

import EditModal from "reuseable/EditModal"
import { TextField,Modal,Box } from "@mui/material";
import {useBooleanStore} from "context"

import { CreateBranch,getAllBranch,Rooms,GetEventPkg,EventPkg,UpadateEventPkg } from "services/Dashboard";

function Tables() {
  const { columns, rows,openmodal } = authorsTableData();

  const eventDetails = JSON.parse(localStorage.getItem("eventId"))
  console.log("🚀 ~ eventDetails:", eventDetails)

  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [branch,setBranch] = useState([])
  const [eventpkg,seteventpkg] = useState([])
  const [staffbranch,setStaffBranch] = useState('')
  const [getclose,setclose] = useState(false)
  const [select,setselect] = useState({
    event_type:"",
    description:"",
    openning_time:"",
    closing_time:"",
    number_of_gusets:"",
    price:"",
    branch_id:"",
    service_id:eventDetails?.service_id,
  })
  console.log("🚀 ~ file: index.js:59 ~ select:", select)

  const booleanState = useBooleanStore((state) => state.booleanState);
  

  const handleOnChange = (e) =>{
    const {name,value} = e.target
    setselect(prev => {
      return {
        ...prev,
        [name]:value
      }
    })
  }

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

  const {fecthBranch} = useQuery({
  
    queryKey:['getAllBranch'],
    queryFn: () => getAllBranch(),
    onSuccess:(d) =>{
      setBranch(d?.data?.braches)
    }
    // onError: (err) => {
   
  });



  const { data, isloading, error, refetch } = useQuery({
    queryKey: ['GetEventPkg'],
    queryFn: () => GetEventPkg(),
    onSuccess: (d) => {
      seteventpkg(d?.data?.pkgs)
    },
    // onError: (err) => {},
  });
  setTimeout(() => {
    refetch();
  }, 5000);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: EventPkg,
    onSuccess: (data) => {
      if (data?.data?.status) {
        seteventpkg((prevPkg) => [...prevPkg, data?.data?.pkg]);
      }
      return  setclose(!getclose)
    },
  });

  const { mutate:updateEventPrice} = useMutation({
    mutationFn: UpadateEventPkg,
    onSuccess: (data) => {
      if (data?.data?.status) {
        seteventpkg((prevPkg) => [...prevPkg, data?.data?.pkg]);
      }
      return  setclose(!getclose)
    },
  });
  

  const CreateAnyUserBtn = (event) => {
    event.preventDefault();
    mutate(select)
    
  };
  const updateEvent = (event) => {
    event.preventDefault();
    updateEventPrice({body:{...select},id:eventDetails?._id})
    
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Add Close={getclose ? true : false} isLarge={true} btntext="Add eventtype">
        <TextField fullWidth label="event type" name="event_type" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth label="description" name="description" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth type="time" label="openning_time" name="openning_time" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
           <TextField fullWidth type="time" label="closing_time" name="closing_time" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
           <TextField fullWidth label="number_of_gusets" name="number_of_gusets" sx={{py:1,width:"40%"}}  color="primary" onChange={handleStaffChange} />
           <TextField fullWidth label="pricee" name="price" sx={{py:1,width:"40%"}}  color="primary" onChange={handleStaffChange} />
            {/* <TextField fullWidth label="number of beds" name="num_beds" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  /> */}
            {/* <TextField fullWidth label="number of guest" name="number_of_guests" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  /> */}
              {/* <TextField fullWidth label="description" name="description" sx={{py:1,width:"80%"}} color="primary" onChange={handleOnChange} />  */}
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
                    name="branch_id"
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
             <Button
            variant="contained"
            fullWidth
            onClick={CreateAnyUserBtn}
            sx={{ mt: 2, px: 2, color: '#fff' }}
            >
        {isLoading ? "...loading" : "Submit"}
        </Button>
        </Add>


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
                  Event Type Price Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <EventTable data={eventpkg && eventpkg}/> */}
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
               
              {/*  */}
                
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


        {
            booleanState && 
            (
              <EditModal open={booleanState}  handleClose={ () => {useBooleanStore.setState({ booleanState: !booleanState })}}>
                  <TextField fullWidth defaultValue={eventDetails?.event_type} label="event type" name="event_type" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth defaultValue={eventDetails?.description} label="description" name="description" sx={{py:1,width:"40%"}} color="primary" onChange={handleOnChange} />
           <TextField fullWidth defaultValue={eventDetails?.openning_time} type="time" label="openning_time" name="openning_time" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
           <TextField fullWidth defaultValue={eventDetails?.closing_time}  type="time" label="closing_time" name="closing_time" sx={{py:1,width:"40%"}}  color="primary" onChange={handleOnChange} />
           <TextField fullWidth defaultValue={eventDetails?.number_of_gusets}  label="number_of_gusets" name="number_of_gusets" sx={{py:1,width:"40%"}}  color="primary" onChange={handleStaffChange} />
           <TextField fullWidth defaultValue={eventDetails?.price}  label="pricee" name="price" sx={{py:1,width:"40%"}}  color="primary" onChange={handleStaffChange} />
            {/* <TextField fullWidth label="number of beds" name="num_beds" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  /> */}
            {/* <TextField fullWidth label="number of guest" name="number_of_guests" sx={{py:1,width:"40%"}} color="primary" onChange={handleNumberChange}  /> */}
              {/* <TextField fullWidth label="description" name="description" sx={{py:1,width:"80%"}} color="primary" onChange={handleOnChange} />  */}
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
                    name="branch_id"
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
             <Button
            variant="contained"
            fullWidth
            onClick={updateEvent}
            sx={{ mt: 2, px: 2, color: '#fff' }}
            >

            </Button>
            </EditModal>
           
            )
        }
      
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;

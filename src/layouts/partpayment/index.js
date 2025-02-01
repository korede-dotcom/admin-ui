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

import { CreateBranch,getAllBranch,CreateExpensis,getAllUsers,UpdateAnyUser,AllExpensis,UpdateExpensis,EventBookPart,EventBookPartUpdate } from "services/Dashboard";
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
  const staffDetails = JSON.parse(localStorage.getItem("partId"))

  const [select, setselect] = useState({
    name:"",
    amount:"",
      
   })
  const [select2, setselect2] = useState({
    name:"",
    amount:"",
    // phonenumber:"",
    // email:"",
    // branch_id:"",
    // role_id:"",
    // state:"",
    
   })
const [updatedFields, setUpdatedFields] = useState({});

   const [getEvent, setEvent] = useState({
     first_name: "",
     last_name: "",
     email: "",
     phone_number: "",
     address: "",
     payment_mode: "",
     event_type:"",
     amount:undefined,
     superstart:"",
     plus:"",
    //  branch_id:null
     // date:selectedDate ?? new Date(selectedDate && selectedDate).toLocaleDateString('en-GB')
   });

   const bookeEvents = (e) => {
    const { value, name } = e.target
    // const price = eventpkg?.find(d => d?._id === getEvent?.event_type)
    setEvent((prev) => {
      return {...prev, [name]:value,/*amount:Number(price?.price).*/branch_id:JSON.parse(localStorage.getItem("branchId"))}
    })

      
     console.log("🚀 ~ file: Checkcalendar.js:57 ~ bookeEvents ~ getEvent:", getEvent)
  }
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



//   const handleOnChange = (e) => {
//     const { value, name } = e.target
   
//     setselect((prev) => {
//         return {...prev, [name]:value}
//      })
     
//  }

 const CreatePart = (event) => {
  if (!navigator.onLine) {
    alert("No internet connection. Please check your network.");
  }
  mutate(getEvent)
};
 const PartUpadater = (event) => {
  updatedPart({_id:staffDetails?._id,...updatedFields})
};

  const { mutate, isLoading,isError} = useMutation({
    mutationFn: EventBookPart,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      window.location.href = '/partpayment'
      setclosemodal(true)
      
    },
    // onError: (err) => {
    //   console.log("🚀 ~ file: index.js:145 ~ err:", err?.response?.data.errors[0].msg)
    //   seterrrmsg(err?.response?.data.errors[0].msg)
    //   setTimeout(()=> {
    //     seterrrmsg("")
    //   },2000)
      
    // }  
    onError: (err) => {
      let errorMessage = "An unknown error occurred. Please try again.";
  
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (err?.response?.data?.errors?.length) {
        // Handle validation errors from API
        errorMessage = err.response.data.errors
          .map((e) => `${e.param}: ${e.msg}`)
          .join("\n");
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message; // API error message
      } else if (err?.message) {
        errorMessage = err.message; // General error (e.g., network issue)
      }
  
      alert(errorMessage);
    },
});
  const { mutate:updatedPart} = useMutation({
    mutationFn: EventBookPartUpdate,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      window.location.href = '/partpayment'
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

  
console.log("🚀 ~ updatedFields:", updatedFields)

const handleUpdate = (e) => {
  const { name, value } = e.target;

  setUpdatedFields((prevState) => ({
    ...prevState,
    [name]: value, // Store only updated fields
  }));
};
  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <MDBox pt={6} pb={3 }>
        <Add isLarge={true} btntext="Add Event Booking partpayment" Close={closemodal} 
        
        >
          <p style={{color:"red"}}>{errrmsg}</p>
         
            <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 500px))",
        gap: "16px",
        padding: "16px",
      }}>
              <input  style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
            }} type="date" name="date" placeholder="selectdate" onChange={bookeEvents} />
           <TextField fullWidth label="first_name" name="first_name" sx={{py:1}} color="primary" onChange={bookeEvents} />
            <TextField fullWidth label="last_name" name="last_name" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="email" name="email" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="phone_number" name="phone_number" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="address" name="address" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="event_type" name="event_type" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="amount" name="amount" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="superstart" name="superstart" sx={{py:1}}color="primary" onChange={bookeEvents}  />
            <TextField fullWidth label="plus" name="plus" sx={{py:1}}color="primary" onChange={bookeEvents}  />

            </div>
            <small>payment mode</small>
<br/>
            <Select sx={{width:'100%',py:1}}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  // value={staffbranch}
  label="Staff Branch"
  // onChange={handleStaffChange}
  onChange={bookeEvents}
  placeholder="payment_mode"
  name="payment_mode"
  
>
    <MenuItem value="card">card</MenuItem>
    <MenuItem value="cash">cash</MenuItem>
    <MenuItem value="free">free</MenuItem>
    <MenuItem value="cheque">cheque</MenuItem>
    <MenuItem value="transfer">transfer</MenuItem>
    <MenuItem value="scanbank">bankscan</MenuItem>


</Select>
     
           
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
                onClick={CreatePart}
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
                  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two columns
    gap: "16px",
    padding: "16px",
  }}>
    <input  
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        width: "100%", // Ensures full width within grid cell
      }} 
      type="date" 
      name="date" 
      defaultValue={staffDetails?.date} 
      onChange={handleUpdate} 
    />
    
    {["first_name", "last_name", "email", "phone_number", "address", "event_type", "amount", "superstar", "plus"].map((field) => (
      <TextField 
        key={field}
        fullWidth 
        label={field.replace("_", " ")} 
        name={field} 
        defaultValue={staffDetails?.[field]} 
        sx={{ py: 1 }} 
        color="primary" 
        onChange={handleUpdate} 
      />
    ))}

    <div style={{ gridColumn: "span 2" }}> {/* Ensures "Payment Mode" spans full width */}
      <small>Payment Mode</small>
      <Select 
        sx={{ width: '100%', py: 1 }}
        defaultValue={staffDetails?.payment_mode}
        name="payment_mode"
        onChange={handleUpdate}
      >
        {["card", "cash", "free", "cheque", "transfer", "scanbank"].map((mode) => (
          <MenuItem key={mode} value={mode}>{mode}</MenuItem>
        ))}
      </Select>
    </div>
  </div>
           
        <Button
                variant="contained"
                fullWidth
                onClick={PartUpadater}
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
                  Partpayment Table
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

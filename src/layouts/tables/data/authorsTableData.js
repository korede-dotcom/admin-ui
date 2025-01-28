/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import CloseIcon from '@mui/icons-material/Close'; 

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { CreateBranch,getAllBranch,GetEventPkg,UpadateEventPkg } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import EventIcon from '@mui/icons-material/Event';
// import Modal from "reuseable/Modal";
import EditModal from "reuseable/EditModal";
import { TextField,Modal,Box,Button } from "@mui/material";
import {useBooleanStore} from "context"

export default function data() {
  const [branch,setBranch] = useState([])
  const [eventpkg,seteventpkg] = useState([])
  const [eventid,seteventid] = useState()
  const [open,setopen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const booleanState = useBooleanStore((state) => state.booleanState);

  const toggleState = () => {
    useBooleanStore.setState({ booleanState: !booleanState });
  };

  const caset = (id) => {
    localStorage.setItem("eventId",JSON.stringify(id))
    toggleState()
  }

  const userRole = JSON.parse(localStorage.getItem("role_id"))

  function toggleEventStatus(eventId, currentStatus) {
    console.log("🚀 ~ file: authorsTableData.js:39 ~ toggleEventStatus ~ eventId:", !currentStatus)
    // Assuming eventpkg is managed using useState
    const updatedEventpkg = eventpkg.map((event) =>
      event._id === eventId ? { ...event, status: !currentStatus } : event
    );
    seteventid(eventId)
    seteventpkg(updatedEventpkg);
    editevent({
      status:!currentStatus
    })
  
    // Call your activateEvent function here if needed
    // activateEvent(eventId);
  }
  const handleChange = (e)=> {
    console.log("🚀 ~ file: authorsTableData.js:68 ~ handleChange ~ e:", e.target.value)
   
  }

  const { mutate: editevent, isLoading: editeventloading } = useMutation({
    mutationFn: UpadateEventPkg,
    onSuccess: (data) => {
      if (data.status) {
        console.log("Updated event:", data);
      }
    },
    onError: (error) => {
      console.error("Error updating event:", error);
    },
  });

  function toggleEventStatus(eventId, currentStatus) {
    editevent({
      id:eventId,
      body:{
        status:!currentStatus
      }
    });
    seteventid(eventId); // Update eventid first
    const updatedEventpkg = eventpkg.map((event) =>
      event._id === eventId ? { ...event, status: !currentStatus } : event
    );
    seteventpkg(updatedEventpkg);
  
    
  }



  const handledit = (id) => {
    setIsModalOpen(!isModalOpen)
    seteventid(id)
    // setopen(true)
    console.log(open)
    
   

  
  }

  const EditEvent = () => {
    editevent({
      id:eventid,
      body:{
        status:!currentStatus
      }
    });
  }
  
  

  const { datah} = useQuery({
  
    queryKey:['getAllBranch'],
    queryFn: () => getAllBranch(),
    onSuccess:(d) =>{
      setBranch(d?.data?.braches)
    }
    // onError: (err) => {
   
  });

  function CurrencyDisplay({ value }) {
    const formattedValue = value.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return <span>{formattedValue}</span>;
  }

  const { data, isloading, error, refetch } = useQuery({
    queryKey: ['GetEventPkg'],
    queryFn: () => GetEventPkg(),
    onSuccess: (d) => {
      seteventpkg( d && d?.data?.pkgs)
    },
    // onError: (err) => {},
  });
  // setTimeout(() => {
  //   refetch();
  // }, 5000);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={<EventIcon/>} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

 

  return {
    columns: [
      { Header: "name", accessor: "author", width: "45%", align: "left" },
      { Header: "branch", accessor: "branch", align: "left" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "amount", accessor: "amount", align: "center" },
      // { Header: "state", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: userRole === 9  ? "":"view", accessor: "view", align: "center" },
      
      // { Header: "employed", accessor: "employed", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],


    

    rows: [...eventpkg?.map(d => {
     
        return {
          author: <Author image={<EventIcon/>} name={d?.event_type}  email={d?.description}/>,
          branch: <Job title={[]} description={d?.branch?.name} />,
          address: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {d?.branch?.address}
            </MDTypography>
          ),
          amount: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
           <CurrencyDisplay value={parseInt(d?.price)} />
            </MDTypography>
          ),
          status: (
            <MDBox ml={-1}>
            <MDBadge badgeContent={d.status ? 'active' : 'not active'} color="success" variant="gradient" size="sm" />
            <Switch
              checked={d.status}
              onChange={() => toggleEventStatus(d._id, d.status)} // Pass current status to toggle
              inputProps={{ 'aria-label': 'controlled' }}
              style={{
                color: d.status ? 'green' : 'red', // Set the color based on status
              }}
            />
            </MDBox>
          ),
          // action: (
          //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          //     Edit
          //   </MDTypography>
          // ),
          view: (
            
            <MDTypography variant="caption" color="text" fontWeight="medium" style={{display:`${userRole === 9 ? "none" : ""}`}} >
             <p onClick={(id) => caset(d)} >Edit</p>            
            </MDTypography>
          ),
        }
    })
 
    ],
  };
}

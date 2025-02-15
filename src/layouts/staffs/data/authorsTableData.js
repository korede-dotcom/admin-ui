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
import { useState,useEffect } from "react";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { CreateBranch,getAllBranch,CreateAnyUser,getAllUsers,ApproveAnyUser } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {useBooleanStore} from "context"
import Switch from '@mui/material/Switch';


export default function data() {
  const [getusers,setUsers] = useState([])
  const [userpkg,setuserpkg] = useState([])
  const [userid,setuserid] = useState()

  const booleanState = useBooleanStore((state) => state.booleanState);

const toggleState = () => {
  useBooleanStore.setState({ booleanState: !booleanState });
};

const caset = (id) => {
  localStorage.setItem("staffdetails",JSON.stringify(id))
  toggleState()

  console.log("🚀 ~ isOpen:", booleanState)
}


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0]}`,
    };
  }
  


  const {getAllUser} = useQuery({
  
  queryKey:['getAllUsers'],
  queryFn: () => getAllUsers(),
  onSuccess:(d) =>{
    setUsers(d?.data?.users)
  }
  // onError: (err) => {
 
});


const { mutate: approve,} = useMutation({
  mutationFn: ApproveAnyUser,
  onSuccess: (data) => {
    if (data.status) {
      console.log("Updated event:", data);
      window.location.reload();
    }
  },
  onError: (error) => {
    console.error("Error updating event:", error);
  },
});


function toggleEventStatus(eventId, currentStatus) {
  console.log("🚀 ~ file: authorsTableData.js:39 ~ toggleEventStatus ~ eventId:", !currentStatus)
  // Assuming eventpkg is managed using useState
  const updatedEventpkg = userpkg.map((event) =>
    event._id === eventId ? { ...event, status: !currentStatus } : event
  );
  setuserid(eventId)
  setuserpkg(updatedEventpkg);
  approve({
    status:!currentStatus,
    id:eventId
  })

  // Call your activateEvent function here if needed
  // activateEvent(eventId);
}


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <Stack direction="row" spacing={2}>
              {image ?
                <Avatar
                  alt="Remy Sharp"
                  src={d?.image}
                  sx={{ width: 56, height: 56 }}
                />
              
              :  <Avatar {...stringAvatar(`${name.slice(0,3)} ${name.slice(-1,3)}`)} />}
              </Stack>
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
      { Header: "name", accessor: "name", align: "left" },
      { Header: "role", accessor: "role", align: "left" },
      { Header: "salary", accessor: "salary", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed On", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [...getusers.map(d => {
      return (
        {
          name: <Author image={d?.image} name={d?.user?.name} email={d?.user?.email} />,
          role: <Job title={d?.user?.roleName.toUpperCase()} description={d?.branch?.name || "works with CEO"} />,
          salary: <Job title={`#${d?.salary}`}  />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={d?.user?.status} color={d?.user?.status ? "success": "warning"} variant="warning" size="sm" />
            </MDBox>
          ),
          status: (
            <MDBox ml={-1}>
            <MDBadge badgeContent={d?.user?.status ? 'active' : 'not active'}color={d?.user?.status ? "success": "warning"} variant="gradient" size="sm" />
            <Switch
              checked={d?.user?.status}
              onChange={() => toggleEventStatus(d?.user?._id, d?.user?.status)} // Pass current status to toggle
              inputProps={{ 'aria-label': 'controlled' }}
              style={{
                color: d?.user?.status ? 'green' : 'red', // Set the color based on status
              }}
            />
            </MDBox>
          ),
          employed: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {new Date(d?.createdAt).toLocaleString('en-US')}
            </MDTypography>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             
             <p onClick={(id) => caset(d)}>Edit</p>
            </MDTypography>
          ),
        }
      )

    })
    ],
  };
}

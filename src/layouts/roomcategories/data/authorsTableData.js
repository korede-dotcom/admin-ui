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
import { useState } from "react";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { CreateBranch,getAllBranch,CreateAnyUser,getAllUsers,Rooms } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function data() {
  const [getusers,setUsers] = useState([])
  console.log("🚀 ~ file: authorsTableData.js:38 ~ getusers:", getusers)

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
  


  const {getAllRoom} = useQuery({
  
  queryKey:['getAllRooms'],
  queryFn: () => Rooms(),
  onSuccess:(d) =>{
    setUsers(d?.data?.pkgs)
  }
  // onError: (err) => {
 
});

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <Stack direction="row" spacing={2}>
              {image ?
                // <Avatar
                //   alt="Remy Sharp"
                //   src={image}
                //   sx={{ width: 100, height: 100 }}
                // />
                <img src={image} width="100" height="70" />
              
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

  const Job = ({ title, description,roomName }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
      <br/>
      <MDTypography variant="captions">{roomName}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "details", accessor: "details", align: "left" },
      { Header: "branch", accessor: "branch", align: "left" },
      { Header: "no", accessor: "no", align: "center" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "createdAt", accessor: "createdAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [...getusers?.map(d => {
      return (
        {
          details: <Author image={d?.picture[0]} name={d?.room_name} email={d?.type} />,
          branch: <Job title={d?.branch?.name} description={d?.branch?.address} />,
        
          no: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {/* {new Date(d?.createdAt).toLocaleString('en-US')} */}
              {`Room` + d?.room_number}
            </MDTypography>
          ),
          price: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {/* {new Date(d?.createdAt).toLocaleString('en-US')} */}
              {d?.price}
            </MDTypography>
          ),
          createdAt: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {new Date(d?.createdAt).toLocaleString('en-NG')}
            </MDTypography>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
          ),
        }
      )

    })
    ],
  };
}

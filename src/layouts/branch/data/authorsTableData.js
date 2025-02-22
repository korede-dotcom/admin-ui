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

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import {useEffect, useState} from "react";
import { CreateBranch,getAllBranch } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import {useBooleanStore} from "context"


export default function data() {
  const [branch,setBranch] = useState([])

  const booleanState = useBooleanStore((state) => state.booleanState);

  const toggleState = () => {
    useBooleanStore.setState({ booleanState: !booleanState });
  };


const caset = (id) => {
  localStorage.setItem("branchId",JSON.stringify(id))
  toggleState()

  console.log("🚀 ~ isOpen:", booleanState)
}

console.log("🚀 ~ isOpen:", booleanState)
  const { datah} = useQuery({
  
    queryKey:['getAllBranch'],
    queryFn: () => getAllBranch(),
    onSuccess:(d) =>{
      setBranch(d?.data?.braches)
    }
    // onError: (err) => {
   
  });

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
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
      { Header: "state", accessor: "function", align: "left" },
      { Header: "address", accessor: "status", align: "center" },
      { Header: "view", accessor: "view", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [...branch.map(d => {
        return {
          author: <Author image={team2} name={d.name}  email={d.address}/>,
          function: <Job title={d.state.toUpperCase()} description="Nigeria" />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={d.status ? "active" : "not active"} color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          employed: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              23/04/18
            </MDTypography>
          ),
          action: (
            <MDTypography   component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Editeee
            </MDTypography>
          ),
          view: (
            <MDTypography  component="a" href="#" variant="caption" color="text" fontWeight="medium">
             <p onClick={(id) => caset(d?._id)}>Edit</p>
            </MDTypography>
          ),
        }
    })]

    
  };
}

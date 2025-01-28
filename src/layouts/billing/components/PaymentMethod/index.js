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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import Add from "reuseable/add";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { CreateService } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [getService,setService] = useState({
    name:''
  })
  const handleChange = (e) => {
    const {name,value} = e.target
    setService((prev) => {
      return {...prev, [name]:value}
   })
  
  }

  const CreateServiceBtn = (event) => {
    mutate(getService)
  };

  const { mutate, isLoading,isError} = useMutation({
    mutationFn: CreateService,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      
    }  
});


  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Quick Add
        </MDTypography>
        {/* <MDButton variant="gradient" color="dark" >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add services */}
          <Add sx={{background:'none'}} btntext="Add Services">
            <p>create a service</p>
          <Select sx={{width:'100%',py:1,mb:3}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getService?.name}
                label="Staff"
                onChange={handleChange}
                placeholder="Staff type"
                name="name"
              >
                <MenuItem value={"eventhall"}>eventhall</MenuItem>
                <MenuItem value={"gym"}>Gym</MenuItem>
                <MenuItem value={"shortlet"}>shortlet</MenuItem>
              </Select>

              <Button
                variant="contained"
                fullWidth
                onClick={CreateServiceBtn}
                sx={{ mt: 2, px: 2, color: '#fff' }}
                >
            Submit
            </Button>


          </Add>
        {/* </MDButton> */}
      </MDBox>
      <MDBox p={2}>
     
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
               <MDBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} /> 
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
               Assign Manager to services
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    add
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid> */}
          {/* <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`, cursor:'pointer'
              }}
            >
               <MDBox component="img" src={visaLogo} alt="master card" width="10%" mr={2} /> 
              <MDTypography variant="h6" fontWeight="medium">
                 ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248 
                create domestic Staffs
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    add
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid> */}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;

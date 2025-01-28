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

import { useState,useRef } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { userLogin } from "services/Auth";
import { useMutation } from "@tanstack/react-query"; 


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [err, seterr] = useState("")


  const [select, setselect] = useState({
    password:"",
    username:"",
   })

    const handleOnChange = (e) => {
       const { value, name } = e.target
      
       setselect((prev) => {
           return {...prev, [name]:value}
        })
        
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      mutate(select) 
    
    // if(!select.password.length || !select.username.length){
        
    //     seterr("please input details")
    //     setTimeout(()=>{
    //         seterr("")
    //     },2000)
    //     return
    //  }
    }

//   const { mutate, isLoading,isError} = useMutation({
//     mutationFn: userLogin,
//     onSuccess: (data) => {
//       console.log("🚀 ~ file: index.js:107 ~ Basic ~ data:", data)
//       if(data.status = 'success'){
//         localStorage.setItem("token",JSON.stringify(data?.token))
//         localStorage.setItem("role_id",JSON.stringify(data?.data.user.role_id))
//         localStorage.setItem("roleName",JSON.stringify(data?.data.user.roleName.toUpperCase()))
//         window.location.href = "/dashboard";

//         // console.log(ata.message)
//         // seterr(data.message)
//         // setTimeout(() => {
//         //   seterr('')
//         // }, 2000);
  

//       }


//     },
//     onError: (datas) =>{
//         console.log(datas)
//        seterr(datas.response.data.message)
//        setTimeout(()=>{
//         seterr("")
//     },2000)
//     // return 
//     }
// });

const { mutate, isLoading, isError,error,data } = useMutation({
  mutationFn: userLogin,
  onSuccess: (data) => {
    console.log("🚀 ~ file: index.js:107 ~ Basic ~ data:", data)
    if (data.status === 'success') {
      localStorage.setItem("token", JSON.stringify(data?.token))
      localStorage.setItem("role_id", JSON.stringify(data?.data.user.role_id))
      localStorage.setItem("username", JSON.stringify(data?.data.user.name))
      localStorage.setItem("roleName", JSON.stringify(data?.data.user.roleName.toUpperCase()))
      localStorage.setItem("roleName", JSON.stringify(data?.data.user.roleName.toUpperCase()))
      window.location.href = "/dashboard";
    }
  },
  onError: (data) => {
    console.log(data);
    seterr("incorrect email or password");
    setTimeout(() => {
      seterr("");
    }, 2000);
  }
});




  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
           {err.length ? err :" Sign in" }
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit} >
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="email" fullWidth onChange={handleOnChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" fullWidth onChange={handleOnChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit} >
                {isLoading ? 'loading' : 'sign in' }
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              {/* <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography> */}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

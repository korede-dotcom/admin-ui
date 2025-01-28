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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Imggrid from "reuseable/Imggrid";
import Checkcalendar from "reuseable/Checkcalendar";
import Hotelcalendar from "reuseable/Hotelcalendar";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import breakpoints from "assets/theme/base/breakpoints";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedIcon from '@mui/icons-material/Bed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { useState,useEffect } from "react";

function Overview() {

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  console.log("🚀 ~ file: index.js:68 ~ Overview ~ tabValue:", tabValue)


  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const roleName = JSON.parse(localStorage.getItem("roleName"))
  const roleid = JSON.parse(localStorage.getItem("role_id"))

  const eventUsers = [2,9]
  const hotelUsers = [4,7]
  const gymUsers = [3,8]


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={5} />
      <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
      <AppBar position="static">
              {/* <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}> */}
                {
                  eventUsers.includes(roleid) ? (
                    <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                    <Tab
                  label="Eventhall"
                  icon={
                   <EventAvailableIcon/>
                  }
                  />
                   </Tabs>
                ) : hotelUsers.includes(roleid) ? (
                  <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                    <Tab
                      label="Shortlet"
                      icon={
                        // <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        //   email
                        // </Icon>
                        <BedIcon/>
                      }
                    />
                    </Tabs>
                ) : gymUsers.includes(roleid) ?(
                  <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab
                  label="Gym"
                  icon={
                   <FitnessCenterIcon/>
                  }
                  />
                    </Tabs>
                ) : (
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
                  
                )
                }
                {/* <Tab
                  label="Eventhall"
                  icon={
                   <EventAvailableIcon/>
                  }
                />
               
                <Tab
                  label="Gym"
                  icon={
                   <FitnessCenterIcon/>
                  }
                /> */}
              {/* </Tabs> */}
            </AppBar>
            </Grid>
            <br/>
      {/* <Header> */}

     {
      tabValue === 0 ?
      <Checkcalendar/> : (tabValue === 1) ? <Hotelcalendar/> : <Checkcalendar/>
     }
       
      {/* </Header> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

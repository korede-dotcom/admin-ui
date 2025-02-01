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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import routesEventReception from "routesEventReception"
import hotelroutes from "hotelroutes"
import gymroutes from "gymRoutes"


import SignIn from "layouts/authentication/sign-in";


import InActivityTimeOut from "hooks/InActivityTimeOut";
import ProtectedRoute from "hooks/ProtectedRoute";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Dashboard from "layouts/dashboard";
import Event from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Edit from "layouts/edit";
import Gallery from "layouts/gallery";
import Calendar from "layouts/calendar";
import PartPayment from "layouts/partpayment";
// import Calendar from "./reuseable/Hotelcalendar";
import Dyna from "./reuseable/Dyna"

import Todo from "layouts/todo";
import Branch from "layouts/branch";
import Staffs from "layouts/staffs";
import Expensis from "layouts/expensis";
import Rooms from "layouts/rooms";
import RoomCategories from "layouts/roomcategories";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  

  // return direction === "rtl" ? (
  //   <CacheProvider value={rtlCache}>
  //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
  //       <CssBaseline />
  //       {layout === "dashboard" && (
  //         <>
  //           <Sidenav
  //             color={sidenavColor}
  //             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //             brandName="Material Dashboard 2"
  //             routes={routes}
  //             onMouseEnter={handleOnMouseEnter}
  //             onMouseLeave={handleOnMouseLeave}
  //           />
  //           <Configurator />
  //           {configsButton}
  //         </>
  //       )}
  //       {layout === "vr" && <Configurator />}
  //       <Routes>
  //         {getRoutes(routes)}
  //         <Route path="*" element={<Navigate to="/dashboard" />} />
  //       </Routes>
  //     </ThemeProvider>
  //   </CacheProvider>
  // ) : (
  //   <ThemeProvider theme={darkMode ? themeDark : theme}>
  //     <CssBaseline />
  //     {layout === "dashboard" && (
  //       <>
  //         <Sidenav
  //           color={sidenavColor}
  //           brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //           brandName="Material Dashboard 2"
  //           routes={routes}
  //           onMouseEnter={handleOnMouseEnter}
  //           onMouseLeave={handleOnMouseLeave}
  //         />
  //         <Configurator />
  //         {configsButton}
  //       </>
  //     )}
  //     {layout === "vr" && <Configurator />}
  //     <Routes>
  //       {getRoutes(routes)}
  //       <Route path="*" element={<Navigate to="/dashboard" />} />
  //     </Routes>
  //   </ThemeProvider>
  // );
  const roleName = JSON.parse(localStorage.getItem("roleName"))
  const roleid = JSON.parse(localStorage.getItem("role_id"))
  const eventUsers = [2,9]
  const hotelUsers = [4,7]
  const gymUsers = [3,8]
  return(
    <ThemeProvider theme={darkMode ? themeDark : theme}>
       <CssBaseline />
       {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName={roleName}
            routes={eventUsers.includes(roleid) ?routesEventReception : hotelUsers.includes(roleid) ? hotelroutes :gymUsers.includes(roleid) ? gymroutes : routes }
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes >
        <Route element={<InActivityTimeOut/>}>
          <Route path="/" element={<SignIn/>}/>
          <Route element={<ProtectedRoute/>}>
             {/* {getRoutes(routes)} */}
             <Route path="/dashboard" element={<Dashboard/>} />
             <Route path="/events" element={<Event/>} />
             <Route path="/services" element={<Billing/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/gallery" element={<Gallery/>} />
             <Route path="/calendar" element={<Calendar/>} />
             <Route path="/partpayment" element={<PartPayment/>} />
             <Route path="/expensis" element={<Expensis/>} />
             <Route path="/todo" element={<Todo/>} />
             <Route path="/branch" element={<Branch/>} />
             <Route path="/edit" element={<Edit/>} />
             <Route path="/staffs" element={<Staffs/>} />
             <Route path="/roomcategories" element={<RoomCategories/>} />
             <Route path="/rooms" element={<Rooms/>} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </ThemeProvider>
  )
}

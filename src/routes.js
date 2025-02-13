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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import Gallery from "layouts/gallery";
import Calendar from "layouts/calendar";
import Expensis from "layouts/expensis";
import Todo from "layouts/todo";
import Branch from "layouts/branch";
import Staffs from "layouts/staffs";
import Rooms from "layouts/rooms";
import PartPayment from "layouts/partpayment";
import RoomCategories from "layouts/roomcategories";
// import Gym from "layouts/gym";
// import Hotel from "layouts/hotel";



// @mui icons
import Icon from "@mui/material/Icon";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MRoom from '@mui/icons-material/HotelTwoTone';
import GroupIcon from '@mui/icons-material/Group';


const role = localStorage.getItem("role_id")




const routes = [

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Branch",
    key: "branch",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/branch",
    component: <Branch />,
  },
  {
    type: "collapse",
    name: "Staffs",
    key: "staffs",
    icon: <GroupIcon/>,
    route: "/staffs",
    component: <Staffs />,
  },
  {
    type: "collapse",
    name: "services",
    key: "services",
    icon: <ElectricalServicesIcon/>,
    route: "/services",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Event Pricing",
    key: "events",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/events",
    component: <Tables />,
  },
  // {
  //   type: "collapse",
  //   name: "Gym bookings",
  //   key: "gym",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/gym",
  //   component: <Gym />,
  // },
  // {
  //   type: "collapse",
  //   name: "hotel bookings",
  //   key: "hotel",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/hotel",
  //   component: <Hotel />,
  // },
  // {
  //   type: "collapse",
  //   name: "Shortlet",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">hotel</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "calendar & Bookings",
    key: "calendar",
    icon: <CalendarMonthIcon/>,
    route: "/calendar",
    component: <Calendar />,
  },
  {
    type: "collapse",
    name: "partpayment",
    key: "partpayment",
    icon: <CalendarMonthIcon/>,
    route: "/partpayment",
    component: <PartPayment />,
  },
  {
    type: "collapse",
    name: "expenses",
    key: "expenses",
    icon: <CalendarMonthIcon/>,
    route: "/expenses",
    component: <Expensis />,
  },
  {
    type: "collapse",
    name: "roomcategories",
    key: "roomcategories",
    icon: <MRoom/>,
    route: "/roomcategories",
    component: <RoomCategories />,
  },
  {
    type: "collapse",
    name: "rooms",
    key: "rooms",
    icon: <MRoom/>,
    route: "/rooms",
    component: <Rooms />,
  },
  {
    type: "collapse",
    name: "todo",
    key: "todo",
    icon: <AssignmentTurnedInIcon/>,
    route: "/todo",
    component: <Todo />,
  },
  // {
  //   type: "collapse",
  //   name: "calendar Bookings",
  //   key: "calendar",
  //   icon: <Icon fontSize="small">bookings</Icon>,
  //   route: "/calendar",
  //   component: <Calendar />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "gallery",
    key: "gallery",
    icon: <Icon fontSize="small">camera</Icon>,
    route: "/gallery",
    component: <Gallery />,
  },

  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;

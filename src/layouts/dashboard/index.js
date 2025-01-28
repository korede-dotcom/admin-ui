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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedIcon from '@mui/icons-material/Bed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import React, { useState } from "react";
// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { getDashboard } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard () {
  const role = JSON.parse(localStorage.getItem("role_id"))
  console.log("🚀 ~ file: index.js:46 ~ Dashboard ~ role:", role)
  const [eventGraph, setEventGraph] = useState({});
  const [tb, setTb] = useState("");
  const [counts, setCounts] = useState("")
  console.log("🚀 ~ tb:", tb)

 

  const {data,refetch} = useQuery({
    
    queryKey:['getDashboard'],
    queryFn: () => getDashboard(),
    onSuccess:(d) => {
      console.log("🚀 ~ d:", d)
      setEventGraph(d?.data?.sales); 
      setTb(d?.data?.sales);
  
      // setallbooking(d?.data?.allevents)
    }
    // onError: (err) => {
   
  });

  
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>

      <DashboardNavbar />

      <MDBox py={3}>
        {role === 1 && (
        <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<AccountBalanceWalletIcon/>}
                title="Total Expenses"
                count={tb?.totalExpense}
                percentage={{
                  color: "success",
                  amount: "0",
                  label: "General Revenue",
                }}
              />
            </MDBox>
          </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                 color="info"
                icon={<AccountBalanceWalletIcon/>}
                title="Event Revenue"
                count={tb?.tamount?.total_amount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "total income for all Event bookings",
                }}
              />
            </MDBox>
          </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<AccountBalanceWalletIcon/>}
                title="Hotel Revenue"
                count="0"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "total income for all Hotel bookings",
                }}
              />
            </MDBox>
          </Grid>
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<AccountBalanceWalletIcon/>}
                title="Gym Revenue"
                count="0"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "total income for all gym bookings",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Bookings"
                count={tb?.eventCount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<FitnessCenterIcon/>}
                title="Total Gym Bookings"
                count={0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<BedIcon/>}
                title="Total Hotel Bookings"
                count={0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<ApartmentIcon/>}
                title="Total Branch"
                count={tb?.countBranch}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<GroupAddIcon/>}
                title="Total Staffs"
                count={tb?.countManager}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
       
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        {role === 5 && (
        <Grid container spacing={3}>
       
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<FitnessCenterIcon/>}
                title="Total Gym Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<BedIcon/>}
                title="Total Hotel Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<ApartmentIcon/>}
                title="Total Branch"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<GroupAddIcon/>}
                title="Total Staffs"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
       
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        {role === 2 && (
        <Grid container spacing={3}>
       
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Expenses"
                count={tb?.totalExpense}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Revenue"
                count={tb?.tamount?.total_amount}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Bookings"
                count={tb?.eventCount}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
        
       
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        {role === 3 && (
        <Grid container spacing={3}>
      
        <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<AccountBalanceWalletIcon/>}
                title="Gym Revenue"
                count="34,000"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "total income for all gym bookings",
                }}
              />
            </MDBox>
          </Grid>
       
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<FitnessCenterIcon/>}
                title="Total Gym Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
         
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<ApartmentIcon/>}
                title="Total Branch"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
     
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        {role === 4 && (
        <Grid container spacing={3}>
        
        <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<AccountBalanceWalletIcon/>}
                title="Hotel Revenue"
                count="34,999"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "total income for all Hotel bookings",
                }}
              />
            </MDBox>
          </Grid>
       
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<BedIcon/>}
                title="Total Hotel Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<ApartmentIcon/>}
                title="Total Branch"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<GroupAddIcon/>}
                title="Total rooms"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
       
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        {role === 9 && (
        <Grid container spacing={3}>
       
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Revenue"
                count={281}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<EventAvailableIcon/>}
                title="Total Event Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "*",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
        
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon={<ApartmentIcon/>}
                title="Total Branch"
                count={281}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "count",
                }}
              />
            </MDBox>
          </Grid>
         
       
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        )}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Events Hall"
                  description="records"
                  date="showing all event records"
                  chart={eventGraph}
                />
              </MDBox>
            </Grid>
           

            <Grid item xs={12} md={6} lg={4}>
              {/* <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Gym"
                  description={
                    <>
                    
                      records
                    </>
                  }
                  date="showing all gym records"
                  chart={[]}
                />
              </MDBox> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Hotel"
                  description="records"
                  date="showing all hotel records"
                  chart={[]}
                />
              </MDBox> */}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview  about='event'/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview  about='hotel'/>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview about='gym' />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

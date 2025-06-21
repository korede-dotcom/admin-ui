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

import React, { useState, useEffect, useCallback } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { TextField, Box, Button, CircularProgress, Backdrop } from '@mui/material';
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
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
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { getDashboard, getPastYearRecord } from "services/Dashboard";
import { useQuery } from '@tanstack/react-query';
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import debounce from 'lodash/debounce';

function Dashboard() {
  const [searchParams] = useSearchParams();
  const businessYear = searchParams.get('businessYear');
  const role = JSON.parse(localStorage.getItem("role_id"));
  const [eventGraph, setEventGraph] = useState({});
  const [tb, setTb] = useState("");
  const [counts, setCounts] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['getDashboard', businessYear, startDate, endDate],
    queryFn: () => getDashboard(businessYear, startDate, endDate),
    onSuccess: (d) => {
      setEventGraph(d?.data?.sales);
      setTb(d?.data?.sales);
    }
  });
 

const [pastYearRecords, setPastYearRecords] = useState([]);
const [yearRanges, setYearRanges] = useState([]);
const [selectedYearRange, setSelectedYearRange] = useState("");
const [isPastYearLoading, setIsPastYearLoading] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const yearRanges = years.map((year) => `${year}-${year + 1}`);
    setYearRanges(yearRanges);
    setSelectedYearRange(yearRanges[0]);
  }, []);

const { data: pastYearData, refetch: refetchPastYear } = useQuery({
  queryKey: ['getPastYearRecord', selectedYearRange],
  queryFn: () => getPastYearRecord(selectedYearRange.split('-')[0], selectedYearRange.split('-')[1]),
  enabled: false,
  onSuccess: (data) => {
    setPastYearRecords(data?.data?.data?.sales?.datasets?.data || []);
   
      setEventGraph(data?.data?.sales);
      setTb(data?.data?.sales);
    
  }
});

const handleFetchPastYearRecords = async () => {
  setIsPastYearLoading(true);
  await refetchPastYear();
  setIsPastYearLoading(false);
};

  // Debounced refetch function
  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 500),
    []
  );

  // Update the date change handlers
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (e.target.value && endDate) {
      debouncedRefetch();
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (startDate && e.target.value) {
      debouncedRefetch();
    }
  };

  const handleFilter = () => {
    refetch();
  };

  const { sales, tasks } = reportsLineChartData;

return (
  <DashboardLayout>
    <DashboardNavbar />
    <MDBox py={3}>
<ToggleButtonGroup
  value={selectedYearRange}
  exclusive
  onChange={(event, value) => setSelectedYearRange(value)}
  sx={{ mb: 2 }}
>
  {yearRanges.map((yearRange) => (
    <ToggleButton key={yearRange} value={yearRange}>
      {yearRange}
    </ToggleButton>
  ))}
</ToggleButtonGroup>
<Button variant="contained" onClick={handleFetchPastYearRecords}>
  {isPastYearLoading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={20} color="inherit" />
      <span>Loading...</span>
    </Box>
  ) : (
    `Fetch Records for ${selectedYearRange}`
  )}
</Button>
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ minWidth: 200 }}
          />
          <Button 
            variant="contained" 
            onClick={handleFilter}
            sx={{ 
              height: '56px', 
              minWidth: '100px',
              position: 'relative',
              '&:disabled': {
                backgroundColor: 'primary.main',
                opacity: 0.7
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Loading...</span>
              </Box>
            ) : (
              'Filter'
            )}
          </Button>
        </Box>

        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          open={isLoading}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <CircularProgress color="inherit" />
            <Box sx={{ 
              color: 'white', 
              fontSize: '1.2rem',
              fontWeight: 'medium'
            }}>
              Loading Dashboard Data...
            </Box>
          </Box>
        </Backdrop>

        {!isLoading && (
          <>
           {/* <Button variant="contained" onClick={handleFetchPastYearRecords}>
              Fetch Past Year Records
            </Button>*/}
            {pastYearRecords.length > 0 && (
              <Grid container spacing={3}>
                {pastYearRecords.map((record, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        color="info"
                        icon={<EventAvailableIcon />}
                        title={`Total Events ${record.year}`}
                        count={record.data.reduce((acc, curr) => acc + curr, 0)}
                        percentage={{
                          color: "success",
                          amount: "",
                          label: "count",
                        }}
                      />
                    </MDBox>
                  </Grid>
                ))}
              </Grid>
            )}

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
          </>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

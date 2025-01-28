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
import {useState} from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import Switch from '@mui/material/Switch';
import Add from "reuseable/add";
import { Services } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedIcon from '@mui/icons-material/Bed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Billing() {
  const [checked, setChecked] = useState(true);
  const [getService,setService] = useState([])
  console.log("🚀 ~ file: index.js:43 ~ getService:", getService)

  const [checkedStates, setCheckedStates] = useState({});
  console.log("🚀 ~ file: index.js:52 ~ checkedStates:", checkedStates)
  
  const handleChange = (event, serviceName) => {
    const newCheckedStates = { ...checkedStates };
    newCheckedStates[serviceName] = event.target.checked;
    setCheckedStates(newCheckedStates);
  };



  const {fecthBranch} = useQuery({
  
    queryKey:['Services'],
    queryFn: () => Services(),
    onSuccess:(d) =>{
      console.log("🚀 ~ d?.data?.services:", d?.data?.services)
      setService(d?.data?.services)
    }
    // onError: (err) => {
   
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {/* <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid> */}
                  <Grid item xs={12}>
                  <PaymentMethod/>
                </Grid>
                  {!getService.length && 
                     <Grid item xs={12} md={6} xl={4}>
                     <DefaultInfoCard
                         icon={<GroupAddIcon/> }
                         title="No service available please create one below"
                       >
                         <Switch
                           checked={checked}
                           onChange={handleChange}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />
                       </DefaultInfoCard>
                     </Grid>
                  
                  }
                  {getService && getService.map(d => {
                    const serviceName = d.name;
                    const isChecked = checkedStates[serviceName] ?? false;
                    return (
                      <Grid item xs={12} md={6} xl={4}>
                      <DefaultInfoCard
                          icon={d?.name === "eventhall" ?  <EventAvailableIcon/> : (d?.name === "gym") ? <FitnessCenterIcon/> : <ApartmentIcon/> }
                          title={d?.name}
                          description="Freelance Payment"
                          value="$455.00"
                        >
                          <Switch
                            checked={isChecked}
                            onChange={(event) => handleChange(event, serviceName)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </DefaultInfoCard>
                      </Grid>

                    )
                  })}
              
              
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mb={3}> */}
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={6}>
              <BillingInformation />
            </Grid> */}
            {/* <Grid item xs={12} md={4}>
              <Transactions />
            </Grid> */}
          {/* </Grid> */}
        {/* </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;

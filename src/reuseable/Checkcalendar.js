import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";
import SearchAndSelect from "./SelectSearch";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import { CreateBranch,getAllBranch,AllEventBook,EventBook,GetEventPkg,AllEventRecordFilter } from "services/Dashboard";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import jsPDF from "jspdf";
import "jspdf-autotable";

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log("🚀 ~ file: Checkcalendar.js:16 ~ selectedDate:", selectedDate)
  const [eventDetails, setEventDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
const [staffbranch,setStaffBranch] = useState('')
const [eventpkg,seteventpkg] = useState()
const [select,setselect] = useState()
const [getprice,setprice] = useState()
const [branch,setBranch] = useState([])
const [allbooking,setallbooking] = useState([])
const [getEvent, setEvent] = useState({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  address: "",
  payment_mode: "",
  event_type:"",
  amount:undefined,
  superstart:"",
  plus:"",
  branch_id:null
  // date:selectedDate ?? new Date(selectedDate && selectedDate).toLocaleDateString('en-GB')
});
const [dateRecord, setDateRecord] = useState({
  start:"",
  end:""
});
console.log("🚀 ~ file: Checkcalendar.js:36 ~ getEvent:", getEvent)
// const date = new Date("Tue May 02 2023 00:00:00 GMT+0100 (West Africa Standard Time)");

const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const cUser = JSON.parse(localStorage.getItem("role_id"))
const eventUsers = [1,2,9]

const isallowed = () => {
  return eventUsers.includes(cUser)
}

const {allEventBook,refetch} = useQuery({
  
  queryKey:['AllEventBook'],
  queryFn: () => AllEventBook(),
  onSuccess:(d) =>{
    setallbooking(d?.data?.allevents)
  }
  // onError: (err) => {
 
});
const {getallBranch} = useQuery({
  
  queryKey:['getAllBranch'],
  queryFn: () => getAllBranch(),
  onSuccess:(d) =>{
    setBranch(d?.data?.braches)
  }
  // onError: (err) => {
 
});

const { data, isloading, error } = useQuery({
  queryKey: ['GetEventPkg'],
  queryFn: () => GetEventPkg(),
  onSuccess: (d) => {
    seteventpkg(d?.data?.pkgs)
  },
  // onError: (err) => {},
});




const handleChange = (event) => {
  const { value, name } = event.target
  setStaff(value);

  setselect(prev => {
    return {
      ...prev,
      [name]:parseInt(value)
    }
  })
};

const handleStaffChange = (event) => {
  const { value, name } = event.target
  setStaffBranch(value);
  setEvent(prev => {
    return {
      ...prev,
      [name]:parseInt(value)
    }
  })

};






  const handleDateClick = (info) => {
    console.log("🚀 ~ file: Checkcalendar.js:95 ~ handleDateClick ~ info:", info)
    setSelectedDate(info.date);
    setEvent(prev => {
      return{
        ...prev,
        date:info?.dateStr
      }
    })
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    setEventDetails(info.event.extendedProps.booking);
    setModalOpen(true);
    console.log("🚀 ~ file: Checkcalendar.js:104 ~ handleEventClick ~ info.event:", info.event)
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setEventDetails(null);
    setNewEventTitle("");
  };

  const bookeEvents = (e) => {
    const { value, name } = e.target
    // const price = eventpkg?.find(d => d?._id === getEvent?.event_type)
    setEvent((prev) => {
      return {...prev, [name]:value,/*amount:Number(price?.price).*/branch_id:JSON.parse(localStorage.getItem("branchId"))}
    })

      
     console.log("🚀 ~ file: Checkcalendar.js:57 ~ bookeEvents ~ getEvent:", getEvent)
  }

  const dateChanged = (e) => {
    const {value,name} = e.target;
    setDateRecord((prev) => {
      return {...prev,[name]:value}
    })
  }

  console.log("🚀 ~ file: Checkcalendar.js:67 ~ dateRecord:", dateRecord)

  const handleNewEventSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    mutate(getEvent)
  };

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: EventBook,
    onSuccess: (data) => {
      if (data?.status) {
        refetch()
        setModalOpen(false);
    setSelectedDate(null);
    setEventDetails(null);
    setNewEventTitle("");
        // seteventpkg((prevPkg) => [...prevPkg, data?.data?.pkg]);
      }
      // return  setclose(!getclose)
    },
  });

  const isDateBooked = (date) => {
    // In this example, we assume that a date is booked if it already has an event associated with it
    const bookeEvents = [
      { title: "Event 1", start: "2023-04-01", allDay: false },
      { title: "Event 2", start: "2023-04-03", allDay: true },
    ];
    return bookeEvents.some((event) =>
      new Date(event?.start) ===  new Date(date)
    );
  };

  const getPrice = () => {
   const price = eventpkg?.find(d => d._id === getEvent?.event_type)
   console.log("🚀 ~ file: Checkcalendar.js:134 ~ getPrice ~ price:", price)
   
  }

  const { mutate: allEventRecord, isLoading: filterLoading, isError: filterError } = useMutation({
    mutationFn: ({ start, end }) => AllEventRecordFilter(start, end), // Pass function to execute
    onSuccess: (data) => {
      console.log("🚀 ~ data:", data);
      const downloadEventsAsCSV = (events) => {
        // Prepare the headers from the keys of the first event
        const headers = [
          "_id", "first_name", "last_name", "email", "phone_number", "address", "reference_id", 
          "event_type", "branch_name", "payment_mode", "amount", "date", "branch_id", 
          "booked_by", "createdAt", "updatedAt"
        ].join(","); // Extract CSV headers
        
        // Map through each event and format data accordingly
        const values = events.map((event) => {
          const formattedData = {
            _id: event._id,
            first_name: event.first_name,
            last_name: event.last_name,
            email: event.email,
            phone_number: event.phone_number,
            address: event.address || "N/A",
            reference_id: event.reference_id,
            event_type: event?.event_type || "N/A",
            // price: event.eventconfig?.price || "N/A",
            branch_name: event.branch?.name || "N/A",
            payment_mode: event.payment_mode,
            amount: event.amount,
            date: event.date,
            branch_id: event.branch_id,
            booked_by: event.booked_by,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
          };
      
          // Return a comma-separated list of values for each event
          return Object.values(formattedData).map(value => `"${value}"`).join(",");
        }).join("\n"); // Join all values with new lines
        
        // Combine headers and values
        const csvContent = `${headers}\n${values}`;
        
        // Create a Blob for the CSV file
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        
        // Generate a file name with the current date (using the current date as a placeholder)
        const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
        const fileName = `Samebrother_event_data_${currentDate}.csv`;
        
        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
      };
      
      
      // Example usage with one object
      
      
      // Trigger the download
      downloadEventsAsCSV(data.data.allevents);
            
      // You can handle additional success logic here, e.g., closing a modal
      // setclose(!getclose);
    },
    
  });

  const { mutate: allEventRecordPdf, isLoading: filterLoadingpdf, isError: filterErrorpdf } = useMutation({
    mutationFn: ({ start, end }) => AllEventRecordFilter(start, end), // Pass function to execute
    onSuccess: (datas) => {
      const data = datas.data.allevents
      console.log("🚀 ~ data:", data);

const downloadEventsAsPDF = (events) => {
  const pdf = new jsPDF();

  // Set Title
  pdf.setFontSize(16);
  pdf.text(`Samebrother Event Data :${dateRecord.start}-${dateRecord.end}`, 10, 10);

  // Prepare table data
  const headers = [
    "No.",
    "First Name",
    // "Last Name",
    "Email",
    "Phone Number",
    // "Address",
    "Reference ID",
    "Event Type",
    "Price",
    // "Branch Name",
    "Mode",
    // "Amount",
    "Date",
    // "Branch ID",
    // "Booked By",
    // "Created At",
    // "Updated At",
  ];

  const rows = events.map((data,i) => [
    // data._id,
    i + 1,
    data.first_name,
    // data.last_name,
    data.email,
    data.phone_number,
    // data.address || "N/A",
    data.reference_id,
    data?.event_type || "N/A",
    data?.amount || "N/A",
    // data.branch?.name || "N/A",
    data.payment_mode,
    // data.amount,
    data.date,
    // data.branch_id,
    // data.booked_by,
    // data.createdAt,
    // data.updatedAt,
  ]);

  // Add table to the PDF
  // pdf.autoTable({
  //   head: [headers],
  //   body: rows,
  //   startY: 20,
  //   theme: "grid", // Compact grid layout
  //   headStyles: {
  //     fillColor: [0, 128, 0], // Green header background
  //     textColor: [255, 255, 255], // White text color
  //     fontSize: 10, // Smaller header font size
  //   },
  //   bodyStyles: {
  //     fontSize: 9, // Smaller font for body rows
  //     cellPadding: 1, // Minimal padding
  //   },
  //   tableLineColor: [0, 0, 0], // Black border lines
  //   tableLineWidth: 0.1,
  //   alternateRowStyles: {
  //     fillColor: [245, 245, 245], // Light gray alternate rows
  //   },
  //   margin: { top: 15, left: 10, right: 10 }, // Adjust margins
  //   styles: {
  //     cellWidth: "wrap", // Ensure content fits without shrinking
  //   },
  // });

  pdf.autoTable({
    head: [headers],
    body: rows,
    startY: 15, // Start closer to the top
    theme: "grid", // Compact grid layout
    headStyles: {
      fillColor: [0, 128, 0], // Green header background
      textColor: [255, 255, 255], // White text color
      fontSize: 10, // Smaller header font size
    },
    bodyStyles: {
      fontSize: 9, // Smaller font for body rows
      cellPadding: 1, // Minimal padding
    },
    tableLineColor: [0, 0, 0], // Black border lines
    tableLineWidth: 0.1,
    alternateRowStyles: {
      fillColor: [245, 245, 245], // Light gray alternate rows
    },
    margin: { top: 5, left: 5, right: 5 }, // Set margins to 0 for edge alignment
    styles: {
      cellWidth: "wrap", // Ensure content fits without shrinking
    },
  });
  

  // Generate file name with the current date
  const currentDate = new Date().toISOString().split("T")[0];
  const fileName = `Samebrother_event_data_${currentDate}.pdf`;

  // Save the PDF
  pdf.save(fileName);
};

      
     
      
      
     
     // Example usage with one object
    
     
     // Trigger the download
     downloadEventsAsPDF(data);
     

            
      // You can handle additional success logic here, e.g., closing a modal
      // setclose(!getclose);
    },
    
  });
  
  const dateFilter = (e) => {
    const { start, end } = dateRecord;
    if (!start || !end) {
      e.target.disabled = true; // Disable button if dates are empty
    } else {
      allEventRecord({ start, end }); // Trigger mutation with required data
    }
  };
  const dateFilterPdf = (e) => {
    const { start, end } = dateRecord;
    if (!start || !end) {
      e.target.disabled = true; // Disable button if dates are empty
    } else {
      allEventRecordPdf({ start, end }); // Trigger mutation with required data
    }
  };

  const handleDownloadReceipt = (eventDetails) => {
    const {
      name,
      phone,
      address,
      mode,
      email,
      branch,
      amount,
      reference_id,
      superstar,
      plus,
      date,
    } = eventDetails;
  
    const pdf = new jsPDF();
  
    // Add luxury font styles
    pdf.setFont("times", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(34, 139, 34); // Green accent
    pdf.text("(Samebrothers Event Center)", 105, 20, { align: "center" });
  
    // Add luxury subtitle
    // pdf.setFont("times", "italic");
    // pdf.setFontSize(14);
    // pdf.setTextColor(60, 60, 60); // Subtle gray
    // pdf.text("Elegance and Excellence", 105, 30, { align: "center" });
    // Add luxury subtitle
    pdf.setFont("times", "italic");
    pdf.setFontSize(14);
    pdf.setTextColor(60, 60, 60); // Subtle gray
    pdf.text("Customers Receipt", 105, 30, { align: "center" });

    // pdf.setFont("times", "italic");
    // pdf.setFontSize(12);
    // pdf.setTextColor(60, 60, 60); // Subtle gray
    // pdf.text("NOTE: kinly bring this on the day of event thanks", 105, 40, { align: "center" });

    pdf.setFont("times", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(34, 139, 34); // Green text
    pdf.text(
      "NOTE: kindly bring this on the day of event for checking so we can serve you better",
      105,
      38,
      { align: "center" }
    );
  
    // Table Header
    const tableX = 20;
    const tableY = 50;
    const rowHeight = 12;
  
    pdf.setFont("times", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255); // White text
    pdf.setFillColor(34, 139, 34); // Green background for headers
    pdf.rect(tableX, tableY, 170, rowHeight, "F"); // Header rectangle
    pdf.text("Field", tableX + 5, tableY + 8);
    pdf.text("Details", tableX + 95, tableY + 8);
  
    // Table Data
    const fields = [
      ["Name", name || "N/A"],
      ["Phone", phone || "N/A"],
      ["Address", address || "N/A"],
      ["date", date || "N/A"],
      ["Payment Mode", mode || "N/A"],
      ["Email", email || "N/A"],
      ["Branch", branch || "N/A"],
      ["Reference ID", reference_id || "N/A"],
      ["Superstar", superstar || "N/A"],
      ["Additional Services", plus || "N/A"],
      ["Amount", `₦${amount?.toFixed(2) || "0.00"}`],
    ];
  
    let currentY = tableY + rowHeight;
  
    pdf.setFont("times", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0); // Black text
    fields.forEach(([field, value], index) => {
      const fillColor = index % 2 === 0 ? [240, 248, 240] : [255, 255, 255]; // Alternate row colors
      pdf.setFillColor(...fillColor);
      pdf.rect(tableX, currentY, 170, rowHeight, "F");
      pdf.text(field, tableX + 5, currentY + 8);
      pdf.text(value, tableX + 95, currentY + 8);
      currentY += rowHeight;
    });
  
    // Footer Section
    pdf.setFont("times", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(34, 139, 34); // Green text
    pdf.text(
      "Thank you for choosing Samebrothers Event Center ✨",
      105,
      currentY + 15,
      { align: "center" }
    );
  
    pdf.save(`${name ? name : "Event"}_Receipt.pdf`);
  };


  

  return (
    <div>
     <div style={{ 
          display: 'flex', 
          // flexDirection: 'column', 
          textAlign: 'center',
          gap: '1rem', 
          // maxWidth: '300px', 
          // margin: '20px auto', 
          // padding: '20px', 
          // border: '1px solid #ddd', 
          // borderRadius: '8px', 
          // backgroundColor: '#f9f9f9',
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
}}>
  <label style={{ fontWeight: 'bold', fontSize: '1rem' }}>Start Date: </label>
  <input
    type="date"
    value={dateRecord.start}
    name="start"
    onChange={dateChanged}
    style={{
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
    }}
  />

  <label style={{ fontWeight: 'bold', fontSize: '1rem' }}> End Date: </label>
  <input
    type="date"
    value={dateRecord.end}
    name="end"
    onChange={dateChanged}
    style={{
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
    }}
  /> 
  <button 
  onClick={dateFilter}
  style={{
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.2s'
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
  onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
  onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
  onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
>
 {filterLoading ? "loading..." : "Download Report"} 
</button>
  <button 
  onClick={dateFilterPdf}
  style={{
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.2s'
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
  onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
  onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
  onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
>
 {filterLoading ? "loading..." : "Download Report Pdf"} 
</button>

</div>


      {
        isallowed && 
          <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
  
          events={[
            ...allbooking.map(d => {
              return {
                title:d?.event_type,start:d?.date,
                extendedProps:{
                  booking: {
                    name: `${d?.first_name} ${d?.last_name}`,
                    phone:d?.phone_number ,
                    address:d?.address,
                    mode:d?.payment_mode,
                    date:d?.date,
                    email:d?.email,
                    branch:d?.branch?.name,
                    amount:d?.amount,
                    reference_id:d?.reference_id,
                    superstar:d?.superstar,
                    plus:d?.plus,
                    // guestEmail: "johndoe@example.com",
                    // guestPhone: "123-456-7890",
                    // guestsCount: 2,
                    },
                }
              }
            })
          ]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventClassNames={(info) =>
            isDateBooked(info.event.start) ? "booked-date" : "free-date"
          }
        />
        
      }

      <Dialog open={modalOpen} onClose={handleModalClose}> 
        {selectedDate && (
      <form  onChange={(e) =>console.log(e)}>
          <DialogTitle>Book a new Event {moment(selectedDate).format("LL")}</DialogTitle>
          <DialogContent>
          <DialogContentText>
          Please provide your booking details below:
          </DialogContentText>
          <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
          <TextField
          required
          margin="dense"
          label="first name"
          type="text"
          name="first_name"
          // value={guestName}
          onChange={bookeEvents}
          />
          <TextField
          required
          margin="dense"
          label="last name"
          type="text"
          name="last_name"
          // value={guestName}
          onChange={bookeEvents}
          />
          
          <TextField
          required
          margin="dense"
          label="email"
          type="email"
          name="email"
          // value={guestEmail}
          onChange={bookeEvents}
          />
          <TextField
          required
          margin="dense"
          label="phone_number"
          type="tel"
          name="phone_number"
          // value={guestPhone}
          onChange={bookeEvents}
          />
          <TextField
          required
          margin="dense"
          label="address"
          type="text"
          name="address"
          // value={guestsCount}
          onChange={bookeEvents}
          />
          <TextField
          required
          margin="dense"
          label="event_type"
          type="text"
          name="event_type"
          // value={guestsCount}
          onChange={bookeEvents}
          />
    <div style={{width:"100%",display:"flex",gap:"10px"}}>
  
      {/* <div style={{flex:"0.5",width:"50%"}}>
            <small>Event type</small>
            <br/> */}
            {/* <Select sx={{width:'100%',py:1}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={staffbranch}
              label="Staff Branch"
              // onChange={handleStaffChange}
              onChange={bookeEvents}
              placeholder="event_type"
              name="event_type"
  
      > */}

  {/* {
   isallowed && (eventpkg && eventpkg.map(d => {
      return (
        <MenuItem value={d?._id}>{d?.event_type}</MenuItem>

      )
    }))
  } */}
  


{/* </Select> */}
      {/* </div> */}
    
      <div style={{flex:"0.5",width:"50%"}}>
<small>branch</small>
<br/>
            <Select sx={{width:'100%',py:1}}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  // value={staffbranch}
  // onChange={handleStaffChange}
  value={staffbranch}
  label="Staff Branch"
  onChange={handleStaffChange}
  placeholder="branch_id"
  name="branch_id"
  
>
      {isallowed && branch.map(d => {
            return (
              <MenuItem value={d?._id}>{d?.name}</MenuItem>
              // <MenuItem value={0}>{'work for ceo'}</MenuItem>
            )
          })}
   


</Select>

      </div>
      
    </div>


<TextField
          required
          margin="dense"
          label="superstart"
          type="text"
          name="superstart"
          // value={getEvent && getEvent?.amount || 0}
          onChange={bookeEvents}
          />
  <br/>
<TextField
          required
          margin="dense"
          label="plus"
          type="text"
          name="plus"
          // value={getEvent && getEvent?.amount || 0}
          onChange={bookeEvents}
          fullWidth
          />
          <TextField
          required
          margin="dense"
          label="amount"
          type="number"
          name="amount"
          // value={getEvent && getEvent?.amount || 0}
          onChange={bookeEvents}
          />
  {/* <br/> */}
      <div style={{flex:"0.5",width:"50%"}}>
<small>payment mode</small>
<br/>
            <Select sx={{width:'100%',py:1}}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  // value={staffbranch}
  label="Staff Branch"
  // onChange={handleStaffChange}
  onChange={bookeEvents}
  placeholder="payment_mode"
  name="payment_mode"
  
>
    <MenuItem value="card">card</MenuItem>
    <MenuItem value="cash">cash</MenuItem>
    <MenuItem value="free">free</MenuItem>
    <MenuItem value="cheque">cheque</MenuItem>
    <MenuItem value="transfer">transfer</MenuItem>
    <MenuItem value="scanbank">bankscan</MenuItem>


</Select>

      </div>
      </div>

      </DialogContent>

          </form>
      
        )}
          <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="button" onClick={handleNewEventSubmit}>{ isLoading ? 'loading ...' : "Book Now"}</Button>
      </DialogActions>
        </Dialog>

{eventDetails && (
        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogTitle>{eventDetails.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* Start: {eventDetails.start.toLocaleString()} */}
            </DialogContentText>
            <DialogContentText>
              Name: {eventDetails?.name}
            </DialogContentText>
            <DialogContentText>
              Phone: {eventDetails?.phone}
            </DialogContentText>
            <DialogContentText>
              Event Date: {eventDetails?.date}
            </DialogContentText>
            <DialogContentText>
              Payment Mode: {eventDetails?.mode}
            </DialogContentText>
            <DialogContentText>
            address: {eventDetails?.address}
            </DialogContentText>
            <DialogContentText>
            email: {eventDetails?.email}
            </DialogContentText>
            <DialogContentText>
            branch: {eventDetails?.branch}
            </DialogContentText>
            <DialogContentText>
            refrenceId: {eventDetails?.reference_id}
            </DialogContentText>
            <DialogContentText>
            superstar: {eventDetails?.superstar}
            </DialogContentText>
            <DialogContentText>
            Additional Services: {eventDetails?.plus}
            </DialogContentText>

            <DialogContentText>
            Total amount: {eventDetails?.amount}
            </DialogContentText>
            {/* {eventDetails.end && (
              <DialogContentText>
                End: {eventDetails.end.toLocaleString()}
              </DialogContentText>
            )} */}
            <Button
          onClick={() => handleDownloadReceipt(eventDetails)}
          variant="contained"
          color="primary"
        >
          Download Receipt
        </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default EventCalendar;
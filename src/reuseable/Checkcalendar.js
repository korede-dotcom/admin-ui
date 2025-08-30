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
import companyLogo from "assets/images/logo-ct.png";

// Add custom styles for FullCalendar events
const calendarStyles = `
  // .fc-h-event {
  //   background-color: #66BB6A !important;
  //   border-color: #43A047 !important;
  // }
  // .fc-h-event:hover {
  //   background-color: #43A047 !important;
  // }
  // .fc-event-title {
  //   color: white !important;
  // }
`;

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
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
  });
  const [dateRecord, setDateRecord] = useState({
    start:"",
    end:""
  });

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
  });

  const {getallBranch} = useQuery({
    queryKey:['getAllBranch'],
    queryFn: () => getAllBranch(),
    onSuccess:(d) =>{
      setBranch(d?.data?.braches)
    }
  });

  const { data, isloading, error } = useQuery({
    queryKey: ['GetEventPkg'],
    queryFn: () => GetEventPkg(),
    onSuccess: (d) => {
      seteventpkg(d?.data?.pkgs)
    },
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
    setEventDetails({
      ...info.event.extendedProps.booking,
      event_type: info.event.title
    });
    setModalOpen(true);
  };

  const downloadReceipt = (eventData) => {
    const pdf = new jsPDF();

    // Set background color to light green
    pdf.setFillColor(240, 255, 240); // Very light green background
    pdf.rect(0, 0, 210, 297, 'F'); // Fill entire page

    // Add green header background
    pdf.setFillColor(102, 187, 106); // Green color #66BB6A
    pdf.rect(0, 0, 210, 40, 'F');

    // Try to add company logo (using favicon as fallback)
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = function() {
        try {
          pdf.addImage(logoImg, 'PNG', 15, 8, 25, 25);
        } catch (e) {
          console.log("Logo loading failed, continuing without logo");
        }
        generatePDFContent();
      };
      logoImg.onerror = function() {
        console.log("Logo failed to load, continuing without logo");
        generatePDFContent();
      };
      logoImg.src = '/favicon.png'; // Use favicon as it's working
    } catch (e) {
      console.log("Logo loading error, continuing without logo");
      generatePDFContent();
    }

    function generatePDFContent() {
      // Add company header with white text on green background
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("SAMEBROTHER", 50, 20);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.text("Event Booking Receipt", 50, 30);

      // Reset text color to black for rest of content
      pdf.setTextColor(0, 0, 0);

      // Add a decorative line separator
      pdf.setDrawColor(102, 187, 106); // Green line
      pdf.setLineWidth(2);
      pdf.line(15, 45, 195, 45);

      // Receipt details with green styling
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(102, 187, 106); // Green text for title
      pdf.text("RECEIPT", 15, 60);

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0); // Black text for content

      // Customer details section with green background
      let yPosition = 75;
      pdf.setFillColor(232, 245, 233); // Light green background for sections
      pdf.rect(10, yPosition - 5, 190, 45, 'F');

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(102, 187, 106);
      pdf.text("Customer Information:", 15, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
      pdf.text(`Name: ${eventData.name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${eventData.email}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Phone: ${eventData.phone}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Address: ${eventData.address}`, 20, yPosition);
      yPosition += 20;

      // Event details section with green background
      pdf.setFillColor(232, 245, 233);
      pdf.rect(10, yPosition - 5, 190, 50, 'F');

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(102, 187, 106);
      pdf.text("Event Details:", 15, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
      pdf.text(`Event Type: ${eventData.event_type || eventData.title || 'N/A'}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Date: ${eventData.date}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Branch: ${eventData.branch}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Reference ID: ${eventData.reference_id}`, 20, yPosition);
      yPosition += 20;

      // Payment details section with green background
      pdf.setFillColor(232, 245, 233);
      pdf.rect(10, yPosition - 5, 190, 35, 'F');

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(102, 187, 106);
      pdf.text("Payment Details:", 15, yPosition);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
      pdf.text(`Amount: ₦${eventData.amount || '0'}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Payment Mode: ${eventData.mode}`, 20, yPosition);
      yPosition += 20;

      // Additional details if available
      if (eventData.superstar || eventData.plus) {
        pdf.setFillColor(232, 245, 233);
        pdf.rect(10, yPosition - 5, 190, 25, 'F');

        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(102, 187, 106);
        pdf.text("Additional Services:", 15, yPosition);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        yPosition += 10;

        if (eventData.superstar) {
          pdf.text(`Superstar: ${eventData.superstar}`, 20, yPosition);
          yPosition += 8;
        }
        if (eventData.plus) {
          pdf.text(`Plus: ${eventData.plus}`, 20, yPosition);
          yPosition += 8;
        }
        yPosition += 10;
      }

      // Footer with green styling
      yPosition += 20;
      pdf.setDrawColor(102, 187, 106);
      pdf.setLineWidth(2);
      pdf.line(15, yPosition, 195, yPosition);
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(102, 187, 106);
      pdf.text("Thank you for choosing Samebrother!", 15, yPosition);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, yPosition + 10);

      // Save the PDF
      pdf.save(`receipt-${eventData.reference_id || 'event'}.pdf`);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setEventDetails(null);
    setNewEventTitle("");
  };

  const bookeEvents = (e) => {
    const { value, name } = e.target
    setEvent((prev) => {
      return {...prev, [name]:value, branch_id:JSON.parse(localStorage.getItem("branchId"))}
    })
  }

  const dateChanged = (e) => {
    const {value,name} = e.target;
    setDateRecord((prev) => {
      return {...prev,[name]:value}
    })
  }

  const handleNewEventSubmit = (e) => {
    e.preventDefault()
    if (!navigator.onLine) {
      alert("No internet connection. Please check your network.");
    }
    mutate(getEvent)
  };

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: EventBook,
    onSuccess: (data) => {
      if (data?.status) {
        refetch();
        setModalOpen(false);
        setSelectedDate(null);
        setEventDetails(null);
        setNewEventTitle("");
      }
    },
    onError: (err) => {
      let errorMessage = "An unknown error occurred. Please try again.";
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (err?.response?.data?.errors?.length) {
        errorMessage = err.response.data.errors
          .map((e) => `${e.param}: ${e.msg}`)
          .join("\n");
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    },
  });

  const { mutate: allEventRecord, isLoading: filterLoading, isError: filterError } = useMutation({
    mutationFn: ({ start, end }) => AllEventRecordFilter(start, end),
    onSuccess: (data) => {
      const downloadEventsAsCSV = (events) => {
        const headers = [
          "_id", "first_name", "last_name", "email", "phone_number", "address", "reference_id", 
          "event_type", "branch_name", "payment_mode", "amount", "date", "branch_id", 
          "booked_by", "createdAt", "updatedAt"
        ].join(",");
        
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
            branch_name: event.branch?.name || "N/A",
            payment_mode: event.payment_mode,
            amount: event.amount,
            date: event.date,
            branch_id: event.branch_id,
            booked_by: event.booked_by,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
          };
          return Object.values(formattedData).map(value => `"${value}"`).join(",");
        }).join("\n");
        
        const csvContent = `${headers}\n${values}`;
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const currentDate = new Date().toISOString().split("T")[0];
        const fileName = `Samebrother_event_data_${currentDate}.csv`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      downloadEventsAsCSV(data.data.allevents);
    },
  });

  const { mutate: allEventRecordPdf, isLoading: filterLoadingpdf, isError: filterErrorpdf } = useMutation({
    mutationFn: ({ start, end }) => AllEventRecordFilter(start, end),
    onSuccess: (datas) => {
      const data = datas.data.allevents;
      const downloadEventsAsPDF = (events) => {
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text(`Samebrother Event Data :${dateRecord.start}-${dateRecord.end}`, 10, 10);

        const headers = [
          "No.",
          "First Name",
          "Email",
          "Phone Number",
          "Reference ID",
          "Event Type",
          "Price",
          "Mode",
          "Date",
        ];

        const rows = events.map((data,i) => [
          i + 1,
          data.first_name,
          data.email,
          data.phone_number,
          data.reference_id,
          data?.event_type || "N/A",
          data?.amount || "N/A",
          data.payment_mode,
          data.date,
        ]);

        pdf.autoTable({
          head: [headers],
          body: rows,
          startY: 15,
          theme: "grid",
          headStyles: {
            fillColor: [0, 128, 0],
            textColor: [255, 255, 255],
            fontSize: 10,
          },
          bodyStyles: {
            fontSize: 9,
            cellPadding: 1,
          },
          tableLineColor: [0, 0, 0],
          tableLineWidth: 0.1,
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          margin: { top: 5, left: 5, right: 5 },
          styles: {
            cellWidth: "wrap",
          },
        });

        const currentDate = new Date().toISOString().split("T")[0];
        const fileName = `Samebrother_event_data_${currentDate}.pdf`;
        pdf.save(fileName);
      };

      downloadEventsAsPDF(data);
    },
  });

  const dateFilter = (e) => {
    const { start, end } = dateRecord;
    if (!start || !end) {
      e.target.disabled = true;
    } else {
      allEventRecord({ start, end });
    }
  };

  const dateFilterPdf = (e) => {
    const { start, end } = dateRecord;
    if (!start || !end) {
      e.target.disabled = true;
    } else {
      allEventRecordPdf({ start, end });
    }
  };

  return (
    <div>
      <style>{calendarStyles}</style>
      <div style={{ 
        display: 'flex', 
        textAlign: 'center',
        gap: '1rem', 
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
            backgroundColor: '#66BB6A',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.2s'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#43A047')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#66BB6A')}
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
            backgroundColor: '#66BB6A',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.2s'
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#43A047')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#66BB6A')}
          onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
          {filterLoading ? "loading..." : "Download Report Pdf"} 
        </button>
      </div>

      {isallowed && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            ...allbooking.map(d => {
              return {
                title: d?.event_type,
                start: d?.date,
                backgroundColor: d?.part_payments ? "#000" : "#66BB6A", // Black for part payments, Green for full payments
                textColor: d?.part_payments ? "white" : "white", // White text for both
                extendedProps: {
                  booking: {
                    name: `${d?.first_name} ${d?.last_name}`,
                    phone: d?.phone_number,
                    address: d?.address,
                    mode: d?.payment_mode,
                    date: d?.date,
                    email: d?.email,
                    branch: d?.branch?.name,
                    amount: d?.amount,
                    reference_id: d?.reference_id,
                    superstar: d?.superstar,
                    plus: d?.plus,
                  },
                }
              }
            })
          ]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      )}

      <Dialog open={modalOpen} onClose={handleModalClose}>
        {selectedDate && (
          <form onChange={(e) => console.log(e)}>
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
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="last name"
                  type="text"
                  name="last_name"
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="email"
                  type="email"
                  name="email"
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="phone_number"
                  type="tel"
                  name="phone_number"
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="address"
                  type="text"
                  name="address"
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="event_type"
                  type="text"
                  name="event_type"
                  onChange={bookeEvents}
                />
                <div style={{width:"100%",display:"flex",gap:"10px"}}>
                  <div style={{flex:"0.5",width:"50%"}}>
                    <small>branch</small>
                    <br/>
                    <Select
                      sx={{width:'100%',py:1}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={staffbranch}
                      label="Staff Branch"
                      onChange={handleStaffChange}
                      placeholder="branch_id"
                      name="branch_id"
                    >
                      {isallowed && branch.map(d => (
                        <MenuItem key={d._id} value={d._id}>{d?.name}</MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <TextField
                  required
                  margin="dense"
                  label="superstart"
                  type="text"
                  name="superstart"
                  onChange={bookeEvents}
                />
                <TextField
                  required
                  margin="dense"
                  label="plus"
                  type="text"
                  name="plus"
                  onChange={bookeEvents}
                  fullWidth
                />
                <TextField
                  required
                  margin="dense"
                  label="amount"
                  type="number"
                  name="amount"
                  onChange={bookeEvents}
                />
                <div style={{flex:"0.5",width:"50%"}}>
                  <small>payment mode</small>
                  <br/>
                  <Select
                    sx={{width:'100%',py:1}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Staff Branch"
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
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button 
                type="button" 
                onClick={handleNewEventSubmit}
                sx={{
                  backgroundColor: '#66BB6A',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#43A047',
                  },
                }}
              >
                {isLoading ? 'loading ...' : "Book Now"}
              </Button>
            </DialogActions>
          </form>
        )}
        {eventDetails && (
          <div>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Name: {eventDetails.name}
              </DialogContentText>
              <DialogContentText>
                Event Type: {eventDetails.event_type}
              </DialogContentText>
              <DialogContentText>
                Phone: {eventDetails.phone}
              </DialogContentText>
              <DialogContentText>
                Address: {eventDetails.address}
              </DialogContentText>
              <DialogContentText>
                Payment Mode: {eventDetails.mode}
              </DialogContentText>
              <DialogContentText>
                Date: {eventDetails.date}
              </DialogContentText>
              <DialogContentText>
                Email: {eventDetails.email}
              </DialogContentText>
              <DialogContentText>
                Branch: {eventDetails.branch}
              </DialogContentText>
              <DialogContentText>
                Amount: {eventDetails.amount}
              </DialogContentText>
              <DialogContentText>
                Reference ID: {eventDetails.reference_id}
              </DialogContentText>
              <DialogContentText>
                Superstar: {eventDetails.superstar}
              </DialogContentText>
              <DialogContentText>
                Plus: {eventDetails.plus}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Close</Button>
              <Button
                onClick={() => downloadReceipt(eventDetails)}
                sx={{
                  backgroundColor: '#66BB6A',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#43A047',
                  },
                }}
              >
                Download Receipt
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default EventCalendar; 
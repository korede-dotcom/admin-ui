import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
Dialog,
DialogTitle,
DialogContent,
DialogContentText,
DialogActions,
Button,
TextField,
} from "@mui/material";
import moment from "moment";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchAndSelect from "./SelectSearch";
import {AvailableRooms,bookings,BookRooms} from "../services/Dashboard"
import { useMutation } from "@tanstack/react-query";
import { useQuery } from '@tanstack/react-query';
import jsPDF from "jspdf";
import "jspdf-autotable";
import companyLogo from "assets/images/logo-ct.png";


const BookingCalendar = () => {
const [selectedDate, setSelectedDate] = useState(null);
const [bookingDetails, setBookingDetails] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [guestName, setGuestName] = useState("");
const [guestEmail, setGuestEmail] = useState("");
const [guestPhone, setGuestPhone] = useState("");
const [guestsCount, setGuestsCount] = useState(1);
const [getavailableRoom, setavailableRoom] = useState([]);
const [getavailableBooking, setavailableBooking] = useState([]);

const isAdmin = JSON.parse(localStorage.getItem("role_id"))
console.log("🚀 ~ file: Hotelcalendar.js:35 ~ isAdmin:", isAdmin)
const viewAllUser = [1,5,7]

const isallowed = () => {
    return viewAllUser.includes(isAdmin)
}




const {availableRooms} = useQuery({
  
    queryKey:['AvailableRooms'],
    queryFn: () => AvailableRooms(),
    onSuccess:(d) => {
        console.log("🚀 ~ file: Hotelcalendar.js:542 ~ BookingCalendar ~ d:", d.data.pkgs)
  
        setavailableRoom(d.data.pkgs)
    }
    // onError: (err) => {
   
  });
const {availablebookings} = useQuery({
  
    queryKey:['bookings'],
    queryFn: () => bookings(),
    onSuccess:(d) => {
        console.log("🚀 ~ file: Hotelcalendar.js:542 ~ BookingCalendar ~ d:", d.data.pkgs)
  
        setavailableBooking(d.data.pkgs)
    }
    // onError: (err) => {
   
  });

const [getHotelBooking, setHotelBooking] = useState({
    title: "",
    start: "",
    end: "",
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    guest_address: "",
    guest_count: "",
    payment_mode: ""
 });


 const { mutate, isLoading,isError} = useMutation({
    mutationFn: BookRooms,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      
    }  
});
 
 const handleDateClick = (info) => {
     setSelectedDate(info.date);
     setModalOpen(true);
    };
    
    const hotelChange = (e) => {
        const { value, name } = e.target
        
        setHotelBooking((prev) => {
            return {...prev, [name]:value}
        })
        console.log("🚀 ~ file: Hotelcalendar.js:40 ~ BookingCalendar ~ getHotelBooking:", getHotelBooking)
}

    const handleBookingClick = (info) => {
        setBookingDetails(info.event.extendedProps.booking);
        setModalOpen(true);
    };

    const downloadHotelReceipt = (bookingData) => {
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
                generateHotelPDFContent();
            };
            logoImg.onerror = function() {
                console.log("Logo failed to load, continuing without logo");
                generateHotelPDFContent();
            };
            logoImg.src = '/favicon.png'; // Use favicon as it's working
        } catch (e) {
            console.log("Logo loading error, continuing without logo");
            generateHotelPDFContent();
        }

        function generateHotelPDFContent() {
            // Add company header with white text on green background
            pdf.setTextColor(255, 255, 255); // White text
            pdf.setFontSize(24);
            pdf.setFont("helvetica", "bold");
            pdf.text("SAMEBROTHER", 50, 20);
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text("Hotel Booking Receipt", 50, 30);

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

            // Guest details section with green background
            let yPosition = 75;
            pdf.setFillColor(232, 245, 233); // Light green background for sections
            pdf.rect(10, yPosition - 5, 190, 45, 'F');

            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(102, 187, 106);
            pdf.text("Guest Information:", 15, yPosition);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            yPosition += 10;
            pdf.text(`Name: ${bookingData.guestName}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Email: ${bookingData.guestEmail}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Phone: ${bookingData.guestPhone}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Number of Guests: ${bookingData.guestsCount}`, 20, yPosition);
            yPosition += 20;

            // Booking details section with green background
            pdf.setFillColor(232, 245, 233);
            pdf.rect(10, yPosition - 5, 190, 50, 'F');

            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(102, 187, 106);
            pdf.text("Booking Details:", 15, yPosition);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            yPosition += 10;
            pdf.text(`Room Number: ${bookingData.roomnumber}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Room Type: ${bookingData.roomtype}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Branch: ${bookingData.branch}`, 20, yPosition);
            yPosition += 8;
            pdf.text(`Reference ID: ${bookingData.ref}`, 20, yPosition);
            yPosition += 20;

            // Payment details section with green background
            pdf.setFillColor(232, 245, 233);
            pdf.rect(10, yPosition - 5, 190, 25, 'F');

            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(102, 187, 106);
            pdf.text("Payment Details:", 15, yPosition);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            yPosition += 10;
            pdf.text(`Payment Mode: ${bookingData.paymentmode}`, 20, yPosition);
            yPosition += 20;

            // Footer with green styling
            yPosition += 20;
            pdf.setDrawColor(102, 187, 106);
            pdf.setLineWidth(2);
            pdf.line(15, yPosition, 195, yPosition);
            yPosition += 15;

            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(102, 187, 106);
            pdf.text("Thank you for choosing Samebrother Hotel!", 15, yPosition);

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, yPosition + 10);

            // Save the PDF
            pdf.save(`hotel-receipt-${bookingData.ref || 'booking'}.pdf`);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setBookingDetails(null);
        setGuestName("");
        setGuestEmail("");
        setGuestPhone("");
        setGuestsCount(1);
    };

const handleNewEventSubmit = (event) => {
event.preventDefault();
console.log("Creating new booking:", guestName, selectedDate);
mutate(getHotelBooking)
// Do something else, like making an API call to create a new booking
// handleModalClose();m
};

const isDateBooked = (date) => {
// In this example, we assume that a date is booked if it already has a booking associated with it
const bookedBookings = [ 
{
        title: "Booking 1",
        start: d?.start,
        end: d?.end,
        extendedProps: {
        booking: {
        guestName: "John Doe",
        guestEmail: "johndoe@example.com",
        guestPhone: "123-456-7890",
        guestsCount: 2,
        ref: 2,
        reference_id: 2,
        },
        },
    }

// {
// title: "Booking 1",
// start: "2023-04-01",
// end: "2023-04-03",
// extendedProps: {
// booking: {
// guestName: "John Doe",
// guestEmail: "johndoe@example.com",
// guestPhone: "123-456-7890",
// guestsCount: 2,
// },
// },
// }
];
return bookedBookings.some(
(booking) =>

moment(booking.start).isSame(date, "day") ||
moment(booking.end).add(1, 'day').isSame(date, "day") ||
(moment(booking.start).isBefore(date, "day") &&
moment(booking.end).add(1, 'day').isSame(date, "day"))
) ;
};

return (
<div>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            
        
            events={[ ...getavailableBooking.map(d => {
                return{
                    title: "Booking 1",
                    start: d?.start,
                    end: d?.end,
                    extendedProps: {
                    booking: {
                    guestName: d?.guest_name,
                    guestEmail:d?.guest_email,
                    guestPhone: d?.guest_phone,
                    guestsCount: d?.guest_count,
                    ref: d?.reference_id,
                    paymentmode: d?.payment_mode,
                    roomnumber: d?.room?.room_number,
                    roomtype: d?.room?.type,
                    branch: d?.room?.branch?.name,
                    },
                    },
                }
            })
        
         
            ]}
            dateClick={handleDateClick}
            eventClick={handleBookingClick}
            // dayCellContent={(e) => {
            // if (isDateBooked(e.date)) {
            // return "<span class='fc-day-number'>" + e.dayNumberText + "</span><div class='fc-booked'></div>";
            // }
            // return "<span class='fc-day-number'>" + e.dayNumberText + "</span>";
            // }}
            />

            <Dialog open={modalOpen} onClose={handleModalClose}>
                
                 {selectedDate && (
                    <div>
                    <DialogTitle>Book a Room today {moment(selectedDate).format("LL")}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                    Please provide your booking details below:
                    </DialogContentText>
      <form onSubmit={handleNewEventSubmit} style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
      <TextField
      required
      margin="dense"
      label="title"
      type="text"
      name="title"
      onChange={hotelChange}
      />
      <TextField
      required
      margin="dense"
      placeholder="start"
      type="date"
      name="start"
      onChange={hotelChange}
    //   onChange={book}
      />
      <TextField
      required
      margin="dense"
      name="end"
      type="date"
      onChange={hotelChange}
      />
         <TextField
      required
      margin="dense"
      label="guest name"
      type="text"
      name="guest_name"
      onChange={hotelChange}
    //   onChange={book}
      />
         <TextField
      required
      margin="dense"
      label="guest_address"
      type="text"
      name="guest_address"
    //   onChange={book}
    onChange={hotelChange}
      />
         <TextField
      required
      margin="dense"
      label="guests count"
      type="number"
      name="guest_count"
      onChange={hotelChange}
    //   onChange={book}
      />
      
      <TextField
      required
      margin="dense"
      label="email"
      name="guest_email"
      type="email"
      onChange={hotelChange}
      />
      <TextField
      required
      margin="dense"
      label="guest_phone"
      name="guest_phone"
      type="number"
      oonChange={hotelChange}
      />
     
      <SearchAndSelect
       users={[...getavailableRoom?.map(d => {
            return {
                label:d.room_number,value:d._id
            }
        })
    
    ]} 
    placeholder="select room" style={true}
        handleChange={(e) => {
            setHotelBooking(prev => {
                return {
                    ...prev,
                    room_id:e.value
                }
            })
        }}
        />
       <small>payment mode</small>
        <Select sx={{width:'100%',py:1}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={staffbranch}
            label="Staff Branch"
            // onChange={handleStaffChange}
            onChange={hotelChange}
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

  </form>
      <DialogActions>
      <Button onClick={handleModalClose}>Cancel</Button>
      <Button 
        type="submit" 
        onClick={handleNewEventSubmit}
        sx={{
          backgroundColor: '#66BB6A',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#43A047',
          },
        }}
      >
        Book Now
      </Button>
  </DialogActions>
  </DialogContent>

      </div>

                 )}

            {bookingDetails && (
            <div>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogContent>
                <DialogContentText>
                Guest Name: {bookingDetails.guestName}
                </DialogContentText>
                <DialogContentText>
                Guest Email: {bookingDetails.guestEmail}
                </DialogContentText>
                <DialogContentText>
                Guest Phone: {bookingDetails.guestPhone}
                </DialogContentText>
                <DialogContentText>
                Guests Count: {bookingDetails.guestsCount}
                </DialogContentText>
                <DialogContentText>
                Ref: {bookingDetails?.ref}
                </DialogContentText>
                <DialogContentText>
                Paymentmode: {bookingDetails?.paymentmode}
                </DialogContentText>
                <DialogContentText>
                roomnumber: {bookingDetails?.roomnumber}
                </DialogContentText>
                <DialogContentText>
                roomtype: {bookingDetails?.roomtype}
                </DialogContentText>
                {
                    isallowed && (
                        <DialogContentText>
                        branch: {bookingDetails?.branch}
                        </DialogContentText>
                    )
                }
               
                </DialogContent>
                <DialogActions>
                <Button onClick={handleModalClose}>Close</Button>
                <Button
                    onClick={() => downloadHotelReceipt(bookingDetails)}
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
)};
export default BookingCalendar;
            {/* )} */}
            {/* {bookingDetails && (
            <div>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogContent>
                <DialogContentText>
                Guest Name: {bookingDetails.guestName}
                </DialogContentText>
                <DialogContentText>
                Guest Email: {bookingDetails.guestEmail}
                </DialogContentText>
                <DialogContentText>
                Guest Phone: {bookingDetails.guestPhone}
                </DialogContentText>
                <DialogContentText>
                Guests Count: {bookingDetails.guestsCount}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleModalClose}>Close</Button>
                </DialogActions>
            </div>
            )} */}
    {/* </Dialog> */}
{/* </div> */}

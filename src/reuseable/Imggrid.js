import React, { useState } from "react";
import { Grid, Button, Pagination, Modal, Backdrop, Fade } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageViewer = () => {
  
  const images = [
    "https://source.unsplash.com/random/400x400?1",
    "https://source.unsplash.com/random/400x400?2",
    "https://source.unsplash.com/random/400x400?3",
    "https://source.unsplash.com/random/400x400?4",
    "https://source.unsplash.com/random/400x400?5",
    "https://source.unsplash.com/random/400x400?6",
    "https://source.unsplash.com/random/400x400?7",
    "https://source.unsplash.com/random/400x400?8",
    "https://source.unsplash.com/random/400x400?9",

  ];



  const itemsPerPage = 5; // number of items per page

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const [modalImage, setModalImage] = useState(null);
  const handlePaginationChange = (event, value) => {
    const startIndex = (value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visiblePosts = images.slice(startIndex, endIndex);
    window.scrollTo(0, 0)
    // Now you can update your UI to display the visible blog posts
  };

  const handleApprove = (index) => {
    // handle approve logic here
  };

  const handleDecline = (index) => {
    // handle decline logic here
  };

  const handleModalOpen = (index) => {
    setModalImage(index);
  };

  const handleModalClose = () => {
    setModalImage(null);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        {images.slice(0,5).map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={6}>
            <img src={image} alt={`Image ${index}`} onClick={() => handleModalOpen(index)}  style={{ borderRadius: '18px' }} />
            <div>
              <Button
                // variant="contained"
                variant="info"
                sx={{color:'green !important'}}
                startIcon={<Check />}
                onClick={() => handleApprove(index)}
              >
                Approve
              </Button>
              <Button
                variant="info"
                sx={{color:'red !important'}}
                startIcon={<Close />}
                onClick={() => handleDecline(index)}
              >
                Decline
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={modalImage !== null}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalImage !== null}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Carousel
              showArrows={true}
              selectedItem={modalImage}
              showStatus={false}
              showThumbs={false}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </Fade>
      </Modal>
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "16px" }}
      >
       <Pagination count={totalPages} onChange={handlePaginationChange} />

      </div>
    </div>
  );
};

export default ImageViewer;

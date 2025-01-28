import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  mediaPreview: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginBottom: theme.spacing(1),
  },
}));

const CreateBranch = () => {
  const classes = useStyles();
  const [branch, setBranch] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleBranchChange = (event) => {
    const { name, value } = event.target;
    setBranch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setBranch((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleCreateBranch = () => {
    // Handle creating branch here
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Create a Branch
      </Typography>
      <TextField
        required
        fullWidth
        label="Branch Name"
        name="name"
        value={branch.name}
        onChange={handleBranchChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        required
        fullWidth
        label="Branch Description"
        name="description"
        value={branch.description}
        onChange={handleBranchChange}
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="icon-button-file">
        <Box display="flex" alignItems="center" marginBottom={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddPhotoAlternateIcon />
          </IconButton>
          <Typography variant="subtitle1">
            Upload Branch Image (Optional)
          </Typography>
        </Box>
      </label>
      {branch.image && (
        <CardMedia
          className={classes.mediaPreview}
          image={branch.image}
          title={branch.name}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBranch}
        disabled={!branch.name || !branch.description}
      >
        Create Branch
      </Button>
    </Container>
  );
};

export default CreateBranch;

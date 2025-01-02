// import React from 'react'
import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/navComponents/Header";
import AddIcon from "@mui/icons-material/Add";
import { create_user } from "../api/user";
import StyledModal from "../components/styledComponents/StyledModal";
import { useState } from "react";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = function (e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createUser = async function (e) {
    e.preventDefault();
    console.log(formData);
    
    await create_user(formData);
  };
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, p: 1, pt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Paper
              sx={{ width: "100%", height: 150, flexDirection: "column" }}
              component={Button}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <AddIcon fontSize="large" color="primary" />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "GrayText",
                  textTransform: "none",
                }}
              >
                Add Devices
              </Typography>
            </Paper>
          </Grid>
          <Grid size={6}>{/* <Item>size=4</Item> */}</Grid>
        </Grid>
      </Box>

      {/* <Paper component={Button}>
        <AddIcon color="primary" />
      </Paper> */}
      <StyledModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
        handleSubmit={createUser}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
}

export default Home;

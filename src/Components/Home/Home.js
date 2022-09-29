import {Button, Grid} from "@mui/material";
import React, { useState } from "react";
import CustomAppBar from "./CustomAppBar";
import CustomDialog from "./CustomDialog";
import TableData from "./TableData";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickOpen = () => {
    setIsModalOpen(true);
  };


  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <Grid container>
      <CustomAppBar />
      <TableData />
    </Grid>
  );
};

export default Home;

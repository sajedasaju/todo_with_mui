import { Button } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "./CustomDialog";
import ShowData from "./ShowData";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };


  const handleClose = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      {isModalOpen && <CustomDialog onClose={handleClose} />} */}

      <ShowData />
    </div>
  );
};

export default Home;

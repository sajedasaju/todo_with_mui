import {
  Box,
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import CustomDialog from './CustomDialog';

const ShowData = () => {
  const navigate = useNavigate();
  const navigateToCreateData = () => {
    navigate("/createData");
  };
  const handleDetele = (s_id) => {

    axios.delete(`http://localhost:5000/student/${s_id}`)
      .then(function (response) {
        console.log("delete done")
        toast('Successfully Deleted')
      })
  }

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        parent: teal[100],
        main: teal[50],
        darker: "#053e85",
      },
      secondary: {

        main: "#11cb5f",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  const [allData, setAllData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/allStudent").then(function (response) {
      setAllData(response.data);
    });
  }, []);

  const Activity = styled(Typography)`
  color: #2e8b57;
  padding:4;
  display:flex;
  flex-direction:row;
  padding-right:10px;

  `;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkData, setCheckData] = useState({});
  console.log(checkData)
  const handleClickOpen = (isData) => {
    // console.log(isData, checkData);
    // if (isData) {
    //   setCheckData(isData)
    // }
    setIsModalOpen(true);
  };


  const handleClose = () => {
    setIsModalOpen(false)
  }



  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "70%",
          marginX: "auto",
          marginY: 15,
          backgroundColor: "primary.parent",
          padding: 5,
          borderRadius: 2,
        }}
      >
        {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}



        <AddIcon
          onClick={() => {
            handleClickOpen(setCheckData({}))
          }}
          sx={{
            backgroundColor: "skyblue",
            padding: 0.5,
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "bolder",
          }}
        />
        {isModalOpen && <CustomDialog onClose={handleClose} checkData={checkData} />}
        <TableContainer
          sx={{
            width: "95%",
            border: 2,
            marginX: "auto",
            borderColor: "primary.dark",
            backgroundColor: "primary.main",
          }}
          component={Paper}
        >
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="center">Mother Name</TableCell>
                <TableCell align="center">Father Name</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Student Id</TableCell>
                <TableCell align="center">Dept</TableCell>
                <TableCell align="center">Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.studentName}
                  </TableCell>
                  <TableCell align="center">{row.motherName}</TableCell>
                  <TableCell align="center">{row.fatherName}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.studenId}</TableCell>
                  <TableCell align="center">{row.dept}</TableCell>
                  <TableCell align="center">
                    <Activity>
                      <EditIcon
                        sx={{ marginRight: 1 }}
                        onClick={() => {
                          handleClickOpen(setCheckData(row))
                        }}
                      // onClick={() => {
                      //   navigate(`/editData/${row._id}`);
                      // }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          handleDetele(row._id)
                        }}
                      />
                    </Activity>



                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default ShowData;

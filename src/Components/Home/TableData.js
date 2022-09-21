import {
  Box,
  Checkbox,
  createTheme,
  Grid,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import CustomDialog from "./CustomDialog";
import { CheckBox } from "@mui/icons-material";
import { theme } from "../../theme/theme";
import useSWR from "swr";

const TableData = () => {
  const [checkDelete, setCheckDelete] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkAdd, setCheckAdd] = useState(false);

  const handleDetele = (s_id) => {
   
    async function deleteData(){
      try {
      const data= await  axios
      .delete(`http://localhost:5000/student/${s_id}`)
      .then(function (response) {
        setCheckDelete(true);
        toast.success("Successfully Deleted");
      })
       } catch (error) {
        toast.error(error.message)
       }
    }
    deleteData()

  };

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function getData(){
      try {
      const data=  await axios.get("http://localhost:5000/allStudent").then(function (response) {
          setAllData(response.data);
        })
       } catch (error) {
        toast.error(error.message)
       }
    }
    getData()

    setCheckAdd(false);
    setCheckEdit(false);
  }, [checkDelete, checkAdd, checkEdit]);


  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor:'#fbfefb',
  //   },
  //   '&:nth-of-type(even)': {
  //     backgroundColor:'#eef0eb',
  //   },
  // }));

  const Activity = styled(Typography)`
    color: #2e8b57;
    padding: 4;
    display: flex;
    flex-direction: row;
    padding-right: 10px;
  `;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkData, setCheckData] = useState("");
  const handleClickOpen = (isData) => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // const CustomCheckbox = styled(CheckBox)(({ theme }) => ({
  //   color: theme.status.danger,
  //   "&.Mui-checked": {
  //     color: theme.status.danger,
  //   },
  // }));

  
  const PREFIX = "TableData";
  const classes = {
    container: `${PREFIX}-container`,
    button: `${PREFIX}-button`,
    tableHeadColor: `${PREFIX}-tableHeadColor`,
    tableRowColor: `${PREFIX}-tableRowColor`,
  };
  
  const StyledGrid = styled(Grid)(({ theme }) => ({
    [`& .${classes.container}`]: {
      padding: 20,
      position: "relative",
    },
    [`& .${classes.button}`]: {
      backgroundColor: "white",
      // background:theme.palette.primary.main,
    },
    [`& .${classes.tableHeadColor}`]: {
      backgroundColor: "#e0ddd9",
    },
    [`& .${classes.tableRowColor}`]: {
      '&:nth-of-type(odd)': {
        backgroundColor:'#fbfefb',
      },
      '&:nth-of-type(even)': {
        backgroundColor:'#eef0eb',
      },
    },
    
  }));


  return (
    // <ThemeProvider theme={theme}>
      <StyledGrid container
      justifyContent='center'
      rowSpacing={2}
      my={4}
      maxWidth
      wrap="wrap"
        // sx={{
        //   width: "70%",
        //   marginX: "auto",
        //   marginY: 15,
        //   backgroundColor: "white",
        //   padding: 5,
        //   borderRadius: 2,
        // }}
      >

        {/* <CustomCheckbox defaultChecked /> */}
<Grid item xs={11}>
  
<AddIcon
          onClick={() => {
            handleClickOpen(setCheckData(""));
          }}
          sx={{
            backgroundColor: "#B7B2AA",
            padding: 0.5,
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "bolder",
          }}
        />
        {isModalOpen && (
          <CustomDialog
            onClose={handleClose}
            checkData={checkData}
            setCheckEdit={setCheckEdit}
            setCheckAdd={setCheckAdd}
          />
        )}
</Grid>
       
       <Grid item xs={11}>
       <TableContainer
          sx={{
            // width: "95%",
            // border: 1,
            // marginX: "auto",
            // borderColor: "palette.primary.darker",
            // backgroundColor: "primary.main"
          }}
          component={Paper}
        >
          <Table sx={{ width: "100%" }}  stickyHeader  aria-label="customized table">
            <TableHead>
              <TableRow className={classes.tableRowColor}>
                <TableCell className={classes.tableHeadColor}>Full Name</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Mother Name</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Father Name</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Address</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Student Id</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Dept</TableCell>
                <TableCell className={classes.tableHeadColor} align="center">Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((row) => (
                <TableRow className={classes.tableRowColor}
                  key={row._id}
                 
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
                        sx={{ marginRight: 1 ,color:'#686765' }}
                        onClick={() => {
                          handleClickOpen(setCheckData(row));
                        }}
                        // onClick={() => {
                        //   navigate(`/editData/${row._id}`);
                        // }}
                      />
                      <DeleteIcon
                       sx={{color:'#686765' }}
                        onClick={() => {
                          handleDetele(row._id);
                        }}
                      />
                    </Activity>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       </Grid>
      </StyledGrid>
    // </ThemeProvider>
  );
};

export default TableData;

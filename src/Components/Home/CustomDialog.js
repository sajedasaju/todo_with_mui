import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;


  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function CustomDialog({ onClose, checkData }) {
  console.log(checkData);
  const [dept, setDept] = useState("");
  const handleChange = (event) => {
    console.log(event);
    setDept(event.target.value);
  };


  const FormContainer = styled(Box)`
  color: #2e8b57;
  background-color: #B2DFDB;
  padding: 35px;
  width: 70%;
  margin: 10% auto;
  border-radius: 10px;
`;
  const InputButton = styled(Input)`
  margin-right: 30px;
  color: black;
  background-color: #87ceeb;
  width: 15%;
  border: 3;
  padding-left: 2;
  padding-right: 2;
  box-shadow: 6px 6px 3px 1px rgba(0, 0, 255, 0.2);
  border-radius: 4px;
  border: 1px solid black;
  margin-top: 20px;
  text-align: center;
`;


  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // axios
    //   .post("http://localhost:5000/student", {
    //     studentName: data.fullname,
    //     motherName: data.mothername,
    //     fatherName: data.fathername,
    //     address: data.address,
    //     studenId: data.studentId,
    //     dept: data.dept,
    //   })
    //   .then(function (response) {
    //     if (response.data.acknowledged) {
    //       toast.success("Successfully added");
    //     }

    //     console.log(response.data.acknowledged);
    //   })
    //   .catch(function (error) {
    //     console.log(error);

    //     toast.error("Failed to added");
    //   });
    // navigateToHome();
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };


  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Modal title
        </BootstrapDialogTitle>
        <FormContainer>
          {/* <ArrowBackIcon
            onClick={navigateToHome}
            sx={{
              backgroundColor: "#87CEEB",
              padding: 0.5,
              borderRadius: "50%",
              fontSize: "26px",
              fontWeight: "bolder",
            }}
          ></ArrowBackIcon> */}
          <Box
            sx={{
              backgroundColor: "#E0F2F1",
              padding: 4,
              borderRadius: "4px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Student Name"
                    type="text"
                    autoComplete="fullname"
                    fullWidth
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname?.type === "required" && (
                    <Typography color="red">* First name is required</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Father name"
                    type="text"
                    autoComplete="father-name"
                    fullWidth
                    {...register("fathername", { required: true })}
                  />
                  {errors.fathername?.type === "required" && (
                    <Typography color="red">* Father name is required</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mother name"
                    type="text"
                    autoComplete="mother-name"
                    fullWidth
                    {...register("mothername", { required: true })}
                  />
                  {errors.mothername?.type === "required" && (
                    <Typography color="red">* Mother name is required</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Address"
                    type="text"
                    autoComplete="address"
                    fullWidth
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <Typography color="red">
                      * address name is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Student Id"
                    type="number"
                    autoComplete="student-id"
                    fullWidth
                    {...register("studentId", { required: true })}
                  />
                  {errors.studentId?.type === "required" && (
                    <Typography color="red">* student Id is required</Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="dept"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="dept">Dept</InputLabel>

                        <Select
                          labelId="dept"
                          id="dept"
                          value={dept}
                          label="Dept"
                          onChange={handleChange}
                          fullWidth
                          {...field}
                        >
                          <MenuItem value={"short-courses"}>
                            Short courses
                          </MenuItem>
                          <MenuItem value={"featured-courses"}>
                            Featured courses
                          </MenuItem>
                          <MenuItem value={"undergraduate"}>
                            Undergraduate
                          </MenuItem>
                          <MenuItem value={"diploma"}>diploma</MenuItem>
                          <MenuItem value={"certificate"}>Certificate</MenuItem>
                          <MenuItem value={"masters-degreeaduate"}>
                            Masters degree
                          </MenuItem>
                          <MenuItem value={"postgraduate"}>Postgraduate</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <InputButton type="submit" />

            </form>
          </Box>
        </FormContainer>
        <DialogActions>
          <Button autoFocus onClick={onClose} >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

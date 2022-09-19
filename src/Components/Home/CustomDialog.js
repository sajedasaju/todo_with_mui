import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from '@hookform/resolvers/yup';
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from 'yup';
import { CheckBox } from "@mui/icons-material";




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const TextFieldDesigned = styled(TextField)(({ theme }) => ({

 " & .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      "border-color": "#406b66",
      'border-width':'.5px'
    },
  }
  }

));
const SelectDesigned = styled(Select)(({ theme }) => ({

 " & .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      "border-color": "#406b66",
      'border-width':'.5px'
    },
   
  }

  }

));


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
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            backgroundColor: "#87CEEB",
            padding: 0.5,
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "bolder",
          }}

          // sx={{
          //   backgroundColor: "#87CEEB",
          //   padding: 0.5,
          //   borderRadius: "50%",
          //   fontSize: "26px",
          //   fontWeight: "bolder",
          // }}


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

  let schema = yup.object().shape({
    fullname: yup.string().required(),
    fatherName: yup.string().required(),
    motherName: yup.string().required(),
    address: yup.string().required(),
    studentId: yup.number().required().positive().integer(),
    dept: yup.string().required(),
  });

  const [dept, setDept] = useState("");
  const handleChange = (event) => {
    setDept(event.target.value);
  };
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setDept(checkData?.dept);
    reset({
      fullname: checkData?.studentName,
      fathername: checkData?.fatherName,
      mothername: checkData?.motherName,
      address: checkData?.address,
      studentId: checkData?.studenId,
      dept: checkData?.dept,
    });
  }, []);

 
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    console.log(data);
    if (!checkData) {
      console.log(checkData);
      axios
        .post("http://localhost:5000/student", {
          studentName: data.fullname,
          motherName: data.mothername,
          fatherName: data.fathername,
          address: data.address,
          studenId: data.studentId,
          dept: data.dept,
        })
        .then(function (response) {
          if (response.data.acknowledged) {
            toast.success("Successfully added");
          }

          console.log(response.data.acknowledged);
        })
        .catch(function (error) {
          console.log(error);

          toast.error("Failed to added");
        });

    }

    if(checkData){
      axios
      .patch(`http://localhost:5000/student/${checkData._id}`, {
        studentName: data.fullname
          ? data.fullname
          : checkData?.studentName,
        motherName: data.mothername
          ? data.mothername
          : checkData?.motherName,
        fatherName: data.fathername
          ? data.fathername
          : checkData?.fatherName,
        address: data.address ? data.address : checkData?.address,
        studenId: data.studentId ? data.studentId : checkData?.studenId,
        dept: data.dept ? data.dept : checkData?.dept,
      })
      .then((response) => {
        console.log(response);
        toast.success("successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    }
    
    navigateToHome();
  };

  const FormContainer = styled(Box)`
  color: #2e8b57;
  background-color: #b2dfdb;
  padding: 35px;
  width: 70%;
  margin: 10% auto;
  border-radius: 10px;
`;

const CustomCheckbox = styled(CheckBox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));
  return (
    <>

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
              backgroundColor:'primary.success',
              padding: 4,
              borderRadius: "4px",
            }}
          >
            <CustomCheckbox defaultChecked />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextFieldDesigned
                 
                    id="outlined-text"
                    label="Student Name"
                    type="text"
                    autoComplete="fullname"
                    fullWidth
                    InputLabelProps={{
                      style: { color: '#406b66' },
                    }}
                    helperText={errors?.fullname?.message}
                    {...register("fullname", { required: true })}
                  />
                  {/* {errors.fullname?.type === "required" && (
                    <Typography color="red">
                      * First name is required
                    </Typography>
                  )} */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldDesigned
                    label="Father name"
                    type="text"
                    variant="outlined"
                    autoComplete="father-name"
                    InputLabelProps={{
                      style: { color: '#406b66' },
                    }}
                    fullWidth
                    {...register("fathername", { required: true })}
                  />
                  {errors.fathername?.type === "required" && (
                    <Typography color="red">
                      * Father name is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldDesigned
                    label="Mother name"
                    type="text"
                    autoComplete="mother-name"
                    InputLabelProps={{
                      style: { color: '#406b66' },
                    }}
                    fullWidth
                    {...register("mothername", { required: true })}
                  />
                  {errors.mothername?.type === "required" && (
                    <Typography color="red">
                      * Mother name is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldDesigned
                    label="Address"
                    type="text"
                    autoComplete="address"
                    fullWidth
                    InputLabelProps={{
                      style: { color: '#406b66' },
                    }}
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <Typography color="red">
                      * address name is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldDesigned
                    label="Student Id"
                    type="number"
                    autoComplete="student-id"
                    fullWidth
                    InputLabelProps={{
                      style: { color: '#406b66' },
                    }}
                    {...register("studentId", { required: true })}
                  />
                  {errors.studentId?.type === "required" && (
                    <Typography color="red">
                      * student Id is required
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name="dept"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="dept_label">Dept</InputLabel>

                        <SelectDesigned
                          labelId="dept_label"
                          id="dept"
                          value={dept}
                          label="Dept"
                          onChange={handleChange}
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{
                            style: { color: '#406b66' },
                          }}
                          {...field}
                          {...register("dept", { required: true })}
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
                          <MenuItem value={"postgraduate"}>
                            Postgraduate
                          </MenuItem>
                        </SelectDesigned>

                        {errors.dept?.type === "required" && (
                          <Typography color="red">
                            * dept is required
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Input
                sx={{
                  border: 1,
                  marginTop: 2,
                  paddingX: 4,
                  borderRadius: 1,
                  outline: 3,
                  backgroundColor: "skyblue",
                  boxShadow: " 6px 6px 3px 1px rgba(0, 0, 255, .2)",
                }}
                type="submit"
              />
            </form>
          </Box>
        </FormContainer>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

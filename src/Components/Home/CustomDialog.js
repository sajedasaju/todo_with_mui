import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup";

const PREFIX = "CustomDialog";
const classes = {
  container: `${PREFIX}-container`,
  button: `${PREFIX}-button`,
  dialogContainerStyle: `${PREFIX}-dialogContainerStyle`,
  dialogTitle: `${PREFIX}-dialogTitle`,
  select: `${PREFIX}-select`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.container}`]: {
    padding: 20,
    position: "relative",
  },
  [`& .${classes.button}`]: {
    backgroundColor: "red !important",
    background: "red !important",
  },

  [`& .${classes.dialogContainerStyle}`]: {
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    marginTop: "0px",
  },
  [`& .${classes.dialogTitle}`]: {
    backgroundColor: "red",
  },
  [`& .${classes.select}`]: {
    color: "black",
    "&:before": {
      // changes the bottom textbox border when not focused
      borderColor: "red",
      color: "black",
    },
    "&:after": {
      // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
      borderColor: "green",
    },
  },
}));

const TextFieldDesigned = styled(TextField)(({ theme }) => ({
  border: 0,
  backgroundColor: "#efeeea",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
}));
const SelectDesigned = styled(Select)(({ theme }) => ({
  color: "#6d6d6d",

  " & .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      "border-color": "#406b66",
      "border-width": ".5px",
    },
  },
}));

const CustomizeDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      className={classes.dialogTitle}
      sx={{
        m: 2,
        p: 2,
        textAlign: "center",
        fontSize: "29px",
        fontWeight: "bold",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.lightGray,
            backgroundColor: "#b7b2aa",
            padding: 0.5,
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "bolder",
            align: "center",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomizeDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDialog({
  onClose,
  checkData,
  setCheckEdit,
  setCheckAdd,
}) {
  console.log(PREFIX);
  let schema = yup.object().shape({
    fullname: yup.string().required("Please enter your name! It's rquired"),
    fathername: yup
      .string()
      .required("Please enter your father name! It's rquired"),
    mothername: yup
      .string()
      .required("Please enter your mother name! It's rquired"),
    address: yup.string().required("Please enter your address! It's rquired"),
    studentId: yup
      .number()
      .typeError("A Number is Required")
      .required("Please enter your id! It's rquired"),
    dept: yup.string().required("Please enter your dept! It's rquired"),
  });

  const [dept, setDept] = useState("");
  const handleChange = (event) => {
    setDept(event.target.value);
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
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    // console.log('from create data from function')
    if (!checkData) {
      async function createdData() {
        try {
          const createdData = await axios
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
            });
          setCheckAdd(true);
        } catch (error) {
          toast.error("Failed to added");
        }
      }
      createdData();
    }

    if (checkData) {
      async function editData() {
        try {
          const editedData = await axios
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
            });
          setCheckEdit(true);
        } catch (error) {
          toast.error("Failed to Edit");
        }
      }
      editData();
    }

    reset();
    onClose();
  };


  return (
    <StyledGrid container>
      <Dialog
        className={classes.dialogContainerStyle}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="md"
      >
        <CustomizeDialogTitle id="customized-dialog-title" onClose={onClose}>
          {checkData ? "Edit Your Data" : "Add your data"}
        </CustomizeDialogTitle>

        <Grid
          container
          color="#2e8b57"
          width="80%"
          p={4}
          bgcolor="#f4f1eb"
          margin="0 auto"
          mb={5}
          borderRadius={3}
        >
          {/* <CustomCheckbox defaultChecked /> */}
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
                    style: { color: "#6d6d6d" },
                  }}
                  color="primary"
                  variant="filled"
                  helperText={errors?.fullname?.message}
                  {...register("fullname", { required: true })}

                  // style={{
                  //   backgroundColor:'#F4F1EB'
                  // }}
                />
                {/* <FormHelperText>{errors?.fullname?.message}</FormHelperText> */}
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
                  autoComplete="father-name"
                  InputLabelProps={{
                    style: { color: "#6d6d6d" },
                  }}
                  color="primary"
                  variant="filled"
                  fullWidth
                  {...register("fathername", { required: true })}
                  helperText={errors?.fathername?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldDesigned
                  label="Mother name"
                  type="text"
                  autoComplete="mother-name"
                  InputLabelProps={{
                    style: { color: "#6d6d6d" },
                  }}
                  color="primary"
                  variant="filled"
                  fullWidth
                  {...register("mothername", { required: true })}
                  helperText={errors?.mothername?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldDesigned
                  label="Address"
                  type="text"
                  autoComplete="address"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#6d6d6d" },
                  }}
                  color="primary"
                  variant="filled"
                  {...register("address", { required: true })}
                  helperText={errors?.address?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldDesigned
                  label="Student Id"
                  type="text"
                  autoComplete="student-id"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#6d6d6d" },
                  }}
                  color="primary"
                  variant="filled"
                  {...register("studentId", { required: true })}
                  helperText={errors?.studentId?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="dept"
                  render={({ field }) => (
                    <FormControl variant="filled" fullWidth>
                      <InputLabel style={{ color: "#6d6d6d" }} id="dept_label">
                        Dept
                      </InputLabel>

                      <SelectDesigned
                        labelId="dept_label"
                        className={classes.select}
                        id="dept"
                        value={dept}
                        // label="Dept"
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                          style: { color: "#6d6d6d" },
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
                        <MenuItem value={"postgraduate"}>Postgraduate</MenuItem>
                      </SelectDesigned>
                      <FormHelperText>{errors?.dept?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Input
              disableUnderline={true}
              sx={{
                border: 0,
                marginTop: 2,
                paddingX: 4,
                paddingY: 0.5,
                borderRadius: 1,
                backgroundColor: "#b7b2aa",
                alignItems: "center",
                // boxShadow: " 6px 6px 3px 1px rgba(0, 0, 255, .2)",
              }}
              type="submit"
            />
          </form>
        </Grid>
      </Dialog>
    </StyledGrid>
  );
}

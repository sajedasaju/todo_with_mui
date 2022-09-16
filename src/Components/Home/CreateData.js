import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const { Option } = Select;
const CreateData = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

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
    // navigateToHome();
  };

  const [dept, setDept] = useState("");

  const handleChange = (event) => {
    console.log(event);
    setDept(event.target.value);
  };
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
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

  // width:'15%',
  // textAlign:'center',
  // border: 1,
  // marginTop: 2,
  // paddingX: 1,
  // borderRadius: 1,
  // outline: 2,
  // backgroundColor: "skyblue",
  // boxShadow: " 6px 6px 3px 1px rgba(0, 0, 255, .2)",
  

  return (
    <>
      <FormContainer>
      <ArrowBackIcon
          onClick={navigateToHome}
          sx={{
            backgroundColor: "#87CEEB",
            padding: 0.5,
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "bolder",
          }}
    ></ArrowBackIcon>
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
    </>
  );
};

export default CreateData;

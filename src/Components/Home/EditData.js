import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const EditData = () => {
  const { dataId } = useParams();
  const [studentDetails, setStudentDetails] = useState('');
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setDept(studentDetails?.dept);
    reset({
      fullname: studentDetails?.studentName,
      fathername: studentDetails?.fatherName,
      mothername: studentDetails?.motherName,
      address: studentDetails?.address,
      studentId: studentDetails?.studenId,
      dept: studentDetails?.dept,
    });
  }, [studentDetails]);

  useEffect(() => {
    const url = `http://localhost:5000/allStudent/${dataId}`;
    axios.get(url).then(function (response) {
      setStudentDetails(response.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios
      .patch(`http://localhost:5000/student/${dataId}`, {
        studentName: data.fullname
          ? data.fullname
          : studentDetails?.studentName,
        motherName: data.mothername
          ? data.mothername
          : studentDetails?.motherName,
        fatherName: data.fathername
          ? data.fathername
          : studentDetails?.fatherName,
        address: data.address ? data.address : studentDetails?.address,
        studenId: data.studentId ? data.studentId : studentDetails?.studenId,
        dept: data.dept ? data.dept : studentDetails?.dept,
      })
      .then((response) => {
        console.log(response);
        toast.success("successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    navigateToHome();
  };

  const [dept, setDept] = useState("");
  console.log(dept);
  const handleChange = (event) => {
    setDept(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 10,
          width: "70%",
          marginX: "auto",
          border: 1,
          marginY: 10,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "primary.parent",
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("address", { required: true })}
              />
              {errors.address?.type === "required" && (
                <Typography color="red">* address name is required</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Student Id"
                type="number"
                autoComplete="student-id"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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
                    <InputLabel id="dept_label">Dept</InputLabel>

                    <Select
                      labelId="dept_label"
                      id="dept"
                      value={dept}
                      label="Dept"
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...field}
                    >
                      <MenuItem value={"short-courses"}>Short courses</MenuItem>
                      <MenuItem value={"featured-courses"}>
                        Featured courses
                      </MenuItem>
                      <MenuItem value={"undergraduate"}>Undergraduate</MenuItem>
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
    </div>
  );
};

export default EditData;

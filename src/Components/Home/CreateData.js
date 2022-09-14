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
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;
const CreateData = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>  {
    console.log(data);
    
axios.post('http://localhost:5000/student', {
    studentName:data.fullname,
    motherName:data.mothername,
    fatherName: data.fathername,
    address: data.address,
    studenId:data.studentId,
    dept: data.dept,
  })
  .then(function (response) {
    if(response.data.acknowledged){
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
    console.log(event)
    setDept(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 10,
          width: "70%",
          marginX: "auto",
          border: 1,
          marginY: 10,
          padding: 4,
          borderRadius: 2,
          backgroundColor
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
              {
                
                errors.fullname?.type === "required" &&<Typography color='red'>* First name is required</Typography>

              }
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Father name"
                type="text"
                autoComplete="father-name"
                fullWidth
                {...register("fathername", { required: true })}
              />
                        {
                
                errors.fathername?.type === "required" &&<Typography color='red'>* Father name is required</Typography>

              }
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mother name"
                type="text"
                autoComplete="mother-name"
                fullWidth
                {...register("mothername", { required: true })}
                />
                          {
                  
                  errors.mothername?.type === "required" &&<Typography color='red'>* Mother name is required</Typography>
  
                }
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                type="text"
                autoComplete="address"
                fullWidth
                {...register("address", { required: true })}
                />
                          {
                  
                  errors.address?.type === "required" &&<Typography color='red'>* address name is required</Typography>
  
                }
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Student Id"
                type="number"
                autoComplete="student-id"
                fullWidth
                {...register("studentId", { required: true })}
                />
                          {
                  
                  errors.studentId?.type === "required" &&<Typography color='red'>* student Id  is required</Typography>
  
                }
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

          <Input sx={{

          }} type="submit" />
        </form>
      </Box>

      
    </>
  );
};

export default CreateData;

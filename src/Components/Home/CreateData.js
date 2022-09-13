import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MenuItem from '@mui/material/MenuItem';

const CreateData = () => {
    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

      const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
          borderRadius:2
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Student Name"
              type="text"
              autoComplete="student-name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Father name"
              type="text"
              autoComplete="father-name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Mother name"
              type="text"
              autoComplete="mother-name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              type="text"
              autoComplete="address"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Student Id"
              type="number"
              autoComplete="student-id"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          </Grid>
         
        </Grid>
      </Box>

      {/* <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
           <TextField
          id="outlined-password-input"
          label="Password"
          type="text"
          autoComplete="current-password"
        />
          <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
           <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
           <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        /> */}
    </>
  );
};

export default CreateData;

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowData = () => {
    const [allData,setAllData]=useState([]);   
console.log(
allData
)

    useEffect(() => {
        axios.get('http://localhost:5000/allStudent')
        .then(function (response) {
          setAllData(response.data)
        
        })
    }, []);
    
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      
    return (
        <div>
             <TableContainer sx={{ width:"80%",border: 2,
    borderColor: 'primary.light',margin:'auto'}}  component={Paper}>
      <Table sx={{ width:'100%' }} aria-label="simple table">
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.studentName}
              </TableCell>
              <TableCell align="center">{row.motherName}</TableCell>
              <TableCell align="center">{row.fatherName}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">{row.studenId}</TableCell>
              <TableCell align="center">{row.dept}</TableCell>
              <TableCell align="center"></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}

export default ShowData;

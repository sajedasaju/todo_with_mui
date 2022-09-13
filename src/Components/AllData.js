import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, flexbox } from '@mui/system';




const AllData = () => {

    const [allData,setAllData]=useState('');
useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res=>res.json())
    .then(data=>setAllData(data))
},[])

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
   
  ];
  

console.log('hi',allData)

    return (
        <Box
        sx={{
            width: '100%',
            height: 500,
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        //  sx={{ height: 400, width: '80%',display:"flexbox",alignItems:'center',justifyContent:'center'  }}
         >
      <DataGrid
        rows={allData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
    );
}

export default AllData;

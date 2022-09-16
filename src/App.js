import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateData from './Components/Home/CreateData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditData from './Components/Home/EditData';
import { ThemeProvider } from '@emotion/react';
import { teal } from '@mui/material/colors';
import { createTheme } from '@mui/material';
import CustomDialogs from './Components/Home/CustomDialog';


function App() {
  
  // const theme = createTheme({
  //   status: {
  //     danger: "#e53e3e",
  //   },
  //   palette: {
  //     primary: {
  //       // Purple and green play nicely together.
  //       parent: teal[100],
  //       main: teal[50],
  //       darker: "#053e85",
  //     },
  //     secondary: {
  //       // This is green.A700 as hex.
  //       main: "#11cb5f",
  //     },
  //     neutral: {
  //       main: "#64748B",
  //       contrastText: "#fff",
  //     },
  //   },
  // });
  
  return (
    <div>
       {/* <ThemeProvider theme={theme}> */}
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createData" element={<CreateData />} />
        <Route path="/dialog" element={<CustomDialogs />} />
        <Route path="/editData/:dataId" element={<EditData />} />
      </Routes>
      <ToastContainer />

      {/* </ThemeProvider> */}

    </div>
  );
}

export default App;

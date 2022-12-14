import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateData from './Components/Home/CreateData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditData from './Components/Home/EditData';
import CustomDialogs from './Components/Home/CustomDialog';
import axios from 'axios';
import { Box } from '@mui/material';

axios.interceptors.request.use(req=>{
  console.log(req)
  return req
})
function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/createData" element={<CreateData />} />
        <Route path="/dialog" element={<CustomDialogs />} />
        <Route path="/editData/:dataId" element={<EditData />} /> */}
      </Routes>
      <ToastContainer />


    </Box>
  );
}

export default App;

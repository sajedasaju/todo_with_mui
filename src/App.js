import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateData from './Components/Home/CreateData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createData" element={<CreateData />} />
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;

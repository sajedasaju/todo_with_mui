import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateData from './Components/Home/CreateData';


function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createData" element={<CreateData />} />
      </Routes>
    </div>
  );
}

export default App;

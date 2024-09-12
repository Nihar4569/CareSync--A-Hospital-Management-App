import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Toaster } from "react-hot-toast";
import { useContext } from 'react';
import { Context } from '.';
import Dashboard from './Pages/Dashboard';
import Hospital from './Pages/Hospital';
import Hregister from './Pages/Hregister';
import Hdash from './Pages/Hdash';
import AllLogins from './Pages/AllLogins';
import Alogin from './Pages/Alogin';



function App() {
  const {userData,setUserData} = useContext(Context)
  return (
    <div className="App">
      <Router>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/all" element={<AllLogins/>}/>
          <Route path="/dash" element={<Dashboard/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user" element={<Login/>}/>
          <Route path="/hospital" element={<Hospital/>}/>
          <Route path="/alogin" element={<Alogin/>}/>
          <Route path="/hdash" element={<Hdash/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Toaster } from "react-hot-toast";
import { useContext } from 'react';
import { Context } from '.';
import Dashboard from './Pages/Dashboard';



function App() {
  const {userData,setUserData} = useContext(Context)
  return (
    <div className="App">
      <Router>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dash" element={<Dashboard/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

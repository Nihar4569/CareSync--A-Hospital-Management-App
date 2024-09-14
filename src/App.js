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
import Alogin from './Pages/Hlogin';
import Ddash from './Pages/Ddash';
import Dlogin from './Pages/Dlogin';
import Sadmin from './Pages/Sadmin';
import Glogin from './Pages/Glogin';
import About from './Pages/About';
import Hlogin from './Pages/Hlogin';



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
          <Route path="/hlogin" element={<Hlogin/>}/>
          <Route path="/hdash" element={<Hdash/>}/>
          <Route path="/ddash" element={<Ddash/>}/>
          <Route path="/dlogin" element={<Dlogin/>}/>
          <Route path="/govt" element={<Sadmin/>}/>
          <Route path="/glogin" element={<Glogin/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/hregister" element={<Hregister/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

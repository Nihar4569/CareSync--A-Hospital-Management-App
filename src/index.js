import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const server = "http://localhost:8090"
export const Context = createContext({});
const AppWrapper = ()=>{
  const [userData,setUserData] = useState("");
  const [mediData,setMediData] = useState("");
  const [loading, setLoading] = useState(false);
  const [hosp, setHosp] = useState(true);
  const [hdata, setHdata] = useState(true);
  const [adata, setAdata] = useState(true);
  return(
    <Context.Provider value={{
      userData,
      setUserData,
      mediData,
      setMediData,
      loading,
      setLoading,
      hosp,
      setHosp,
      hdata,
      setHdata,
      adata,
      setAdata
    }}>
      <App/>  
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

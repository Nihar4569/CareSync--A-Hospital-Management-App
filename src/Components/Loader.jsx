import React from 'react';
import Logo from "../Pages/Images/logo1.png"

const Loader = () => {
  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <img src={Logo} alt="Avatar" className="rounded-full h-28 w-28"/>
      </div>
    </>
  );
}

export default Loader;

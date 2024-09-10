import React from 'react'
import Header from '../Components/Header'
import logo from "./Images/logo.png"


export default function Home() {
  return (<>
        <Header/>
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <img
          src={logo}
          alt="Hospital Logo"
          className="mx-auto mb-4 w-78 h-78 object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Hospital Management Site
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Efficiently manage hospital operations, track patient records, and streamline administrative tasks with ease.
        </p>
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
    </>
  );
}


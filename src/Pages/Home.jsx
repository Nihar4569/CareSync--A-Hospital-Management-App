import React from 'react';
import Header from '../Components/Header';
import logo from "./Images/logo.png";
import delhiLogo from "./Images/delhi.png"; // Add Delhi Govt logo
import { useNavigate } from 'react-router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import hospital1 from './Images/AIIMS-Delhi-1024x538.jpg';
import hospital2 from './Images/Hospital-delhi.jpg';
import hospital3 from './Images/AIIMS-Delhi-1024x538.jpg';

export default function Home() {
  const navigate = useNavigate();

  // Carousel responsive settings
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center mb-8">
          <img
            src={logo}
            alt="Hospital Logo"
            className="mx-auto mb-4 w-48 h-48 object-contain animate-pulse"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-down">
            Delhi Hospital Management
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate-fade-in">
            Efficiently manage hospital operations, track patient records, and streamline administrative tasks with ease.
          </p>
          <button
            onClick={() => navigate("/all")}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-600 transition duration-300 animate-bounce"
          >
            Get Started
          </button>
        </div>

        {/* Carousel Section */}
        <div className="max-w-4xl w-full mb-12">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
            showDots={true}
          >
            <div className="h-64">
              <img src={hospital1} alt="Hospital 1" className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
            <div className="h-64">
              <img src={hospital2} alt="Hospital 2" className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
            <div className="h-64">
              <img src={hospital3} alt="Hospital 3" className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
          </Carousel>
        </div>

        {/* Features Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-2xl mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Features</h2>
          <ul className="text-left text-gray-600 space-y-4">
            <li>✔️ Hospital Bed Management: Real-time tracking of hospital beds and availability for both general and emergency cases.</li>
            <li>✔️ Patient Records Management: Easily access and manage patient information, treatment history, and medical records.</li>
            <li>✔️ Doctor’s Dashboard: Dedicated section for doctors to view available beds, manage patient registrations, and review medicine stocks.</li>
            <li>✔️ Medicine Inventory: Track and manage the availability of medicines in each hospital.</li>
            <li>✔️ Admin Panel: Verify hospitals, manage users, and monitor hospital performance through an interactive dashboard.</li>
            <li>✔️ Audit Logging: Keep track of all actions within the system, ensuring transparency and accountability.</li>
          </ul>
        </div>

        {/* Delhi Government Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-2xl">
          <img src={delhiLogo} alt="Delhi Govt Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Government of NCT of Delhi</h2>
          <p className="text-gray-600">Our mission is to provide accessible healthcare to every citizen of Delhi, ensuring efficient management of hospital resources.</p>
        </div>
      </div>
    </>
  );
}

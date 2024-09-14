import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '..';
import Header from '../Components/Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Loader from '../Components/Loader';
import audit from  '../Components/Audit'


export default function Dashboard() {
  const { userData, mediData, setMediData, loading, setLoading, hosp, setHosp } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/hosp/all`, { withCredentials: true });
        setMediData(data || []); 
        setLoading(false); 
      } catch (error) {
        toast.error(error.response ? error.response.data.message : "An error occurred");
        setLoading(false); 
      }
    };
    fetchHospital();
  }, [setMediData, setLoading]);

  const filteredHospitals = (mediData || []) 
    .filter(hospital => hospital.hname.toLowerCase().includes(searchTerm.toLowerCase())) 
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.bed - b.bed;
      } else {
        return b.bed - a.bed;
      }
    });

  const viewHandler = (hospital) => {
    setHosp(hospital.hname);
    navigate("/hospital");
  };

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
    <Loader />
  </div>
  
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
        <div className="max-w-7xl mx-auto py-6">
        {userData ? (
    <>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 animate-fadeInDown">
        Welcome, {userData.name}
      </h1>
      <p className="text-sm sm:text-lg text-gray-600 mb-8">
        {`Email: ${userData.email}`}
      </p>
    </>
  ) : null}

          {/* Search and Filter Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="w-full sm:w-1/3 mb-4 sm:mb-0 animate-slideInLeft">
              <input
                type="text"
                placeholder="Search by hospital name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="w-full sm:w-1/3 mb-4 sm:mb-0 text-right animate-slideInRight">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="desc">Beds: High to Low</option>
                <option value="asc">Beds: Low to High</option>
              </select>
            </div>
          </div>

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredHospitals && filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital, index) => (
                <div
                  key={hospital._id}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300 animate-slideUp ${index % 2 === 0 ? 'delay-100' : 'delay-200'}`}
                >
                  <h2 className="text-lg sm:text-2xl font-semibold text-teal-600 mb-2 sm:mb-4">
                    {hospital.hname}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                    <span className="font-semibold">Address:</span> {hospital.haddress}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                    <span className="font-semibold">Phone:</span> {hospital.hphone}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                    <span className="font-semibold">Email:</span> {hospital.hemail}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                    <span className="font-semibold">Available Beds:</span> {hospital.bed}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">Emergency Beds:</span> {hospital.ebed}
                  </p>
                  <button 
                    onClick={() => viewHandler(hospital)} 
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-teal-600 transition duration-300 text-sm sm:text-base"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hospitals found...</p>
            )}
          </div>
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-in-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-in-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.7s ease-in-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
}

import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Header from '../Components/Header';
import { Context, server } from '..';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// AuditCard Component
const AuditCard = ({ audit }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-3 mb-2 text-sm"
  >
    <h3 className="text-md font-semibold text-teal-600 mb-1">{audit.audit}</h3>
    <p className="text-gray-500 text-xs">{new Date(`${audit.date}T${audit.time}`).toLocaleString()}</p>
  </motion.div>
);

// HospitalCard Component
const HospitalCard = ({ hospital, onVerifyToggle, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-3 mb-2 text-sm cursor-pointer"
    onClick={() => onClick(hospital)}
  >
    
    <h3 className="text-md font-semibold text-teal-600 mb-1">{hospital.hname}</h3>
    <p className="text-gray-500 text-xs">{hospital.haddress}</p>
    <p className="text-gray-600">{hospital.hemail}</p>
    <button
      onClick={(e) => { e.stopPropagation(); onVerifyToggle(hospital.hemail); }}
      className={`mt-2 px-4 py-2 rounded-md ${hospital.hverified ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
    >
      {hospital.hverified ? 'Mark as Pending' : 'Mark as Verified'}
    </button>
  </motion.div>
);





ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnimatedPeopleEngagementChart = () => {
  const [data, setData] = useState([
    { name: 'Patients', value: 0 },
    { name: 'Doctors', value: 0 },
    { name: 'Nurses', value: 0 },
    { name: 'Staff', value: 0 },
    { name: 'Visitors', value: 0 },
  ]);

  const finalData = [
    { name: 'Patients', value: 150 },
    { name: 'Doctors', value: 30 },
    { name: 'Nurses', value: 50 },
    { name: 'Staff', value: 70 },
    { name: 'Visitors', value: 100 },
  ];

  useEffect(() => {
    const animationDuration = 2000;
    const steps = 60;
    const interval = animationDuration / steps;

    let step = 0;
    const timer = setInterval(() => {
      if (step < steps) {
        const progress = step / steps;
        const newData = data.map((item, index) => ({
          ...item,
          value: Math.round(finalData[index].value * progress),
        }));
        setData(newData);
        step++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const HospitalModal = ({ hospital, onClose }) => {
  if (!hospital) return null;

  const generalBedData = {
    labels: ['Available Beds', 'Occupied Beds'],
    datasets: [
      {
        data: [hospital.bed - hospital.bbed || 0, hospital.bbed || 0],
        backgroundColor: ['#4BC0C0', '#FF6384'],
        hoverBackgroundColor: ['#4BC0C0', '#FF6384']
      }
    ]
  };

  const emergencyBedData = {
    labels: ['Available eBeds', 'Occupied eBeds'],
    datasets: [
      {
        data: [hospital.ebed - hospital.bebed || 0, hospital.bebed || 0],
        backgroundColor: ['#FFCE56', '#FF9F40'],
        hoverBackgroundColor: ['#FFCE56', '#FF9F40']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Bed Availability',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
    >
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">{hospital.hname} Details</h2>
        <p className="text-gray-700"><strong>Address:</strong> {hospital.haddress || 'N/A'}</p>
        <p className="text-gray-700 mb-6"><strong>Email:</strong> {hospital.hemail || 'N/A'}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-center">General Beds</h3>
            <div className="h-64">
              <Pie data={generalBedData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 text-center">Emergency Beds</h3>
            <div className="h-64">
              <Pie data={emergencyBedData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center">People Engagement</h3>
          <div className="h-64">
            <AnimatedPeopleEngagementChart />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full md:w-auto px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

// DoctorCard Component
const DoctorCard = ({ doctor }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-3 mb-2 text-sm"
  >
    <h3 className="text-md font-semibold text-teal-600 mb-1">{doctor.dname}</h3>
    <p className="text-gray-500 text-xs">{doctor.specialty}</p>
    <p className="text-gray-600">{doctor.email}</p>
  </motion.div>
);


// Sadmin Component
const Sadmin = () => {
  const [audits, setAudits] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [verifiedHospitals, setVerifiedHospitals] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const { adata } = useContext(Context);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [auditsRes, hospitalsRes, doctorsRes] = await Promise.all([
          axios.get(`${server}/audit/all`),
          axios.get(`${server}/hosp/all`),
          axios.get(`${server}/hosp/doctor`)
        ]);

        // Sort audits by date and time in descending order (newest first)
        const sortedAudits = auditsRes.data.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB - dateA;
        });

        setAudits(sortedAudits);
        setHospitals(hospitalsRes.data);
        setDoctors(doctorsRes.data);

        // Categorize hospitals based on verification status
        setVerifiedHospitals(hospitalsRes.data.filter(hospital => hospital.hverified));
        setPendingHospitals(hospitalsRes.data.filter(hospital => !hospital.hverified));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyToggle = async (email) => {
    try {
      await axios.get(`http://localhost:8090/hosp/verify/${email}`);
      // Refetch data after verification status is toggled
      const response = await axios.get('http://localhost:8090/hosp/all');
      setHospitals(response.data);
      setVerifiedHospitals(response.data.filter(hospital => hospital.hverified));
      setPendingHospitals(response.data.filter(hospital => !hospital.hverified));
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  const filteredAudits = useMemo(() => {
    return audits.filter(audit => audit?.audit?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [audits, searchTerm]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => hospital?.hname?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [hospitals, searchTerm]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => doctor?.dname?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [doctors, searchTerm]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Government of National Capital Territory of Delhi</h1>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search audits, hospitals, or doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Audit Logs */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">Audit Logs</h2>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <AnimatePresence>
                  {filteredAudits.map(audit => (
                    <AuditCard key={audit.id} audit={audit} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Verified Hospitals */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">Verified Hospitals</h2>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <AnimatePresence>
                  {filteredHospitals.filter(h => h.hverified).map(hospital => (
                    <HospitalCard key={hospital.id} hospital={hospital} onVerifyToggle={handleVerifyToggle} onClick={setSelectedHospital} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Pending Verification Hospitals */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">Pending Verification</h2>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <AnimatePresence>
                  {filteredHospitals.filter(h => !h.hverified).map(hospital => (
                    <HospitalCard key={hospital.id} hospital={hospital} onVerifyToggle={handleVerifyToggle} onClick={setSelectedHospital} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Doctor List */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-teal-600 mb-4">Doctors</h2>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <AnimatePresence>
                  {filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Modal */}
      <AnimatePresence>
        {selectedHospital && <HospitalModal hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Sadmin;

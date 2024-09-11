import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Context, server } from '..';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#38b2ac', '#fc8181'];

const BedChart = React.memo(({ data, title }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-teal-600 mb-2">{title}</h3>
    <div className="h-40 sm:h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
));

const BlinkingText = ({ regularAvailable, emergencyAvailable }) => {
  const [blinkState, setBlinkState] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className="mt-4 text-center"
      animate={{ opacity: blinkState ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-2xl font-bold text-teal-600">
        Available Beds: {regularAvailable + emergencyAvailable}
      </p>
      <p className="text-lg text-gray-600">
        Regular: {regularAvailable} | Emergency: {emergencyAvailable}
      </p>
    </motion.div>
  );
};

export default function Hospital() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [hdata, setHdata] = useState({});
  const { hosp } = useContext(Context);
  const navigate = useNavigate();
  console.log(hdata.bed)
  console.log(hdata.bbed)
  const fetchData = useCallback(async () => {
    try {
      const [medicinesRes, hospitalRes, doctorsRes] = await Promise.all([
        axios.get(`${server}/hosp/medi`),
        axios.post(`${server}/hosp/find/${hosp}`),
        axios.get('http://localhost:8090/hosp/doctor')
      ]);
      setMedicines(medicinesRes.data || []);
      setHdata(hospitalRes.data || {});
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An error occurred");
    }
  }, [hosp]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBookBed = () => {
    navigate("/book-bed");
  };

  const filteredMedicines = useMemo(() => 
    medicines.filter(medicine => 
      medicine.mname.toLowerCase().includes(searchTerm.toLowerCase()) && medicine.hname === hdata.hname
    ), [medicines, searchTerm, hdata.hname]
  );

  const filteredDoctors = useMemo(() => 
    doctors.filter(doctor => 
      doctor.hname === hdata.hname && 
      (doctor.dname.toLowerCase().includes(doctorSearchTerm.toLowerCase()) || 
       doctor.specialty.toLowerCase().includes(doctorSearchTerm.toLowerCase()))
    ), [doctors, doctorSearchTerm, hdata.hname]
  );

  const regularBedData = useMemo(() => [
    { name: 'Available', value: 300 },  
    { name: 'Occupied', value: 250 }     
  ], []);
  
  const emergencyBedData = useMemo(() => [
    { name: 'Available', value: 500 },  
    { name: 'Occupied', value: 100 }     
  ], [hdata]);
  

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto py-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-600 mb-4">
            {hdata.hname}
          </h1>
          <p className="text-gray-600 text-lg">{hdata.haddress}</p>
          <p className="text-gray-600 text-lg">{hdata.hphone}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Bed Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BedChart data={regularBedData} title="Regular Beds" />
              <BedChart data={emergencyBedData} title="Emergency Beds" />
            </div>
            <BlinkingText 
              regularAvailable={Math.max(0, hdata.bed - hdata.bbed)} 
              emergencyAvailable={Math.max(0, hdata.ebed - hdata.bebed)} 
            />
            <motion.button
              onClick={handleBookBed}
              className="mt-4 w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Bed
            </motion.button>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Available Medicines</h2>
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            <div className="max-h-64 sm:max-h-80 overflow-y-auto">
              <AnimatePresence>
                {filteredMedicines.map((medicine, index) => (
                  <motion.div
                    key={medicine._id}
                    className="bg-gray-50 p-4 rounded-lg mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-teal-600">{medicine.mname}</h3>
                    <p className="text-sm text-gray-600">Quantity: {medicine.quantity}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Available Doctors</h2>
          <input
            type="text"
            placeholder="Search doctors or specializations..."
            value={doctorSearchTerm}
            onChange={(e) => setDoctorSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
          />
          <div className="max-h-64 sm:max-h-80 overflow-y-auto">
            <AnimatePresence>
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  className="bg-gray-50 p-4 rounded-lg mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-teal-600">{doctor.dname}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

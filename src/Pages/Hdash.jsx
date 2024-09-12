import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Calendar, Phone, Mail, MapPin, Bed, PlusCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../Components/Header'
import { Context } from '..';


const PatientCard = ({ patient }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-3 mb-2 text-sm"
    >
        <h3 className="text-md font-semibold text-teal-600 mb-1">{patient.pname}</h3>
        <div className="grid grid-cols-2 gap-1">
            <p className="flex items-center"><User className="w-3 h-3 mr-1" /> {patient.gender}</p>
            <p className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(patient.dob).toLocaleDateString()}</p>
            <p className="flex items-center"><Phone className="w-3 h-3 mr-1" /> {patient.phone}</p>
            <p className="flex items-center"><Mail className="w-3 h-3 mr-1" /> {patient.email}</p>
        </div>
    </motion.div>
);

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
        <div className="grid grid-cols-2 gap-1">
            <p className="flex items-center"><User className="w-3 h-3 mr-1" /> {doctor.gender}</p>
            <p className="flex items-center"><User className="w-3 h-3 mr-1" /> {doctor.specialty}</p>
        </div>
    </motion.div>
);

const AddDoctorForm = ({ onClose, onSubmit }) => {
    const {adata, setAdata} = useContext(Context)
    const [formData, setFormData] = useState({
        dname: '',
        gender: '',
        specialty: '',
        phone: '',
        email: '',
        password: '',
        hname: adata.hname
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                            <p className="text-lg font-semibold text-green-600">Doctor added successfully!</p>
                        </div>
                    
                ) : (
                <>
                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Add New Doctor</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Add form fields here */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="dname"
                                value={formData.dname}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Specialty</label>
                            <input
                                type="text"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />

                        </div>
                        {/* Add other form fields similarly */}
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white px-4 py-2 rounded-md"
                        >
                            Add Doctor
                        </button>
                    </form>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-300 text-black px-4 py-2 rounded-md mt-2"
                    >
                        Cancel
                    </button>
                </>
                )}
            </div>
        </div >
        </>
    );
};

const AnimatedBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8">
                    {data.map((entry, index) => (
                        <motion.rect key={`bar-${index}`} initial={{ y: 300 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: index * 0.10 }} />
                    ))}
                </Bar>
                <Bar dataKey="booked" fill="#82ca9d">
                    {data.map((entry, index) => (
                        <motion.rect key={`bar-${index}`} initial={{ y: 300 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const EngagementChart = () => {
    const data = [
        { name: 'Jan', patients: 400, doctors: 240, amt: 2400 },
        { name: 'Feb', patients: 300, doctors: 139, amt: 2210 },
        { name: 'Mar', patients: 200, doctors: 980, amt: 2290 },
        { name: 'Apr', patients: 278, doctors: 390, amt: 2000 },
        { name: 'May', patients: 189, doctors: 480, amt: 2181 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#8884d8" />
                <Bar dataKey="doctors" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const HospitalSuperAdminDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [hospitalData, setHospitalData] = useState(null);
    const [patientSearchTerm, setPatientSearchTerm] = useState('');
    const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
    const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
    const {adata, setAdata} = useContext(Context)


    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const [patientsRes, hospitalRes, doctorsRes] = await Promise.all([
                    axios.get('http://localhost:8090/hosp/pati'),
                    axios.get(`http://localhost:8090/hosp/find/${adata.hname}`),
                    axios.get('http://localhost:8090/hosp/doctor')
                ]);
                setPatients(patientsRes.data);
                setHospitalData(hospitalRes.data);
                setDoctors(doctorsRes.data.filter(doctor => doctor.hname === adata.hname));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchHospitalData();
    
        const interval = setInterval(() => {
            fetchHospitalData(); // Fetch hospital data every 5 seconds (or adjust time)
        }, 1000);
    
        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, [adata]);
    

    const filteredPatients = useMemo(() => {
        return patients.filter(
            (patient) =>
                patient.hname === hospitalData?.hname &&
                (patient.pname.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
                    patient.phone.includes(patientSearchTerm) ||
                    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase()))
        );
    }, [patients, hospitalData, patientSearchTerm]);

    const filteredDoctors = useMemo(() => {
        return doctors.filter(
            (doctor) =>
                doctor.dname.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(doctorSearchTerm.toLowerCase())
        );
    }, [doctors, doctorSearchTerm]);

    const handleAddDoctor = async (newDoctor) => {
        try {
            await axios.post('http://localhost:8090/hosp/doctor', newDoctor);
            setDoctors([...doctors, newDoctor]);
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const bedData = hospitalData ? [
        { name: 'Regular Beds', total: hospitalData.bed, booked: hospitalData.bbed },
        { name: 'Emergency Beds', total: hospitalData.ebed, booked: hospitalData.bebed }
    ] : [];

    return (
        <>
        <Header/>
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-teal-600 mb-4">{`${adata.hname} Admin Dashboard`}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left column: Hospital Info and Bed Charts */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        {hospitalData && (
                            <>
                                <h2 className="text-xl font-semibold text-teal-600 mb-4">{hospitalData.hname}</h2>
                                <AnimatedBarChart data={bedData} />
                            </>
                        )}
                    </div>

                    {/* Middle column: Doctors */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-teal-600">Doctors</h2>
                            <button
                                onClick={() => setIsAddDoctorOpen(true)}
                                className="bg-teal-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                            >
                                <PlusCircle className="w-4 h-4 mr-1" /> Add
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search doctors..."
                                    value={doctorSearchTerm}
                                    onChange={(e) => setDoctorSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
                            <AnimatePresence>
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right column: Patients */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold text-teal-600 mb-2">Patients</h2>
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={patientSearchTerm}
                                    onChange={(e) => setPatientSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
                            <AnimatePresence>
                                {filteredPatients.map((patient) => (
                                    <PatientCard key={patient.id} patient={patient} />
                                ))}
                            </AnimatePresence>
                            {filteredPatients.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">No patients found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hospital Engagement Chart */}
                <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Hospital Engagement</h2>
                    <EngagementChart />
                </div>

                {isAddDoctorOpen && (
                    <AddDoctorForm
                        onClose={() => setIsAddDoctorOpen(false)}
                        onSubmit={handleAddDoctor}
                    />
                )}
            </div>
        </div>
        </>
    );
};

export default HospitalSuperAdminDashboard;
import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Header from '../Components/Header';
import { Context, server } from '..';
import audit from  '../Components/Audit'


const COLORS = ['#0088FE', '#00C49F'];

const MedicineCard = ({ medicine }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-3 mb-2 text-sm"
    >
        <h3 className="text-md font-semibold text-teal-600 mb-1">{medicine.mname}</h3>
        <p>Available: {medicine.quantity}</p>
    </motion.div>
);

const AddPatientForm = ({ onClose, onSubmit, hospitalName, doctorName }) => {
    const [formData, setFormData] = useState({
        pname: '',
        hname: hospitalName,
        address: '',
        phone: '',
        email: '',
        gender: '',
        dob: '',
        parent: '',
        police: 'false',
        desc: '',
        dname: doctorName,
        pres: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.pname) newErrors.pname = 'Patient Name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.desc) newErrors.desc = 'Description is required';
        if (!formData.pres) newErrors.pres = 'Prescription is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await onSubmit(formData);
            await axios.get(`${server}/hosp/updatebed/${hospitalName}/inc`); // Increase bbed by one
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Error registering patient:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md max-h-screen overflow-auto">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-blue-500 mb-4" />
                        <p className="text-lg font-semibold text-blue-600">Patient registered successfully!</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold text-teal-600 mb-4">Register New Patient</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Patient Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                                <input
                                    type="text"
                                    name="pname"
                                    value={formData.pname}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.pname ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.pname && <p className="text-red-500 text-sm">{errors.pname}</p>}
                            </div>

                            {/* Police (true/false) */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Police</label>
                                <select
                                    name="police"
                                    value={formData.police}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="false">Yes</option>
                                    <option value="true">No</option>
                                </select>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Gender */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            {/* Date of Birth */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Date of Birth (DOB)</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                            </div>

                            {/* Parent */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Parent</label>
                                <input
                                    type="text"
                                    name="parent"
                                    value={formData.parent}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.desc ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    rows="4"
                                    required
                                />
                                {errors.desc && <p className="text-red-500 text-sm">{errors.desc}</p>}
                            </div>

                            {/* Prescription */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Prescription (pres)</label>
                                <input
                                    type="text"
                                    name="pres"
                                    value={formData.pres}
                                    onChange={handleChange}
                                    className={`w-full p-2 border ${errors.pres ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    required
                                />
                                {errors.pres && <p className="text-red-500 text-sm">{errors.pres}</p>}
                            </div>

                            <button
                                type="submit" 
                                onClick={() => audit(`Registered Patient name ${formData.pname} by Dr${doctorName} in Hospital ${hospitalName}`)}
                                className="w-full bg-teal-600 text-white px-4 py-2 rounded-md"
                            >
                                Register Patient
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
        </div>
    );
};

const BedAvailabilityChart = ({ data, title }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

const PatientCard = ({ patient, onClick }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-3 mb-2 cursor-pointer"
        onClick={() => onClick(patient)}
    >
        <p>Name: {patient.pname}</p>
        <p>Email: {patient.email}</p>
    </motion.div>
);

const DoctorDashboard = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [patients, setPatients] = useState([]);
    const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
    const [hospital, setHospital] = useState("");
    const [searchPatient, setSearchPatient] = useState("");
    const [searchMedicine, setSearchMedicine] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { userData,setUserData, mediData, setMediData, loading, setLoading, hosp, setHosp, ddata, setDdata } = useContext(Context);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const doctorRes = await axios.get(`${server}/hosp/doctor/find/${ddata.email}`);
                setDoctorData(doctorRes.data);
                console.log("hname "+doctorRes.data.hname);
                

                const hospitalDataRes = await axios.get(`${server}/hosp/find/${doctorRes.data.hname}`);
                const medicineRes = await axios.get(`${server}/hosp/medi`);
                const patientRes = await axios.get(`${server}/hosp/pati`);

                setMedicines(medicineRes.data.filter(med => med.hname === doctorRes.data.hname));
                setPatients(patientRes.data.filter(pat => pat.hname === doctorRes.data.hname));
                setHospital(hospitalDataRes.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const intervalId = setInterval(() => {
            fetchDoctorData(); // Fetch data every second
        }, 1000);

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
        fetchDoctorData();
    }, []);
    

    const bedData = useMemo(() => {
        if (!hospital) return [];
        return [
            { name: 'Total Beds', value: hospital.bed },
            { name: 'Available Beds', value: hospital.bed - hospital.bbed },
        ];
    }, [hospital]);

    const ebedData = useMemo(() => {
        if (!hospital) return [];
        return [
            { name: 'Total Emergency Beds', value: hospital.ebed },
            { name: 'Available Emergency Beds', value: hospital.ebed - hospital.bebed },
        ];
    }, [hospital]);

    const handleAddPatient = async (newPatient) => {
        try {
            await axios.post(`${server}0/hosp/pati`, newPatient);
        } catch (error) {
            console.error('Error registering patient:', error);
        }
    };

    const filteredPatients = patients.filter(patient =>
        patient.pname.toLowerCase().includes(searchPatient.toLowerCase())
    );

    const filteredMedicines = medicines.filter(medicine =>
        medicine.mname.toLowerCase().includes(searchMedicine.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen p-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-teal-600 mb-4">{`${hospital.hname} || Dr.${ddata.dname}`}</h1>
                    {doctorData && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                {/* Bed Availability */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Bed Availability</h2>
                                    <BedAvailabilityChart data={bedData} title="Bed Availability" />
                                    <BedAvailabilityChart data={ebedData} title="Emergency Bed Availability" />
                                    <button
                                        onClick={() => setIsAddPatientOpen(true)}
                                        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-1" /> Register Patient
                                    </button>
                                </div>

                                {/* Medicines with Search */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Medicines</h2>
                                    <input
                                        type="text"
                                        value={searchMedicine}
                                        onChange={(e) => setSearchMedicine(e.target.value)}
                                        placeholder="Search Medicines"
                                        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                                        <AnimatePresence>
                                            {filteredMedicines.map((medicine) => (
                                                <MedicineCard key={medicine.id} medicine={medicine} />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Patients with Search */}
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Patients</h2>
                                    <input
                                        type="text"
                                        value={searchPatient}
                                        onChange={(e) => setSearchPatient(e.target.value)}
                                        placeholder="Search Patients"
                                        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                                    />
                                    <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
                                        <AnimatePresence>
                                            {filteredPatients.map((patient) => (
                                                <PatientCard key={patient.id} patient={patient} onClick={setSelectedPatient} />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Add Patient Form Modal */}
                    {isAddPatientOpen && doctorData && hospital && (
                        <AddPatientForm
                            onClose={() => setIsAddPatientOpen(false)}
                            onSubmit={handleAddPatient}
                            hospitalName={hospital.hname}
                            doctorName={doctorData.dname}
                        />
                    )}

                    {/* Patient Details Popup */}
                    {selectedPatient && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                                <h2 className="text-xl font-semibold text-teal-600 mb-4">Patient Details</h2>
                                <p>Name: {selectedPatient.pname}</p>
                                <p>Email: {selectedPatient.email}</p>
                                <p>Phone: {selectedPatient.phone}</p>
                                <p>Address: {selectedPatient.address}</p>
                                <p>Description: {selectedPatient.desc}</p>
                                {/* Add more details as necessary */}
                                <button
                                    onClick={() => setSelectedPatient(null)}
                                    className="w-full bg-gray-300 text-black px-4 py-2 rounded-md mt-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DoctorDashboard;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, Hospital, UserPlus, FileText } from 'lucide-react';
import Header from '../Components/Header'
import alllogo from './Images/alllogo.gif'

const AllLogins = () => {
    return (
        <>
        <Header/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-teal-600 mb-6 text-center">Login</h1>
                <div className="space-y-4" >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <Link
                            to="/hospital-staff-login"
                            className="flex items-center w-full p-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
                        >
                            <Hospital className="w-6 h-6 mr-2" />
                            <span>Hospital Staff / Doctor Login</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <Link
                            to="/user"
                            className="flex items-center w-full p-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
                        >
                            <User className="w-6 h-6 mr-2" />
                            <span>User Login</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <Link
                            to="/alogin"
                            className="flex items-center w-full p-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
                        >
                            <FileText className="w-6 h-6 mr-2" />
                            <span>Admin Login</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AllLogins;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pic from './Images/IMG_1473.jpg'

const About = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/chatapp-dae72.appspot.com/o/techcoders%2FDeveloper%20Coding%20Background.mp4b239ade3-8e82-470e-8987-ad0211bd581c?alt=media&token=d8ee4cbd-2071-40d4-8e6d-50ebe371c9c6" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Initial Animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold text-white"
            >
              Welcome to the World of Nihar
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 min-h-screen bg-black bg-opacity-70 text-white p-8 flex flex-col justify-center items-center"
          >
            <div className="max-w-3xl mx-auto">
              <motion.img
                src={pic}
                alt="Nihar"
                className="w-64 h-64 rounded-full mx-auto mb-8 shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />

              <motion.h1
                className="text-4xl font-bold mb-4 text-center"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                Nihar
              </motion.h1>

              <motion.p
                className="text-xl mb-6 text-center"
                {...fadeInUp}
                transition={{ delay: 0.6 }}
              >
                Software Developer
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.p className="text-lg" {...fadeInUp} transition={{ delay: 1 }}>
                  Software Engineer skilled in full-stack development, cloud technologies, and Java programming. Adept at designing, building, and supporting applications to meet business requirements.
                </motion.p>

                <motion.p className="text-lg" {...fadeInUp} transition={{ delay: 1.2 }}>
                  Winner of the Smart India Hackathon 2022, demonstrating strong problem-solving skills and a passion for technology. Enthusiastic about coding, eager to tackle impactful projects, and committed to contributing to team success in dynamic environments.
                </motion.p>


                <motion.div
                  className="flex justify-center space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <motion.a
                    href="http://github.com/Nihar4569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05, backgroundColor: "#4a5568" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                  <motion.a
                    href="mailto:your.email@example.com"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05, backgroundColor: "#3182ce" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Email Me
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
            <motion.p
              className="text-sm mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              Designed and developed by Nihar Ranjan Sahu
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
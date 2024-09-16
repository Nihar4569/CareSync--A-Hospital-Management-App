import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pic from './Images/IMG_1473.jpg';

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const floatingAnimation = {
    y: ['-10px', '10px'],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const neonGlow = {
    boxShadow: [
      '0 0 5px #fff',
      '0 0 10px #fff',
      '0 0 15px #fff',
      '0 0 20px #ffd700',
      '0 0 35px #ffd700',
      '0 0 40px #ffd700',
      '0 0 50px #ffd700',
      '0 0 75px #ffd700'
    ],
    transition: {
      boxShadow: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black" onClick={handleClick}>
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://firebasestorage.googleapis.com/v0/b/chatapp-dae72.appspot.com/o/techcoders%2FMillionaire%20(mp3cut.net).mp352978b12-7679-4c9d-bcdf-56ba3167afcc?alt=media&token=f32c4c46-df7b-4eb4-bc39-6169f0852a87" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {['💰', '💎', '🏆', '💻', '🚀', '🥇', '💵', '🤑'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            initial={{ opacity: 0, scale: 0.5, x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Animated Text Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {['Millionaire', 'Success', 'Luxury', 'Wealth', 'Prosperity'].map((text, index) => (
          <motion.h2
            key={index}
            className="absolute text-4xl font-bold text-yellow-600 opacity-10"
            initial={{ opacity: 0, scale: 0.5, x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
            animate={{ 
              opacity: [0.1, 0.5, 0.1],
              scale: [0.8, 1.2, 0.8],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.5
            }}
          >
            {text}
          </motion.h2>
        ))}
      </div>

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
              className="text-4xl font-bold text-yellow-400"
            >
              Welcome to the Millionaire Mindset of Nihar
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
              <motion.div
                className="relative w-64 h-64 mx-auto mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              >
                <motion.img
                  src={pic}
                  alt="Nihar"
                  className="w-full h-full rounded-full object-cover"
                  animate={neonGlow}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={floatingAnimation}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-50"></div>
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold mb-4 text-center text-yellow-400"
                {...fadeInUp}
                transition={{ delay: 0.4 }}
              >
                Nihar
              </motion.h1>

              <motion.p
                className="text-xl mb-6 text-center text-yellow-300"
                {...fadeInUp}
                transition={{ delay: 0.6 }}
              >
                Software Developer | Future Millionaire
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.p className="text-lg text-yellow-100" {...fadeInUp} transition={{ delay: 1.2 }}>
                  Visionary Software Engineer with a millionaire mindset. Skilled in full-stack development, cloud technologies, and Java programming. Building the future of technology while paving the way to financial success.
                </motion.p>

                <motion.p className="text-lg text-yellow-100" {...fadeInUp} transition={{ delay: 1.4 }}>
                  Winner of the Smart India Hackathon 2022, proving that with determination and skill, any challenge can be conquered. Combining a passion for coding with an entrepreneurial spirit to create innovative solutions and generate wealth.
                </motion.p>

                <motion.div
                  className="flex justify-center space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <motion.a
                    href="http://github.com/Nihar4569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                  <motion.a
                    href="mailto:your.email@example.com"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
            <motion.p
              className="text-sm mt-8 text-yellow-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Designed and developed by Nihar Ranjan Sahu | Future Millionaire
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;


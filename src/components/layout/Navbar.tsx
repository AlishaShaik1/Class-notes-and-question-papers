// frontend/src/components/layout/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const LogoElement = (
    <motion.img
      src="https://tse1.mm.bing.net/th/id/OIP.v3GbNXGV_rYeOcVEXSL1IQHaCw?rs=1&pid=ImgDetMain&o=7&rm=3"
      alt="AIML Logo"
      className="h-12 w-auto object-contain drop-shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    />
  );

  return (
    <nav className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo + Title */}
          <Link to="/" className="flex items-center space-x-4">
            {LogoElement}
            <motion.span
              className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide uppercase drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AIML 2-1 Notes & Papers
            </motion.span>
          </Link>

          {/* Right: Buttons */}
          <div className="flex space-x-5">
            {/* View Library */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/library"
                className="bg-white text-indigo-700 px-5 py-2.5 rounded-lg font-semibold text-base uppercase shadow-md hover:bg-indigo-50 hover:shadow-indigo-300 transition-all duration-200"
              >
                View Library
              </Link>
            </motion.div>

            {/* Upload Notes */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/upload"
                className="bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold text-base uppercase shadow-md hover:bg-green-600 hover:shadow-green-300 transition-all duration-200"
              >
                Upload Notes
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

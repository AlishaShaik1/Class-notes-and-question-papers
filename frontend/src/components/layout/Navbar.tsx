// frontend/src/components/layout/Navbar.tsx (Final Ultra-Responsive Code)
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  
  // Pragati Logo Element
  const LogoElement = (
    <motion.img
      src="https://tse1.mm.bing.net/th/id/OIP.v3GbNXGV_rYeOcVEXSL1IQHaCw?rs=1&pid=ImgDetMain&o=7&rm=3"
      alt="Pragati Logo"
      // Responsive sizing: h-8 on mobile, h-12 on medium screens and up
      className="h-8 md:h-12 w-auto object-contain drop-shadow-md flex-shrink-0" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    />
  );

  return (
    // Exact gradient background and shadow
    <nav className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Row: Flexible alignment for mobile and desktop */}
        <div className="flex items-center justify-between h-16 md:h-20"> 
          
          {/* 1. Logo and Title Container (Left Side) */}
          <Link 
            to="/" 
            // Ensures logo and title stay together and shrink when needed
            className="flex items-center space-x-2 md:space-x-4 flex-shrink" // Use flex-shrink to allow logo/title to compress
          >
            {LogoElement}
            
            {/* Title Text: Visible from sm (larger phones) upward */}
            <motion.span
              className="text-white font-extrabold tracking-wide uppercase drop-shadow-lg 
                         text-base sm:text-xl md:text-2xl lg:text-3xl 
                         truncate hidden sm:block" // Hidden on XS screens
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AIML 2-1 Notes & Papers
            </motion.span>
             {/* Short Title for XS/Mobile Phones */}
            <span className="text-base sm:hidden uppercase text-white font-extrabold whitespace-nowrap">AIML Hub</span>
          </Link>

          {/* 2. Buttons Container (Right Side) */}
          {/* ml-auto pushes them to the far right. space-x-1 is minimal spacing for mobile. */}
          <div className="flex space-x-1 md:space-x-4 ml-auto">
            
            {/* View Library Button */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                to="/library"
                // Ultra-compact on mobile: px-2 py-1 and text-xs
                className="bg-white text-indigo-700 px-2 py-1 md:px-5 md:py-2.5 rounded-md font-semibold text-xs md:text-base uppercase shadow-md hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap"
              >
                Library
              </Link>
            </motion.div>

            {/* Upload Notes Button */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                to="/upload"
                 // Ultra-compact on mobile: px-2 py-1 and text-xs
                className="bg-green-500 text-white px-2 py-1 md:px-5 md:py-2.5 rounded-md font-semibold text-xs md:text-base uppercase shadow-md hover:bg-green-600 transition-all duration-200 whitespace-nowrap"
              >
                Upload
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
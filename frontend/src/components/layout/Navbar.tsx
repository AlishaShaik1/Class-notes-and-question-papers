// frontend/src/components/layout/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  // Define a cleaner version of the logo element, optimized for responsive sizing
  const LogoElement = (
    <motion.img
      src="https://tse1.mm.bing.net/th/id/OIP.v3GbNXGV_rYeOcVEXSL1IQHaCw?rs=1&pid=ImgDetMain&o=7&rm=3"
      alt="Pragati Logo"
      // Reduced size on mobile (h-8) and larger on medium screens (md:h-12)
      className="h-8 md:h-12 w-auto object-contain drop-shadow-md flex-shrink-0" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    />
  );

  return (
    // Replicating your specified gradient background and shadow
    <nav className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Content Row: flex-shrink-0 is crucial to prevent the title/logo from being squeezed */}
        <div className="flex items-center justify-between h-16 md:h-20"> 
          
          {/* Left/Center: Logo + Title Container */}
          {/* We use relative positioning for alignment stability on mobile */}
          <Link 
            to="/" 
            // On mobile (sm:), reduce text size and spacing to fit
            className="flex items-center space-x-2 md:space-x-4 flex-shrink-0"
          >
            {LogoElement}
            
            {/* Title Text (All Caps) */}
            <motion.span
              className="text-white font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide uppercase drop-shadow-lg whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AIML 2-1 Notes & Papers
            </motion.span>
          </Link>

          {/* Right: Buttons Container */}
          {/* ml-auto pushes the buttons to the far right, balancing the logo/title */}
          <div className="flex space-x-2 md:space-x-5 ml-auto">
            
            {/* View Library Button (White/Indigo Theme) */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                to="/library"
                // Shrinking padding and font size for mobile
                className="bg-white text-indigo-700 px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-base uppercase shadow-md hover:bg-indigo-50 hover:shadow-indigo-300 transition-all duration-200 whitespace-nowrap"
              >
                Library
              </Link>
            </motion.div>

            {/* Upload Notes Button (Green/White Theme) */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                to="/upload"
                // Shrinking padding and font size for mobile
                className="bg-green-500 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs md:text-base uppercase shadow-md hover:bg-green-600 hover:shadow-green-300 transition-all duration-200 whitespace-nowrap"
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
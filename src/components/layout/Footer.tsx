// frontend/src/components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pec-blue text-white mt-12 py-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Title and Project Context */}
        <p className="text-lg md:text-xl font-bold mb-2 text-pec-yellow uppercase">
          AIML 2-1 Semester Notes & Papers Hub
        </p>

        {/* Developer Details */}
        <div className="text-sm md:text-base space-y-1">
          
          {/* CONTACT LINE */}
          <p className="font-semibold text-white/90">
            Contact:{" "}
            <a 
              href="mailto:alishashiak1606@gmail.com" 
              className="text-pec-green hover:underline"
              title="Send Email to Alisha"
            >
              alishashiak1606@gmail.com
            </a>
          </p>

          {/* NAME AND ROLL NUMBER */}
          <p>
            Shaik.Alisha | Roll No: <span className="font-medium text-pec-green">24A31A42C8</span>
          </p>
          
          {/* YEAR AND BRANCH */}
          <p className="text-xs text-white/70 pt-1">
            2nd Year - Artificial Intelligence and Machine Learning (AIML-B)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

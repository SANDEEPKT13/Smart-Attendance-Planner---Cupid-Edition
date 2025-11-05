// src/components/Footer.js
import React from 'react';

function Footer({ darkMode, setActiveTab }) {
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <footer className={`${cardClass} border-t mt-12`}>
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <p className={`text-sm ${textSecondary}`}>
            © 2024 Smart Attendance Planner | Made with 💜 for students
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <button onClick={() => setActiveTab('privacy')} className={`${textSecondary} hover:underline`}>
              Privacy Policy
            </button>
            <span className={textSecondary}>•</span>
            <button onClick={() => setActiveTab('contact')} className={`${textSecondary} hover:underline`}>
              Contact Us
            </button>
            <span className={textSecondary}>•</span>
            <button onClick={() => setActiveTab('about')} className={`${textSecondary} hover:underline`}>
              About
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


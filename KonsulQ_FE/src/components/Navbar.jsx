import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-500 to-teal-400 shadow-lg rounded-b-lg">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-white tracking-wide">
        KONSUL <span className="text-teal-100">Q</span>
      </h1>

      {/* Button Login/Signup */}
      <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-xl">
        Login/Signup
      </button>
    </nav>
  );
};

export default Navbar;

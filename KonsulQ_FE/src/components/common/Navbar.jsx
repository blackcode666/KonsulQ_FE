import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isDashboard }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 shadow-lg">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-white tracking-wide">
        KONSUL <span className="text-teal-200">Q</span>
      </h1>

      {/* Tombol Dinamis */}
      <div>
        {isDashboard ? (
          <>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2">
              Profile
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </>
        ) : (
          <Link to="/signup">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

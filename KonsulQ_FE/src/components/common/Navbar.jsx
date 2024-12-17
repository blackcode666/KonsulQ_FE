  import React, { useState } from "react";
  import { Link } from "react-router-dom";

  const Navbar = ({ toggleSidebar, isDashboard }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

    return (
      <header className="p-4 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-white tracking-wide">
            KONSUL <span className="text-teal-200">Q</span>
          </h1>

          {/* Right Side: Profile Menu */}
          {isDashboard && (
            <div className="relative">
              <button
                className="text-white focus:outline-none flex items-center"
                onClick={toggleProfileMenu}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left text-white-700 hover:bg-gradient-to-r">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gradient-to-r">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    );
  };

  export default Navbar;

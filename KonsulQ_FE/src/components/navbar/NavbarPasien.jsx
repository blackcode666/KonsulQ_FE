import React from "react";
import LOGO from "../../assets/LOGO.png"; // Update path sesuai lokasi file

const NavbarPasien = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      {/* Title Dashboard */}
      <h1 className="text-xl font-semibold text-gray-800">Dashboard Pasien</h1>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {/* Avatar */}
          <img
            src={LOGO} // Avatar pasien
            alt="Avatar Pasien"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          {/* Username */}
          <p className="text-gray-700 font-medium">Dela</p>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPasien;

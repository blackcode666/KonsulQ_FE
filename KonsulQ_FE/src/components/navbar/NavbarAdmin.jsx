import React from "react";
import Logo from "../../assets/LOGO.png"; // Import gambar logo


const NavbarAdmin = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard Admin</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo"
            className="w-10 h-10 rounded-full border"/>
          <div>
            <p className="text-gray-800 text-sm font-medium">Brom</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;

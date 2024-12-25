import React from "react";
import { useAuth } from "../../context/AuthContext"; // Pastikan jalur impor benar
import Logo from "../../assets/LOGO.png"; // Import gambar logo

const Navbar = () => {
  const { userInfo } = useAuth(); // Ambil data pengguna dari context

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard {userInfo?.role || "Role"}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            {/* Tampilkan nama dan role pengguna */}
            <p className="text-gray-800 text-sm font-medium">{userInfo?.name || "Nama Pengguna"}</p>
            <p className="text-gray-500 text-xs">{userInfo?.role || "Role"}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

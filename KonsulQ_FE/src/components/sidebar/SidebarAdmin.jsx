import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/LOGO.png"; // Import gambar logo

const SidebarAdmin = () => {
  const location = useLocation(); // Untuk menandai menu aktif

  const menus = [
    { name: "Dashboard", icon: "fas fa-tachometer-alt", path: "/dashboard-admin" },
    { name: "Manajemen Pengguna", icon: "fas fa-users", path: "/manage-users" },
    { name: "Manajemen Dokter", icon: "fas fa-user-md", path: "/manage-doctors" },
    { name: "Manajemen Konsultasi", icon: "fas fa-comments", path: "/manage-consultations" },
    { name: "Laporan", icon: "fas fa-chart-line", path: "/reports" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed">
      {/* Logo */}
      <div className="flex items-center justify-start px-4 py-6 border-b">
        <img src={Logo} alt="Logo" className="w-12 h-12 mr-3" />
        <h1 className="text-xl font-semibold text-gray-800">
          KONSUL <span className="text-teal-500">Q</span>
        </h1>
      </div>

      {/* Menu List */}
      <ul className="mt-6">
        {menus.map((menu) => (
          <li key={menu.name} className="mb-2">
            <Link
              to={menu.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition ${
                location.pathname === menu.path
                  ? "bg-teal-500 text-white" // Background tosca untuk menu aktif
                  : "text-gray-700 hover:bg-teal-100" // Hover background tosca muda
              }`}
            >
              <i
                className={`${menu.icon} mr-3 text-lg ${
                  location.pathname === menu.path ? "text-white" : "text-teal-500"
                }`} // Ikon berwarna tosca (rosca)
              ></i>
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Sign Out Button */}
      <div className="absolute bottom-6 w-full">
        <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <i className="fas fa-sign-out-alt mr-3 text-teal-500"></i> Sign Out
        </button>
      </div>
    </div>
    
  );
};

export default SidebarAdmin;

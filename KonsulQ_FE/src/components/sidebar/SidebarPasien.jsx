import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/LOGO.png";

const SidebarPasien = () => {
  const location = useLocation();

  const menus = [
    { name: "Cari Dokter", path: "/cari-dokter", icon: "fas fa-search" },
    { name: "Jadwal Konsultasi", path: "/jadwal-konsultasi", icon: "fas fa-calendar-alt" },
    { name: "Riwayat Konsultasi", path: "/riwayat-konsultasi", icon: "fas fa-history" },
    { name: "Pembayaran", path: "/pembayaran", icon: "fas fa-dollar-sign" },
    { name: "Messages", path: "/messages-pasien", icon: "fas fa-envelope" },
  ];

  const menuPasien = {
    name: "Pasien",
    path: "/dashboard-pasien",
    icon: "fas fa-user-circle",
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
        <h1 className="text-xl font-semibold text-gray-800">
          KONSUL <span className="text-teal-500">Q</span>
        </h1>
      </div>

      {/* Menu Pasien */}
      <div className="px-4 py-2 border-b">
        <Link
          to={menuPasien.path}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            location.pathname === menuPasien.path
              ? "bg-teal-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i
            className={`${
              location.pathname === menuPasien.path ? "text-white" : "text-teal-500"
            } ${menuPasien.icon} mr-3 text-lg`}
          ></i>
          {menuPasien.name}
        </Link>
      </div>

      {/* Menu List */}
      <ul className="mt-6">
        {menus.map((menu) => (
          <li key={menu.name} className="mb-2">
            <Link
              to={menu.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                location.pathname === menu.path
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i
                className={`${
                  location.pathname === menu.path ? "text-white" : "text-teal-500"
                } ${menu.icon} mr-3 text-lg`}
              ></i>
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-6 w-full">
        <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <i className="fas fa-sign-out-alt mr-3 text-teal-500"></i> Sign Out
        </button>
      </div>
    </div>
  );
};

export default SidebarPasien;

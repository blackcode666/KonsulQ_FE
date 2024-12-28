import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import Logout from "./Logout"; 

const SidebarDokter = () => {
  const location = useLocation();

  const menus = [
    { name: "Dokter", icon: "fas fa-tachometer-alt", path: "/dashboard-dokter" },
    { name: "Jadwal Saya", icon: "fas fa-calendar-alt", path: "/jadwal-saya" },
    { name: "Riwayat Pasien", icon: "fas fa-user-injured", path: "/riwayat-pasien" },
    { name: "Konsultasi Online", icon: "fas fa-comments", path: "/konsultasi-online" },
    { name: "Laporan", icon: "fas fa-chart-line", path: "/laporan" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed">
      <div className="flex items-center justify-start px-4 py-6 border-b">
        <img src={Logo} alt="Logo" className="w-12 h-12 mr-3" />
        <h1 className="text-xl font-semibold text-gray-800">
          KONSUL <span className="text-teal-500">Q</span>
        </h1>
      </div>

      <ul className="mt-6">
        {menus.map((menu) => (
          <li key={menu.name} className="mb-2">
            <Link
              to={menu.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition ${
                location.pathname === menu.path
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-100"
              }`}
            >
              <i
                className={`${menu.icon} mr-3 text-lg ${
                  location.pathname === menu.path ? "text-white" : "text-teal-500"
                }`}
              ></i>
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Sign Out Button */}
      <div className="absolute bottom-6 w-full">
        <Logout /> {/* Menggunakan komponen Logout */}
      </div>
    </div>
  );
};

export default SidebarDokter;

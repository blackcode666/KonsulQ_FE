import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/LOGO.png";

const SidebarDokter = () => {
  const location = useLocation();

  const menus = [
    { name: "Dokter", icon: "fas fa-tachometer-alt", path: "/dashboard-dokter" },
    { name: "Jadwal Saya", icon: "fas fa-calendar-alt", path: "/jadwal-saya" },
    { name: "Riwayat Pasien", icon: "fas fa-user-injured", path: "/riwayat-pasien" },
    { name: "Konsultasi Online", icon: "fas fa-comments", path: "/konsultasi-online" },
    { name: "Laporan", icon: "fas fa-chart-line", path: "/laporan" },
    { name: "Messages", icon: "fas fa-envelope", path: "/messages-dokter" },
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

      <div className="absolute bottom-6 w-full">
        <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <i className="fas fa-sign-out-alt mr-3 text-lg"></i> Sign Out
        </button>
      </div>
    </div>
  );
};

export default SidebarDokter;

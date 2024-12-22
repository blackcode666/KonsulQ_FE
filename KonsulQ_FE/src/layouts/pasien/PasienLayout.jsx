import React from "react";
import SidebarPasien from "../../components/sidebar/SidebarPasien"; // Pastikan jalur benar
import NavbarPasien from "../../components/navbar/NavbarPasien"; // Pastikan jalur benar

const PasienLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarPasien />
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen ml-64">
        {/* Navbar */}
        <NavbarPasien />
        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default PasienLayout;

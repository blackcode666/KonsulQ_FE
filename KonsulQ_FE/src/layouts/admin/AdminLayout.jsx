import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import NavbarAdmin from "../../components/navbar/NavbarAdmin"; // Pastikan jalur NavbarAdmin benar

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <NavbarAdmin /> {/* Gunakan NavbarAdmin yang diimpor */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

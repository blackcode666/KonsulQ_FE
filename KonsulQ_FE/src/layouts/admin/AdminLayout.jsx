import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import Navbar from "../../components/navbar/Navbar"; // Pastikan jalur Navbar benar

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Navbar /> {/* Gunakan Navbar yang diimpor */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

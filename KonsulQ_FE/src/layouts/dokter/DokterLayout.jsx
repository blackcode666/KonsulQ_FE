import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import Navbar from "../../components/navbar/Navbar";


const DokterLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarDokter /> {/* Sidebar khusus dokter */}
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Navbar /> {/* Navbar khusus dokter */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};


export default DokterLayout;

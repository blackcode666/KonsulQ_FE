import React from "react";
import SidebarPasien from "../../components/sidebar/SidebarPasien";
import NavbarPasien from "../../components/navbar/NavbarPasien"; // Import Navbar

const CariDokterLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarPasien />
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen" style={{ marginLeft: "16rem" }}>
        {/* Navbar */}
        <NavbarPasien />
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default CariDokterLayout;

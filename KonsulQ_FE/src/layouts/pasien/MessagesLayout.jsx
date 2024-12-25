import React from "react";
import SidebarPasien from "../../components/sidebar/SidebarPasien";
import Navbar from "../../components/navbar/Navbar"; // Pastikan jalur benar

const MessagesLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarPasien />
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen" style={{ marginLeft: "16rem" }}>
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MessagesLayout;

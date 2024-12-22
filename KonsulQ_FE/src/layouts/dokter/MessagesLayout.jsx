import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import NavbarDokter from "../../components/navbar/NavbarDokter";

const MessagesLayout = ({ messages }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pesan</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className="py-2 border-b hover:bg-gray-100">
            <p className="font-bold text-gray-800">{message.sender}</p>
            <p className="text-gray-600 text-sm">{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesLayout;

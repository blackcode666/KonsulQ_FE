import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import NavbarDokter from "../../components/navbar/NavbarDokter";

const KonsultasiOnlineLayout = ({ consultations }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Konsultasi Online</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Nama Pasien</th>
            <th className="py-2 text-left text-gray-600">Waktu</th>
            <th className="py-2 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{consultation.patient}</td>
              <td className="py-2">{consultation.time}</td>
              <td className="py-2">{consultation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KonsultasiOnlineLayout;

import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import Navbar from "../../components/navbar/Navbar";

const RiwayatPasienLayout = ({ history }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pasien</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Nama Pasien</th>
            <th className="py-2 text-left text-gray-600">Tanggal</th>
            <th className="py-2 text-left text-gray-600">Diagnosis</th>
            <th className="py-2 text-left text-gray-600">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{record.patient}</td>
              <td className="py-2">{record.date}</td>
              <td className="py-2">{record.diagnosis}</td>
              <td className="py-2">{record.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatPasienLayout;

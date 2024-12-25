import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import Navbar from "../../components/navbar/Navbar"; // Pastikan jalur Navbar benar
const ManageConsultationsLayout = ({ consultations }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manajemen Konsultasi</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Nama Dokter</th>
            <th className="py-2 text-left">Nama Pasien</th>
            <th className="py-2 text-left">Jenis Layanan</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{consultation.doctor}</td>
              <td className="py-2">{consultation.patient}</td>
              <td className="py-2">{consultation.serviceType}</td>
              <td className="py-2">{consultation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageConsultationsLayout;

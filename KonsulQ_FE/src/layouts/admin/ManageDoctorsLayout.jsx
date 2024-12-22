import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import NavbarAdmin from "../../components/navbar/NavbarAdmin"; // Pastikan jalur NavbarAdmin benar
const ManageDoctorsLayout = ({ doctors }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manajemen Dokter</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Nama Dokter</th>
            <th className="py-2 text-left">Nama Pasien</th>
            <th className="py-2 text-left">Waktu</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{doctor.doctor}</td>
              <td className="py-2">{doctor.patient}</td>
              <td className="py-2">{doctor.time}</td>
              <td className="py-2">{doctor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDoctorsLayout;

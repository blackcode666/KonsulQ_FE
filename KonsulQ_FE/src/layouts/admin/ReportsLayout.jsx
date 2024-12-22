import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import NavbarAdmin from "../../components/navbar/NavbarAdmin"; // Pastikan jalur NavbarAdmin benar

const ReportsLayout = ({ reports }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Laporan</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Nama Dokter</th>
            <th className="py-2 text-left">Nama Pasien</th>
            <th className="py-2 text-left">Pendapatan</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{report.doctor}</td>
              <td className="py-2">{report.patient}</td>
              <td className="py-2">{report.earning}</td>
              <td className="py-2">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;

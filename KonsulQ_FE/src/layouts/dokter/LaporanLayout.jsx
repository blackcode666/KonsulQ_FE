import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import Navbar from "../../components/navbar/Navbar";

const LaporanLayout = ({ reports }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Laporan</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Tanggal</th>
            <th className="py-2 text-left text-gray-600">Pendapatan</th>
            <th className="py-2 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{report.date}</td>
              <td className="py-2">{report.earning}</td>
              <td className="py-2">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanLayout;

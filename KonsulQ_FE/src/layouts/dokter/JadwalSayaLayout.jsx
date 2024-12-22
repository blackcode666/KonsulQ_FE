import React from "react";
import SidebarDokter from "../../components/sidebar/SidebarDokter";
import NavbarDokter from "../../components/navbar/NavbarDokter";

const JadwalSayaLayout = ({ schedules }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Jadwal Saya</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Nama Pasien</th>
            <th className="py-2 text-left text-gray-600">Jenis Pelayanan</th>
            <th className="py-2 text-left text-gray-600">Waktu</th>
            <th className="py-2 text-left text-gray-600">Status</th>
            <th className="py-2 text-left text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{schedule.patient}</td>
              <td className="py-2">{schedule.service}</td>
              <td className="py-2">{schedule.time}</td>
              <td className="py-2">{schedule.status}</td>
              <td className="py-2">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalSayaLayout;

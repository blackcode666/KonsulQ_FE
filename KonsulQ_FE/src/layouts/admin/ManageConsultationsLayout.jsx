import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import Navbar from "../../components/navbar/Navbar"; // Pastikan jalur Navbar benar
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";

// Menggunakan DataTables
DataTable.use(DT);
const ManageConsultationsLayout = ({ consultations }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manajemen Konsultasi</h1>
      <DataTable
        className="display"
        options={{
          paging: true,
          searching: true,
          ordering: true,
          info: true,
        }}
      >
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Tanggal</th>
            <th className="py-2 text-left">Nama Dokter</th>
            <th className="py-2 text-left">Nama Pasien</th>
            <th className="py-2 text-left">Jenis Layanan</th>
            <th className="py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">{consultation.waktu}</td>
              <td className="py-2">{consultation.doctor}</td>
              <td className="py-2">{consultation.patient}</td>
              <td className="py-2">{consultation.detail}</td>
              <td className="py-2">{consultation.status}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default ManageConsultationsLayout;

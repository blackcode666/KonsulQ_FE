import React from "react";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin"; // Pastikan jalur SidebarAdmin benar
import Navbar from "../../components/navbar/Navbar"; // Pastikan jalur Navbar benar
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
DataTable.use(DT);

const ReportsLayout = ({ reports }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Laporan</h1>
      <DataTable
        className="display w-full"
        options={{
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          autoWidth: false,
        }}
      >
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
              <td className="py-2">{report.appointment.doctor.name}</td>
              <td className="py-2">{report.appointment.patient.name}</td>
              <td className="py-2">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(report.total_price)}
              </td>

              <td className="py-2">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default ReportsLayout;

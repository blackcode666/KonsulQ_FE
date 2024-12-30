import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
DataTable.use(DT);

const LaporanLayout = ({ reports }) => {
  let total = 0;
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
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Tanggal</th>
            <th className="py-2 text-left text-gray-600">Pasien</th>
            <th className="py-2 text-left text-gray-600">Biaya</th>
            <th className="py-2 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => {
            total += report.total_price;
            return (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2">
                  {new Date(report.appointment.appointment_end).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })},{" "}
                  {new Date(report.appointment.appointment_end).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-2">{report.appointment.patient.name}</td>
                <td className="py-2">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(report.total_price)}
                </td>
                <td className="py-2">{report.status}</td>
              </tr>
            );
          })}

        </tbody>
      </DataTable>
      <h3>Total: {new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(total)}
      </h3>
    </div>
  );
};

export default LaporanLayout;

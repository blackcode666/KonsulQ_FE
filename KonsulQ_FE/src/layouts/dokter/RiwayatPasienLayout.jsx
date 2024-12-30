import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";

// Menggunakan DataTables
DataTable.use(DT);

const RiwayatPasienLayout = ({ history }) => {
  console.log(history);  // Cek data history yang diterima

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pasien</h1>
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
            <th className="py-2 text-left text-gray-600">Nama Pasien</th>
            <th className="py-2 text-left text-gray-600">Tanggal</th>
            <th className="py-2 text-left text-gray-600">Diagnosis</th>
            <th className="py-2 text-left text-gray-600">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((record, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2">{record.patient}</td>
                <td className="py-2">{record.date}</td>
                <td className="py-2">{record.diagnosis}</td>
                <td className="py-2">{record.action}</td>
              </tr>
            ))
          ) : "Tidak ada data riwayat pasien"}
        </tbody>
      </DataTable>
    </div>
  );
};

export default RiwayatPasienLayout;

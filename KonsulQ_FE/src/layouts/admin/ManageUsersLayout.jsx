import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

import './App.css';
// Menggunakan DataTables
DataTable.use(DT);

const ManageUsersLayout = ({ users, loading, error }) => {
  const [tableData, setTableData] = useState([]);

  // Update data ketika props users berubah
  useEffect(() => {
    if (users && users.length > 0) {
      const formattedData = users.map((user, index) => [
        index + 1,
        user.name,
        user.gender === 0 ? "Wanita" : "Pria",
        user.email,
        user.phone_number,
        user.address,
        user.medical_history,
      ]);
      setTableData(formattedData);
    }
  }, [users]);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manajemen Pasien</h1>
      <div className="w-full">
        <DataTable
          data={tableData}
          className="display"
          options={{
            paging: true,
            searching: true,
            ordering: true,
            info: true,
          }}
        >
          <thead>
            <tr className="border">
              <th className="py-2 text-left">No</th>
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">Jenis kelamin</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Telepon</th>
              <th className="py-2 text-left">Alamat</th>
              <th className="py-2 text-left">Riwayat Penyakit</th>
            </tr>
          </thead>
          <tbody>
            {/* Data akan diambil dari state tableData */}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
};

export default ManageUsersLayout;

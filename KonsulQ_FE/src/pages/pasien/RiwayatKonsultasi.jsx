import React from "react";
import RiwayatKonsultasiLayout from "../../layouts/pasien/RiwayatKonsultasiLayout";

const RiwayatKonsultasi = () => {
  return (
    <RiwayatKonsultasiLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Riwayat Konsultasi</h1>
        <p>Riwayat konsultasi pasien akan ditampilkan di sini.</p>
      </div>
    </RiwayatKonsultasiLayout>
  );
};

export default RiwayatKonsultasi;

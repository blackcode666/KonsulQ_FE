import React from "react";
import JadwalKonsultasiLayout from "../../layouts/pasien/JadwalKonsultasiLayout";

const JadwalKonsultasi = () => {
  return (
    <JadwalKonsultasiLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Jadwal Konsultasi</h1>
        <p>Jadwal konsultasi pasien akan ditampilkan di sini.</p>
      </div>
    </JadwalKonsultasiLayout>
  );
};

export default JadwalKonsultasi;

import React, { useState } from "react";
import CariDokterLayout from "../../layouts/pasien/CariDokterLayout";

const CariDokter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const doctors = [
    { name: "Dr. Fadhilah Neza", specialty: "Dokter Umum", location: "Jakarta" },
    { name: "Dr. Solikhah", specialty: "Dokter Anak", location: "Bandung" },
    { name: "Dr. Arifin", specialty: "Dokter Gigi", location: "Surabaya" },
  ];

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CariDokterLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Cari Dokter</h1>
        {/* Form Pencarian */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama dokter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>
        {/* Daftar Dokter */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-teal-600">
                {doctor.name}
              </h2>
              <p className="text-gray-600">Spesialis: {doctor.specialty}</p>
              <p className="text-gray-500">Lokasi: {doctor.location}</p>
            </div>
          ))}
          {filteredDoctors.length === 0 && (
            <p className="text-gray-500">Tidak ada dokter yang ditemukan.</p>
          )}
        </div>
      </div>
    </CariDokterLayout>
  );
};

export default CariDokter;

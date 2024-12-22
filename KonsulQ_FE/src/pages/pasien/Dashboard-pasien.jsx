import React from "react";
import PasienLayout from "../../layouts/pasien/PasienLayout"; // Pastikan jalur benar
import Dela from "../../assets/dela.png"; // Pastikan jalur file sesuai

const DashboardPasien = () => {
  const patientData = {
    name: "Fadhilah Neza",
    age: 20,
    id: "0110222139",
    gender: "Perempuan",
    address: "Jalan Mawar No. 15, Jakarta",
    phone: "081234567890",
    email: "fadhilahneza@example.com",
    history: "Gaada sih Alhamdulillah Sehat Walafiat",
    lastVisit: "12 Desember 2024",
    upcomingVisit: "19 Desember 2024",
  };

  return (
    <PasienLayout>
      <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
        {/* Card Detail Pasien */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
          {/* Header Card */}
          <div className="flex items-center space-x-6 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden">
              <img
                src={Dela}
                alt="Avatar Pasien"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Detail Utama */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {patientData.name}
              </h2>
              <p className="text-gray-600">{patientData.age} Tahun</p>
              <p className="text-gray-500">ID: {patientData.id}</p>
            </div>
          </div>

          {/* Informasi Tambahan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 font-medium">Jenis Kelamin</p>
              <p className="text-gray-600">{patientData.gender}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Alamat</p>
              <p className="text-gray-600">{patientData.address}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Nomor Telepon</p>
              <p className="text-gray-600">{patientData.phone}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Email</p>
              <p className="text-gray-600">{patientData.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Riwayat Penyakit</p>
              <p className="text-gray-600">{patientData.history}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Kunjungan Terakhir</p>
              <p className="text-gray-600">{patientData.lastVisit}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Kunjungan Mendatang</p>
              <p className="text-gray-600">{patientData.upcomingVisit}</p>
            </div>
          </div>
        </div>
      </div>
    </PasienLayout>
  );
};

export default DashboardPasien;

import React from "react";
import Navbar from "../components/common/Navbar"; // Pastikan jalur import benar
import Footer from "../components/common/Footer"; // Pastikan jalur import benar

const Riwayat = ({ isLoggedIn }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Konten Riwayat */}
      <div className="flex-grow container mx-auto p-6">
        {isLoggedIn ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Konsultasi</h1>
            <ul className="space-y-4">
              {/* Contoh Data Riwayat */}
              <li className="border-b pb-4">
                <h2 className="text-lg font-semibold text-teal-600">Konsultasi dengan Dr. Salman</h2>
                <p className="text-gray-600">Tanggal: 10 Desember 2023</p>
                <p className="text-gray-600">Status: Selesai</p>
              </li>
              <li className="border-b pb-4">
                <h2 className="text-lg font-semibold text-teal-600">Konsultasi dengan Dr. Fadhilah</h2>
                <p className="text-gray-600">Tanggal: 8 Desember 2023</p>
                <p className="text-gray-600">Status: Pending</p>
              </li>
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Pasien Tidak Ada</h1>
            <p className="text-gray-600">Anda belum memiliki riwayat konsultasi.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Riwayat;

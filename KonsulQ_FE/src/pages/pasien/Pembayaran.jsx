import React from "react";
import PembayaranLayout from "../../layouts/pasien/PembayaranLayout";

const Pembayaran = () => {
  return (
    <PembayaranLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Pembayaran</h1>
        <p>Informasi pembayaran akan ditampilkan di sini.</p>
      </div>
    </PembayaranLayout>
  );
};

export default Pembayaran;

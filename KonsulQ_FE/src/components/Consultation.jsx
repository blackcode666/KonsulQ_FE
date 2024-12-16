import React from 'react';
import consultationImage from '../assets/LOGO.png'; // Ganti dengan gambar LOGO.png jika perlu

const Consultation = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-16 bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Teks Bagian Kiri */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h2 className="text-4xl font-extrabold text-teal-600 mb-4 leading-tight">
          Konsultasi Dengan Dokter Terpercaya
        </h2>
        <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed">
          Dokter kami handal, berpengalaman, dan terpercaya. Ceritakan keluhan kesehatan Anda 
          atau tanyakan seputar kesehatan yang ingin Anda ketahui. Dokter kami siap menjawab semua kebutuhan Anda.
        </p>
        <button className="mt-6 bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105">
          Konsultasikan Sekarang
        </button>
      </div>

      {/* Gambar Bagian Kanan */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
        <img
          src={consultationImage}
          alt="Consultation"
          className="max-w-full max-h-80 object-contain md:object-cover w-auto h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </section>
  );
};

export default Consultation;

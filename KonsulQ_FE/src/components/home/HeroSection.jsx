import React from 'react';
import heroImage from "../../assets/dela.png";



const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center p-8 bg-gray-50">
      {/* Teks Bagian Kiri */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Mudah Konsultasi, <span className="text-teal-500">Nyaman</span> Dari Rumah
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed text-lg">
          KonsulQ adalah platform konsultasi kesehatan daring yang bertujuan memberikan akses mudah, cepat, dan terpercaya...
        </p>
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition">
            Konsultasi Sekarang
          </button>
          <button className="flex items-center gap-2 text-teal-500 font-semibold">
            <span>&#9654;</span> Watch Video
          </button>
        </div>
      </div>

      {/* Gambar Bagian Kanan */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full max-w-[400px] h-auto object-contain rounded-lg transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </section>
  );
};

export default HeroSection;
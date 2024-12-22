import React from 'react';
import heroImage from "../../assets/dela.png"; // Pastikan path gambar sudah benar
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center p-8 bg-gray-50">
      {/* Teks Bagian Kiri */}
      <div className="md:w-1/2 text-left md:text-left space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Mudah Konsultasi, <span className="text-teal-500">Nyaman</span> Dari Rumah
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed text-lg font-semibold">
          KonsulQ adalah platform konsultasi kesehatan daring yang bertujuan memberikan akses mudah, cepat, dan terpercaya...
        </p>
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <Link
            to="/formulir"
            className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition font-bold"
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </div>

      {/* Gambar Bagian Kanan */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-end items-center">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full max-w-[500px] h-auto object-contain rounded-lg transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </section>
  );
};

export default HeroSection;

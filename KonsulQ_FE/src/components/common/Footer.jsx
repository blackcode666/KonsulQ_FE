import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between">
        {/* Logo dan Copyright */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <img src="src/assets/LOGO.png" alt="KonsulQ" className="w-16 mb-4" />
          <h1 className="font-bold text-xl">KONSUL Q</h1>
          <p className="text-sm mt-2">&copy; 2024 konsulQ | All Rights Reserved</p>
        </div>

        {/* Product */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h2 className="font-semibold text-lg mb-4">Product</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Beranda</a></li>
            <li><a href="/" className="hover:text-gray-300">Pengguna</a></li>
            <li><a href="/" className="hover:text-gray-300">Dokter</a></li>
            <li><a href="/" className="hover:text-gray-300">Jadwal</a></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h2 className="font-semibold text-lg mb-4">Bantuan</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">FAQ</a></li>
            <li><a href="/" className="hover:text-gray-300">Panduan Pengguna</a></li>
            <li><a href="/" className="hover:text-gray-300">Kebijakan Privasi</a></li>
            <li><a href="/" className="hover:text-gray-300">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        {/* Alamat */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h2 className="font-semibold text-lg mb-4">PT. KonsulQ Sehati</h2>
          <p className="text-sm leading-relaxed">
            Jl. Raya Lenteng Agung No.20C, Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan,
            Daerah Khusus Ibukota Jakarta 12640
          </p>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-1/5">
          <h2 className="font-semibold text-lg mb-4">Follow us</h2>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-gray-300"><FaFacebook size={24} /></a>
            <a href="/" className="hover:text-gray-300"><FaTwitter size={24} /></a>
            <a href="/" className="hover:text-gray-300"><FaInstagram size={24} /></a>
            <a href="/" className="hover:text-gray-300"><FaLinkedin size={24} /></a>
            <a href="/" className="hover:text-gray-300"><FaYoutube size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

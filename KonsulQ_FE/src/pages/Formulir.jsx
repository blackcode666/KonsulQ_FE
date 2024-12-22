import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Formulir = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    dokter: "",
    nama: "",
    tanggal: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    alergi: "",
    dokterSpesialis: "",
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Fungsi untuk submit formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Debug: Lihat data di console

    // Navigasi ke halaman checkout dengan data
    navigate("/checkout", { state: { formData } });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Form Section */}
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Formulir Konsultasi</h2>
          <form onSubmit={handleSubmit}>
            {/* Input: Dokter */}
            <div className="mb-4">
              <label htmlFor="dokter" className="block text-sm font-medium text-gray-700 mb-2">
                Mau konsultasi dengan dokter apa? *
              </label>
              <div className="relative">
                <select
                  id="dokter"
                  value={formData.dokter}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 appearance-none focus:ring-teal-500 focus:border-teal-500 text-gray-800"
                >
                  <option value="" disabled hidden>
                    Pilih Dokter
                  </option>
                  <option value="Dokter Umum">Dokter Umum</option>
                  <option value="Dokter Spesialis">Dokter Spesialis</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input: Nama dan Tanggal Lahir */}
            <div className="mb-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pasien *
                </label>
                <input
                  type="text"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                  className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Lahir Pasien *
                </label>
                <input
                  type="date"
                  id="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Input: Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender Pasien *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value="Laki-Laki"
                    checked={formData.gender === "Laki-Laki"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Laki-Laki
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="gender"
                    value="Perempuan"
                    checked={formData.gender === "Perempuan"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Perempuan
                </label>
              </div>
            </div>

            {/* Input: Email dan Phone */}
            <div className="mb-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan Email"
                  className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Handphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor Handphone"
                  className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Input: Alamat */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Pasien *
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan Alamat Pasien"
                className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>

            {/* Input: Alergi dan Dokter Spesialis */}
            <div className="mb-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="alergi" className="block text-sm font-medium text-gray-700 mb-2">
                  Riwayat Alergi Obat *
                </label>
                <input
                  type="text"
                  id="alergi"
                  value={formData.alergi}
                  onChange={handleChange}
                  placeholder="Masukkan Riwayat Alergi Obat (Jika Ada)"
                  className="w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
             
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Formulir;

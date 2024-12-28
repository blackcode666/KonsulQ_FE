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
  });

  // State untuk menyimpan error
  const [errors, setErrors] = useState({});

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Hapus error jika field diisi
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value ? "" : "Field ini wajib diisi",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Fungsi untuk submit formulir
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi: Periksa apakah semua field terisi
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Field ini wajib diisi";
      }
    });

    // Jika ada error, simpan ke state dan hentikan proses
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Harap isi semua bidang yang diperlukan.");
      return;
    }

    // Jika validasi lolos, navigasi ke halaman checkout
    navigate("/checkout", { state: { formData } });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Form Section */}
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Formulir Konsultasi
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Input: Dokter */}
            <div className="mb-4">
              <label
                htmlFor="dokter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mau konsultasi dengan dokter apa? *
              </label>
              <select
                id="dokter"
                value={formData.dokter}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.dokter ? "border-red-500" : ""
                }`}
              >
                <option value="" disabled hidden>
                  Pilih Dokter
                </option>
                <option value="Dokter Umum">Dokter Umum</option>
                <option value="Dokter Spesialis">Dokter Spesialis</option>
              </select>
              {errors.dokter && (
                <p className="text-red-500 text-sm mt-1">{errors.dokter}</p>
              )}
            </div>

            {/* Input: Nama dan Tanggal Lahir */}
            <div className="mb-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Pasien *
                </label>
                <input
                  type="text"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                  className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.nama ? "border-red-500" : ""
                  }`}
                />
                {errors.nama && (
                  <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="tanggal"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tanggal Lahir Pasien *
                </label>
                <input
                  type="date"
                  id="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.tanggal ? "border-red-500" : ""
                  }`}
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>
                )}
              </div>
            </div>

            {/* Input: Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Input: Email dan Phone */}
            <div className="mb-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan Email"
                  className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nomor Handphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor Handphone"
                  className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Input: Alamat */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Alamat Pasien *
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan Alamat Pasien"
                className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.address ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Input: Alergi */}
            <div className="mb-4">
              <label
                htmlFor="alergi"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Riwayat Alergi Obat *
              </label>
              <input
                type="text"
                id="alergi"
                value={formData.alergi}
                onChange={handleChange}
                placeholder="Masukkan Riwayat Alergi Obat (Jika Ada)"
                className={`w-full border rounded-lg p-3 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.alergi ? "border-red-500" : ""
                }`}
              />
              {errors.alergi && (
                <p className="text-red-500 text-sm mt-1">{errors.alergi}</p>
              )}
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

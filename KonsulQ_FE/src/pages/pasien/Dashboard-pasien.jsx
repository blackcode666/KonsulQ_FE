import React, { useEffect, useState } from "react";
import axios from "axios";
import PasienLayout from "../../layouts/pasien/PasienLayout"; // Pastikan jalur benar
import Dela from "../../assets/dela.png"; // Pastikan jalur file sesuai

const DashboardPasien = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null); // Menyimpan gambar profil

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan.");

        const response = await axios.get("https://techsign.store/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        if (!userData) {
          throw new Error("Data pasien tidak valid.");
        }

        setPatientData(userData);
        setEditedData(userData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError(error.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleGenderChange = (e) => {
    setEditedData({ ...editedData, gender: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]; // Ensure this is a valid file
    if (file) {
      setProfilePicture(file); // Set the profile picture
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan.");

      const formData = new FormData();

      // Menambahkan data selain gambar ke dalam FormData
      formData.append("name", editedData.name || "");
      formData.append("email", editedData.email || "");
      formData.append("gender", editedData.gender || "");
      formData.append("address", editedData.address || "");
      formData.append("phone_number", editedData.phone_number || "");
      formData.append("medical_history", editedData.medical_history || "");

      // Menambahkan file gambar jika ada
      if (profilePicture && profilePicture instanceof File) {
        formData.append("profile_picture", profilePicture, profilePicture.name);
      }
      // Mengirimkan FormData ke server
      const response = await axios.post(
        `https://techsign.store/api/users/${patientData.id}?_method=PUT`,
        formData,  // Mengirim FormData ke server
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",  // Header untuk FormData
          },
        }
      );

      console.log("Response from API:", response.data);

      // Menampilkan notifikasi sukses
      alert("Perubahan berhasil disimpan!");

      // Memperbarui data pasien di state untuk merender ulang halaman
      setPatientData((prevData) => ({
        ...prevData,
        ...setEditModalOpen(false),
        ...response.data.data,  // Pastikan response data berisi informasi yang baru
      }));

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.errors);
      } else {
        alert("Terjadi kesalahan saat menyimpan perubahan.");
      }
    }
  };

  return (
    <PasienLayout>
      <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
          {loading ? (
            <div className="text-center text-gray-600 text-lg">Loading...</div>
          ) : (
            <>
              {/* Header Card */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden">
                  <img
                    src={patientData.profile_picture || Dela}
                    alt="Avatar Pasien"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {patientData.name || "Nama tidak tersedia"}
                  </h2>
                  <p className="text-gray-600">ID: {patientData.id || "-"}</p>
                  <button
                    onClick={handleEditClick}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Informasi Tambahan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 font-medium">Jenis Kelamin</p>
                  <p className="text-gray-600">{patientData.gender === "1" ? "Pria" : "Wanita"}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Alamat</p>
                  <p className="text-gray-600">{patientData.address || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Nomor Telepon</p>
                  <p className="text-gray-600">{patientData.phone_number || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Email</p>
                  <p className="text-gray-600">{patientData.email || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Riwayat Penyakit</p>
                  <pre className="whitespace-pre-wrap text-gray-600">{patientData.medical_history || "-"}</pre>
                </div>
              </div>
              {/* appointment table */}
                <div className="grid grid-cols-1 mt-6 w-100">
                  <p className="text-gray-700 font-medium">Data Janji Temu</p>
                  <table className="table-auto divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Tanggal</th>
                      <th className="px-4 py-2">Dokter</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData?.appointments?.length > 0 ? (
                      patientData.appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-2 border border-gray-300">{appointment.id}</td>
                          <td className="px-4 py-2 border border-gray-300">{appointment.appointment_time}</td>
                          <td className="px-4 py-2 border border-gray-300">
                            {appointment.doctor ? appointment.doctor.name : "Tidak ada data dokter"}
                          </td>

                          <td className="px-4 py-2 border border-gray-300">{appointment.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">Tidak ada data appointment</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Edit */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mt-[10%]">
            <h2 className="text-xl font-bold mb-4">Edit Data Pasien</h2>

            {/* Name input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleInputChange}
                className={`w-full border ${errors?.name ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors?.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
            </div>

            {/* Gender input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Jenis Kelamin</label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={editedData.gender === "0"}
                    onChange={handleGenderChange}
                    className="mr-2"
                  />
                  Wanita
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={editedData.gender === "1"}
                    onChange={handleGenderChange}
                    className="mr-2"
                  />
                  Pria
                </label>
              </div>
              {errors?.gender && <p className="text-red-500 text-sm">{errors.gender[0]}</p>}
            </div>

            {/* Phone number input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Nomor Telepon</label>
              <input
                type="text"
                name="phone_number"
                value={editedData.phone_number || ""}
                onChange={handleInputChange}
                className={`w-full border ${errors?.phone_number ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors?.phone_number && <p className="text-red-500 text-sm">{errors.phone_number[0]}</p>}
            </div>

            {/* Address input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Alamat</label>
              <input
                type="text"
                name="address"
                value={editedData.address || ""}
                onChange={handleInputChange}
                className={`w-full border ${errors?.address ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors?.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleInputChange}
                className={`w-full border ${errors?.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors?.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
            </div>

            {/* Medical History input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Medical History</label>
              <textarea
                name="medical_history"
                value={editedData.medical_history || ""}
                onChange={handleInputChange}
                className={`w-full border ${errors?.medical_history ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
                required
              />
              {errors?.medical_history && <p className="text-red-500 text-sm">{errors.medical_history[0]}</p>}
            </div>

            {/* Profile picture input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Gambar Profil</label>
              <input
                name="profile_picture"
                type="file"
                onChange={handleProfilePictureChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors?.profile_picture && <p className="text-red-500 text-sm">{errors.profile_picture[0]}</p>}
            </div>

            {/* Modal action buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </PasienLayout>
  );
};

export default DashboardPasien;

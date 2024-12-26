import React, { useState, useEffect } from "react";
import CariDokterLayout from "../../layouts/pasien/CariDokterLayout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Pastikan jalur impor benar

const CariDokter = () => {
  const { userInfo } = useAuth(); // Ambil data pengguna dari context
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_start: "",
    appointment_end: "",
    status: "scheduled",
    details: "",
    total_time: 0, // Tambahkan properti untuk total jam
    total_price: 0, // Tambahkan properti untuk total harga
  });

  // Tambahkan state untuk error
  const [errors, setErrors] = useState({
    appointment_start: "",
    appointment_end: "",
    details: "",
  });

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Ambil data dokter dari backend menggunakan API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://techsign.store/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Pastikan data tidak null atau undefined
        const cleanedDoctors = response.data.filter(doctor => doctor.user && doctor.user.name);
        setDoctors(cleanedDoctors); // Menyimpan data dokter ke state
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token]);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.user.name ? doctor.user.name.toLowerCase() : "";
    const specialization = doctor.specialization ? doctor.specialization.toLowerCase() : "";
    const address = doctor.user.address ? doctor.user.address.toLowerCase() : "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      specialization.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase())
    );
  });

  const handlePesanClick = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentDetails({
      ...appointmentDetails,
      doctor_id: doctor.id, // Menambahkan doctor_id
      patient_id: userInfo.id, // Menambahkan patient_id dari context
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDetails({
      patient_id: userInfo.id, // Pastikan `patient_id` tetap terisi setelah modal ditutup
      doctor_id: "",
      appointment_start: "",
      appointment_end: "",
      status: "scheduled",
      details: "",
      total_time: 0,
      total_price: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });

    if (name === "appointment_start" || name === "appointment_end") {
      const startDate = new Date(appointmentDetails.appointment_start);
      const endDate = new Date(value); // Mendapatkan nilai baru dari input
      const totalTime = (endDate - startDate) / (1000 * 60 * 60); // Menghitung durasi dalam jam
      setAppointmentDetails({
        ...appointmentDetails,
        [name]: value,
        total_time: totalTime,
        total_price: totalTime * selectedDoctor.price, // Menghitung harga berdasarkan durasi dan harga per jam
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validasi appointment_start dan appointment_end
    if (!appointmentDetails.appointment_start) {
      formErrors.appointment_start = "Tanggal mulai harus diisi.";
    }
    if (!appointmentDetails.appointment_end) {
      formErrors.appointment_end = "Tanggal selesai harus diisi.";
    } else if (new Date(appointmentDetails.appointment_end) <= new Date(appointmentDetails.appointment_start)) {
      formErrors.appointment_end = "Tanggal selesai harus setelah tanggal mulai.";
    }

    // Validasi details
    if (!appointmentDetails.details) {
      formErrors.details = "Detail harus diisi.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set error state
      return;
    }

    // Kirim data jika tidak ada error
    try {
      const response = await axios.post("https://techsign.store/api/appointments", appointmentDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Appointment successfully created", response.data);
      handleCloseModal();
      alert("Pemesanan berhasil dibuat!");
      
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <CariDokterLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Cari Dokter</h1>
        {/* Form Pencarian */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama dokter, spesialis, atau lokasi..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>
        {/* Daftar Dokter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={
                    doctor.user.profile_pictures
                      ? doctor.user.profile_pictures
                      : `/${doctor.user.gender === 0 ? "0" : "1"}.png`
                  }
                  alt={doctor.user.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-teal-600">{doctor.user.name}</h2>
                <p className="text-gray-600">Spesialis: {doctor.specialization}</p>
                <p className="text-gray-500">Lokasi: {doctor.user.address}</p>
                <p className="text-gray-500">Harga<small>/jam</small>:
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(doctor.price)}</p>
                <button
                  onClick={() => handlePesanClick(doctor)}
                  className="mt-4 w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Pesan
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Tidak ada dokter yang ditemukan.</p>
          )}
        </div>
      </div>

      {/* Modal Form Pemesanan */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Form Pemesanan</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Dokter</label>
                <input
                  type="text"
                  value={selectedDoctor.user.name}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input type="hidden" value={selectedDoctor.user.id} name="doctor_id" />
                <input type="hidden" value={userInfo.id} name="patient_id" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                <input
                  type="datetime-local"
                  name="appointment_start"
                  value={appointmentDetails.appointment_start}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.appointment_start && <p className="text-red-500 text-xs">{errors.appointment_start}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                <input
                  type="datetime-local"
                  name="appointment_end"
                  value={appointmentDetails.appointment_end}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.appointment_end && <p className="text-red-500 text-xs">{errors.appointment_end}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Detail</label>
                <textarea
                  name="details"
                  value={appointmentDetails.details}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.details && <p className="text-red-500 text-xs">{errors.details}</p>}
              </div>
              <div className="mb-4">
                <input type="hidden" name="total_time" value={appointmentDetails.total_time} />
                <input type="hidden" name="total_price" value={appointmentDetails.total_price} />
                <p>Total Jam: {appointmentDetails.total_time} jam</p>
                <p>Total Harga: {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(appointmentDetails.total_price)}</p>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CariDokterLayout>
  );
};

export default CariDokter;

import React, { useState, useEffect } from "react";
import CariDokterLayout from "../../layouts/pasien/CariDokterLayout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Pastikan jalur impor benar

const CariDokter = () => {

  const { userInfo } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    patient_id: userInfo?.id || "",
    doctor_id: "",
    appointment_start: "",
    appointment_end: "",
    status: "pending",
    details: "",
    total_time: 0,
    total_price: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://techsign.store/api/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cleanedDoctors = response.data.filter((doctor) => doctor.user && doctor.user.id);
        setDoctors(cleanedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Gagal memuat data dokter. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token]);

  const handlePesanClick = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentDetails({
      ...appointmentDetails,
      doctor_id: doctor.user?.id || "",
      patient_id: userInfo?.id || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDetails({
      ...appointmentDetails,
      doctor_id: "",
      appointment_start: "",
      appointment_end: "",
      total_time: 0,
      total_price: 0,
      details: "",
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === "appointment_start" || name === "appointment_end") {
      const startDate =
        name === "appointment_start" ? new Date(value) : new Date(appointmentDetails.appointment_start);
      const endDate =
        name === "appointment_end" ? new Date(value) : new Date(appointmentDetails.appointment_end);

      if (startDate && endDate && startDate < endDate) {
        const totalTime = (endDate - startDate) / (1000 * 60 * 60);
        setAppointmentDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
          total_time: totalTime,
          total_price: totalTime * (selectedDoctor?.price || 0),
        }));
      } else {
        setAppointmentDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
          total_time: 0,
          total_price: 0,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = {};
    if (!appointmentDetails.appointment_start) formErrors.appointment_start = "Tanggal mulai harus diisi.";
    if (!appointmentDetails.appointment_end) {
      formErrors.appointment_end = "Tanggal selesai harus diisi.";
    } else if (new Date(appointmentDetails.appointment_end) <= new Date(appointmentDetails.appointment_start)) {
      formErrors.appointment_end = "Tanggal selesai harus setelah tanggal mulai.";
    }
    if (!appointmentDetails.details) formErrors.details = "Detail harus diisi.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Buat pemesanan awal
      const createResponse = await axios.post(
        `https://techsign.store/api/appointments`,
        appointmentDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (createResponse.data.snapToken) {
        // Proses pembayaran
        window.snap.pay(createResponse.data.snapToken, {
          onSuccess: async (result) => {
            // Update status appointment setelah pembayaran berhasil
            const updateResponse = await axios.put(
              `https://techsign.store/api/appointments/${result.order_id}`,
              { status: "paid" },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(updateResponse);

            if (updateResponse.status === 200) {
              console.log("Appointment status updated successfully:", updateResponse.data);

              // Alert sukses dan redirect
              alert("Pemesanan berhasil! Anda akan diarahkan ke halaman riwayat konsultasi.");
              window.location.href = "/riwayat-konsultasi";
            } else {
              alert("Gagal memperbarui status appointment.");
            }
          },
          onPending: (result) => {
            console.log("Payment Pending:", result);
          },
          onError: (result) => {
            console.error("Payment Error:", result);
            alert("Terjadi kesalahan dalam proses pembayaran.");
          },
          onClose: () => {
            console.log("Payment Popup Closed");
            alert("Anda menutup popup pembayaran sebelum menyelesaikan transaksi.");
          },
        });
      } else {
        alert("Token pembayaran tidak tersedia.");
      }
    } catch (error) {
      console.error("Error creating or updating appointment:", error);
      alert("Terjadi kesalahan saat membuat pemesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };


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
  return (
    <CariDokterLayout>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Cari Dokter</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama dokter, spesialis, atau lokasi..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div key={index} className="bg-white p-4 border rounded-lg shadow-sm">
                <img
                  src={doctor.user.profile_pictures || "/default-profile.png"}
                  alt={doctor.user.name || "Dokter"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-teal-600">{doctor.user.name || "Nama tidak tersedia"}</h2>
                <p className="text-gray-600">Spesialis: {doctor.specialization || "Tidak tersedia"}</p>
                <p className="text-gray-500">Lokasi: {doctor.user.address || "Alamat tidak tersedia"}</p>
                <p className="text-gray-500">
                  Harga<small>/jam</small>:{" "}
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(doctor.price)}
                </p>
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
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                <input
                  type="datetime-local"
                  name="appointment_start"
                  value={appointmentDetails.appointment_start}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                />
                {errors.details && <p className="text-red-500 text-xs">{errors.details}</p>}
              </div>
              <div className="mb-4">
                <p>Total Jam: {appointmentDetails.total_time} jam</p>
                <p>Total Harga: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(appointmentDetails.total_price)}</p>
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
                  className={`py-2 px-4 rounded-lg ${isSubmitting ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"} text-white`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Pesan"}
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
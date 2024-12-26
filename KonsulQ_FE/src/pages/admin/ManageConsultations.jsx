import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageConsultationsLayout from "../../layouts/admin/ManageConsultationsLayout";

// Konfigurasi API
const API_URL = "https://techsign.store/api/appointments"; // Ganti dengan API yang benar
const token = localStorage.getItem("token"); // Ambil token dari localStorage
const TOKEN = `Bearer ${token}`; // Ganti dengan token Anda

const ManageConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data konsultasi dari endpoint appointments
  const fetchConsultations = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: TOKEN },
      });

      const data = response.data.map((appointment) => ({
        waktu: appointment.appointment_start || "Tidak ada tanggal",
        doctor: appointment.doctor?.name || "Tidak diketahui", // Mengakses nama dokter dari objek doctor
        patient: appointment.patient?.name || "Tidak diketahui", // Mengakses nama pasien dari objek patient
        detail: appointment.details || "Tidak ada detail",
        status: appointment.status || "Tidak ada status",
      }));


      console.log(data, response.data);

      setConsultations(data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  if (loading) {
    return <p>Loading consultations...</p>;
  }

  return (
    <AdminLayout>
      <ManageConsultationsLayout consultations={consultations} />
    </AdminLayout>
  );
};

export default ManageConsultations;

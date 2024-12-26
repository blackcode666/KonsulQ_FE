import React, { useState, useEffect } from "react";
import axios from "axios";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import RiwayatPasienLayout from "../../layouts/dokter/RiwayatPasienLayout";

const RiwayatPasien = () => {
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("https://techsign.store/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter data berdasarkan status "completed"
        const completedAppointments = response.data.filter(appointment => appointment.status === "completed");
        console.log(completedAppointments);

        // Ambil data appointment dan format untuk RiwayatPasienLayout
        const formattedHistory = completedAppointments.map(appointment => ({
          patient: appointment.patient?.name || "Nama tidak tersedia",  // Cek apakah data ada
          date: appointment.appointment_start ? new Date(appointment.appointment_start).toLocaleDateString() : "Tanggal tidak tersedia",  // Format tanggal jika ada
          diagnosis: appointment.details || "Diagnosis tidak tersedia",  // Pastikan ada data diagnosis
          action: appointment.status || "Status tidak tersedia",  // Tindakan atau status jika ada
        }));

        setHistory(formattedHistory);  // Set data riwayat pasien
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <DokterLayout>
      <RiwayatPasienLayout history={history} />
    </DokterLayout>
  );
};

export default RiwayatPasien;

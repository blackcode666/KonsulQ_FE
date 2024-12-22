import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import JadwalSayaLayout from "../../layouts/dokter/JadwalSayaLayout";

const JadwalSaya = () => {
  const schedules = [
    { patient: "Albram", service: "15 Juli 2024", time: "10:00", status: "Terjadwal" },
    { patient: "Salman", service: "22 Juli 2024", time: "13:00", status: "Terjadwal" },
    { patient: "Dela", service: "29 Juli 2024", time: "15:00", status: "Terjadwal" },
    { patient: "Fadhilah", service: "5 Agustus 2024", time: "09:00", status: "Terjadwal" },
    { patient: "Argya", service: "12 Agustus 2024", time: "11:00", status: "Terjadwal" },
  ];

  return (
    <DokterLayout>
      <JadwalSayaLayout schedules={schedules} />
    </DokterLayout>
  );
};

export default JadwalSaya;

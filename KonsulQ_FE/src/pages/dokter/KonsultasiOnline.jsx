import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import KonsultasiOnlineLayout from "../../layouts/dokter/KonsultasiOnlineLayout";

const KonsultasiOnline = () => {
  const consultations = [
    { patient: "Albram", time: "10:00", status: "Selesai" },
    { patient: "Salman", time: "13:00", status: "Menunggu" },
    { patient: "Dela", time: "15:00", status: "Selesai" },
    { patient: "Fadhilah", time: "09:00", status: "Dibatalkan" },
  ];

  return (
    <DokterLayout>
      <KonsultasiOnlineLayout consultations={consultations} />
    </DokterLayout>
  );
};

export default KonsultasiOnline;

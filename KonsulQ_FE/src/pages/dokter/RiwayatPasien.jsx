import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import RiwayatPasienLayout from "../../layouts/dokter/RiwayatPasienLayout";

const RiwayatPasien = () => {
  const history = [
    { patient: "Albram", date: "15 Juli 2024", diagnosis: "Flu", action: "Obat Diberikan" },
    { patient: "Salman", date: "22 Juli 2024", diagnosis: "Demam", action: "Pemeriksaan Lanjut" },
    { patient: "Dela", date: "29 Juli 2024", diagnosis: "Diabetes", action: "Terapi" },
    { patient: "Fadhilah", date: "5 Agustus 2024", diagnosis: "Batuk", action: "Obat Diberikan" },
  ];

  return (
    <DokterLayout>
      <RiwayatPasienLayout history={history} />
    </DokterLayout>
  );
};

export default RiwayatPasien;

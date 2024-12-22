import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import LaporanLayout from "../../layouts/dokter/LaporanLayout";

const Laporan = () => {
  const reports = [
    { date: "15 Juli 2024", earning: "Rp 2.000.000", status: "Selesai" },
    { date: "22 Juli 2024", earning: "Rp 1.500.000", status: "Selesai" },
    { date: "29 Juli 2024", earning: "Rp 3.000.000", status: "Menunggu" },
    { date: "5 Agustus 2024", earning: "Rp 2.500.000", status: "Selesai" },
  ];

  return (
    <DokterLayout>
      <LaporanLayout reports={reports} />
    </DokterLayout>
  );
};

export default Laporan;

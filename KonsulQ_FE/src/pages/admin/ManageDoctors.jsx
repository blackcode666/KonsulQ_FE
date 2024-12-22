import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageDoctorsLayout from "../../layouts/admin/ManageDoctorsLayout";

const ManageDoctors = () => {
  const doctors = [
    { doctor: "Dr Dela", patient: "Albram", time: "Rp 20.000.000", status: "Menunggu" },
    { doctor: "Dr Albram", patient: "Salman", time: "Rp 15.000.000", status: "Selesai" },
    { doctor: "Dr Salman", patient: "Fadhilah", time: "Rp 30.000.000", status: "Dibatalkan" },
  ];

  return (
    <AdminLayout>
      <ManageDoctorsLayout doctors={doctors} />
    </AdminLayout>
  );
};

export default ManageDoctors;

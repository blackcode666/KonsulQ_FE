import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageConsultationsLayout from "../../layouts/admin/ManageConsultationsLayout";

const ManageConsultations = () => {
  const consultations = [
    { doctor: "Dr A", patient: "John", serviceType: "Chat", status: "Selesai" },
    { doctor: "Dr B", patient: "Jane", serviceType: "Video Call", status: "Menunggu" },
  ];

  return (
    <AdminLayout>
      <ManageConsultationsLayout consultations={consultations} />
    </AdminLayout>
  );
};

export default ManageConsultations;

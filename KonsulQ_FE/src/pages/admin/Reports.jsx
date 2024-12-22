import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ReportsLayout from "../../layouts/admin/ReportsLayout";

const Reports = () => {
  const reports = [
    { doctor: "Dr A", patient: "John", earning: "Rp 2.000.000", status: "Selesai" },
    { doctor: "Dr B", patient: "Jane", earning: "Rp 1.500.000", status: "Menunggu" },
  ];

  return (
    <AdminLayout>
      <ReportsLayout reports={reports} />
    </AdminLayout>
  );
};

export default Reports;

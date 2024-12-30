import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageDoctorsLayout from "../../layouts/admin/ManageDoctorsLayout";

const ManageDoctors = () => {
  return (
    <AdminLayout>
      <ManageDoctorsLayout />
    </AdminLayout>
  );
};

export default ManageDoctors;

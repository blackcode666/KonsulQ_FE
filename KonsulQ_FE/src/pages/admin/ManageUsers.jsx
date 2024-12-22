import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageUsersLayout from "../../layouts/admin/ManageUsersLayout";

const ManageUsers = () => {
  const users = [
    { name: "Ola Akintola", date: "12-09-2023", room: "UI/201", id: "02566", service: "Konsultasi Chat" },
    { name: "Janet Paul", date: "12-09-2023", room: "AC/32", id: "07634", service: "Konsultasi Video Call" },
    { name: "Areogun Joe", date: "12-09-2023", room: "AG/45", id: "02990", service: "Konsultasi Chat" },
  ];

  return (
    <AdminLayout>
      <ManageUsersLayout users={users} />
    </AdminLayout>
  );
};

export default ManageUsers;

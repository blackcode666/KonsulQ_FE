import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageUsersLayout from "../../layouts/admin/ManageUsersLayout";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        const response = await axios.get("https://techsign.store/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Menambahkan Authorization header
          },
        });

        // Filter pengguna berdasarkan role 'pasien'
        const pasienUsers = response.data.data.filter(user => user.role === 'patient');

        // Set data pengguna yang sudah difilter
        setUsers(pasienUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <ManageUsersLayout users={users} loading={loading} error={error} />
    </AdminLayout>
  );
};

export default ManageUsers;

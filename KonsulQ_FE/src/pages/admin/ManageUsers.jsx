import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ManageUsersLayout from "../../layouts/admin/ManageUsersLayout";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        const response = await axios.get("https://techsign.store/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
          },
        });
        const usersData = response.data.data; // Sesuaikan dengan struktur respons API
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <ManageUsersLayout users={users} />
    </AdminLayout>
  );
};

export default ManageUsers;

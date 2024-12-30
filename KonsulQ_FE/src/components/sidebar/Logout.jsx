import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Mengambil fungsi logout dari AuthContext

  const handleSignOut = async () => {
    try {
      // Panggil API logout ke backend
      await axios.post(
        "https://techsign.store/api/logout", // Ganti dengan URL backend Anda
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ambil token dari localStorage
          },
        }
      );

      console.log("Logout berhasil dari backend.");
    } catch (error) {
      console.error("Error saat logout dari backend:", error);
    } finally {
      // Hapus semua data dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");

      // Panggil fungsi logout dari AuthContext (opsional)
      logout();

      // Redirect ke halaman login
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleSignOut} // Panggil fungsi logout saat tombol diklik
      className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
    >
      <i className="fas fa-sign-out-alt mr-3 text-teal-500"></i> Sign Out
    </button>
  );
};

export default Logout;

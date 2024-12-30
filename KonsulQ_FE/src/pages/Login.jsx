import React from "react";
import LRImage from "../assets/LR.png";
import RightImage from "../assets/1.png";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Fungsi untuk Sign-In menggunakan Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome back, ${user.displayName}!`);

      login({ ...user, role: user.role || "user" }); // Simpan role jika ada
      navigateBasedOnRole(user.role); // Navigasi berdasarkan role
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  // Fungsi untuk Login menggunakan Email dan Password
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Email dan password harus diisi.");
      return;
    }

    try {
      const response = await axios.post("https://techsign.store/api/login", {
        email,
        password,
      });

      console.log("API Response:", response.data);

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        // Simpan token ke localStorage
        localStorage.setItem("token", token);
        alert(`Selamat datang, ${user.name}!`);

        const role = user.role ? user.role : "user"; // Default role ke "user"
        login({ ...user, role }); // Simpan role pengguna

        navigateBasedOnRole(role); // Navigasi berdasarkan role
      } else {
        alert("Login gagal. Silahkan cek email dan password anda.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login gagal. Silahkan cek email dan password anda.");
    }
  };

  // Fungsi untuk mengarahkan pengguna berdasarkan role
  const navigateBasedOnRole = (role) => {
    if (role === "admin") {
      navigate("/dashboard-admin");
    } else if (role === "doctor") {
      navigate("/dashboard-dokter");
    } else if (role === "patient") {
      navigate("/dashboard-pasien");
    } else {
      navigate("/"); // Redirect ke halaman utama jika role tidak dikenali
    }
  };

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      // Hapus token dari backend (Opsional)
      await axios.post(
        "https://techsign.store/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error saat logout:", error);
    } finally {
      // Hapus token dari localStorage
      localStorage.removeItem("token");

      // Redirect ke halaman login
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-500">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center bg-gray-200 px-12 lg:px-20 pb-8 flex-grow">
        <div className="flex justify-center mb-10">
          {/* Enlarged Logo */}
          <img src={LRImage} alt="Logo" className="w-44 h-44 object-contain" />
        </div>
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Selamat Datang
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Masuk untuk melanjutkan
          </p>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan email kamu"
                aria-describedby="email-helper"
              />
              <small id="email-helper" className="text-sm text-gray-500">
                Contoh: email@example.com
              </small>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan password kamu"
                aria-describedby="password-helper"
              />
              <small id="password-helper" className="text-sm text-gray-500">
                Password minimal 8 karakter.
              </small>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:outline-none"
            >
              Masuk
            </button>
          </form>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-600 mb-5">Atau masuk menggunakan</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                Login with Google
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Belum punya akun?{" "}
              <a href="/register" className="text-green-500 hover:underline">
                Daftar Sekarang
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-[45%] bg-teal-600 items-center justify-center flex-grow">
        <img
          src={RightImage}
          alt="Right Side"
          className="max-h-[80%] max-w-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default Login;

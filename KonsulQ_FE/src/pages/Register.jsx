import React, { useState } from "react";
import LRImage from "../assets/LR.png";
import RightImage from "../assets/1.png";
import { auth, provider, signInWithPopup } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Registrasi berhasil, ${user.displayName}! Silakan login dengan akun Anda.`);
      navigate("/login"); // Redirect ke halaman login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Registrasi gagal. Silakan coba lagi.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert("Harap isi semua bidang.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Kirim data ke API Laravel
      const response = await axios.post("https://techsign.store/api/register", {
        name: name,
        email: email,
        password: password,
      });

      if (response.data.status === "success") {
        alert(`Registrasi berhasil, ${name}! Silakan login dengan akun Anda.`);
        navigate("/login"); // Redirect ke halaman login
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Registrasi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-500">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center bg-gray-200 px-12 lg:px-20 pb-8 flex-grow">
        <div className="flex justify-center mb-10">
          <img src={LRImage} alt="Logo" className="w-44 h-44 object-contain" />
        </div>
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Ayo Join Sekarang
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Daftar untuk membuat akun baru
          </p>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama Kamu
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Ketik Nama Kamu disini"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan Email kamu ya"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Passwordnya jangan pasaran ya dek"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="kebijakan"
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="kebijakan" className="ml-3 text-sm text-gray-600">
                Saya setuju dengan syarat dan kebijakan
              </label>

            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-green-700"
            >
              Daftar
            </button>
          </form>
          <div className="text-center mt-10">
            <p className="text-sm text-gray-600 mb-5">Atau daftar menggunakan</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                Sign up with Google
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a href="/login" className="text-green-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
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

export default Register;

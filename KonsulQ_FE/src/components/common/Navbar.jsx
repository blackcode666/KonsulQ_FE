import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import useAuth dari AuthContext

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { isLoggedIn, userInfo, logout } = useAuth(); // Ambil state dan fungsi logout dari AuthContext

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      // Panggil API logout ke backend
      await axios.post(
        "https://techsign.store/api/logout", // Sesuaikan dengan endpoint backend Anda
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

      // Panggil fungsi logout dari AuthContext
      logout();

      // Redirect ke halaman login
      navigate("/");
    }
  };

  useEffect(() => {
    // Tutup dropdown jika klik di luar
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Deteksi perubahan ukuran layar
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    // Set ukuran awal saat komponen di-mount
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="p-4 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo dan Hamburger */}
        <div className="flex items-center">
          <button
            className="text-white focus:outline-none mr-4"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <Link to="/" className="text-white text-2xl font-bold">
              KONSUL<span className="text-teal-200">Q</span>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        {!isMobileView && (
          <nav className="hidden md:flex gap-6">
            <Link
              to="/"
              className={`font-bold inline-block text-white hover:underline ${
                location.pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              BERANDA
            </Link>
            <Link
              to="/riwayat"
              className={`font-bold inline-block text-white hover:underline ${
                location.pathname === "/riwayat-konsultasi"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              RIWAYAT
            </Link>
            <Link
              to="/artikel"
              className={`font-bold inline-block text-white hover:underline ${
                location.pathname === "/artikel"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              ARTIKEL
            </Link>
            <Link
              to="/about"
              className={`font-bold inline-block text-white hover:underline ${
                location.pathname === "/about" ? "border-b-2 border-white" : ""
              }`}
            >
              TENTANG
            </Link>
          </nav>
        )}

        {/* Login/Profil */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex gap-4 items-center">
              <Link
                to="/dashboard-pasien"
                className="bg-white text-teal-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                {userInfo?.name || "Profil"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-teal-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-16 left-4 w-48 bg-white rounded-md shadow-lg z-10"
        >
          <ul className="py-1">
            {isMobileView && (
              <>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/riwayat"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  >
                    Riwayat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/artikel"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  >
                    Artikel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  >
                    Tentang
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/messages"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
              >
                Pesan
              </Link>
            </li>
            <li>
              <Link
                to="/profil"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard-pasien"
                className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

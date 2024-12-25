import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "../components/Checkout";


// Middleware
import Middleware from "./Middleware";

// Komponen Umum
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Formulir from "../pages/Formulir";
import Artikel from "../pages/Artikel";
import Profile from "../pages/Profile";



// Halaman Umum
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Riwayat from "../pages/RIwayatBeranda"; 
// Admin Pages
import DashboardAdmin from "../pages/admin/Dashboard-admin";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageDoctors from "../pages/admin/ManageDoctors";
import ManageConsultations from "../pages/admin/ManageConsultations";
import Reports from "../pages/admin/Reports";

// Dokter Pages
import DashboardDokter from "../pages/dokter/Dashboard-dokter";
import JadwalSaya from "../pages/dokter/JadwalSaya";
import RiwayatPasien from "../pages/dokter/RiwayatPasien";
import KonsultasiOnline from "../pages/dokter/KonsultasiOnline";
import Laporan from "../pages/dokter/Laporan";
import MessagesDokter from "../pages/dokter/MessagesDokter";

// Pasien Pages
import DashboardPasien from "../pages/pasien/Dashboard-pasien";
import CariDokter from "../pages/pasien/CariDokter";
import JadwalKonsultasi from "../pages/pasien/JadwalKonsultasi";
import RiwayatKonsultasi from "../pages/pasien/RiwayatKonsultasi";
import Pembayaran from "../pages/pasien/Pembayaran";
import MessagesPasien from "../pages/pasien/MessagePasien";



const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Fragment><Navbar /><div className="container-fluid mt-4"><Home /></div><Footer /></Fragment>} />
      <Route path="/about" element={<Fragment><Navbar /><div className="container-fluid mt-4"><About /></div><Footer /></Fragment>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Formulir" element={<Formulir />} />
      <Route path="/riwayat" element={<Riwayat isLoggedIn={true} />} />
      <Route path="/riwayat" element={<Riwayat isLoggedIn={false} />} />
        <Route path="*" element={<div>Halaman Tidak Ditemukan</div>} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/checkout" element={<Fragment><Checkout /></Fragment>} /> {/* Rute Checkout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />


      {/* Admin Routes */}
      <Route path="/dashboard-admin" element={<Middleware allowedRoles={['admin']}><DashboardAdmin /></Middleware>} />
      <Route path="/manage-pasien" element={<Middleware allowedRoles={['admin']}><ManageUsers /></Middleware>} />
      <Route path="/manage-doctors" element={<Middleware allowedRoles={['admin']}><ManageDoctors /></Middleware>} />
      <Route path="/manage-consultations" element={<Middleware allowedRoles={['admin']}><ManageConsultations /></Middleware>} />
      <Route path="/reports" element={<Middleware allowedRoles={['admin']}><Reports /></Middleware>} />

      {/* Dokter Routes */}
      <Route path="/dashboard-dokter" element={<Middleware allowedRoles={['doctor']}><DashboardDokter /></Middleware>} />
      <Route path="/jadwal-saya" element={<Middleware allowedRoles={['doctor']}><JadwalSaya /></Middleware>} />
      <Route path="/riwayat-pasien" element={<Middleware allowedRoles={['doctor']}><RiwayatPasien /></Middleware>} />
      <Route path="/konsultasi-online" element={<Middleware allowedRoles={['doctor']}><KonsultasiOnline /></Middleware>} />
      <Route path="/laporan" element={<Middleware allowedRoles={['doctor']}><Laporan /></Middleware>} />
      <Route path="/messages-dokter" element={<Middleware allowedRoles={['doctor']}><MessagesDokter /></Middleware>} />

      {/* Pasien Routes */}
      <Route path="/dashboard-pasien" element={<Middleware allowedRoles={['patient']}><DashboardPasien /></Middleware>} />
      <Route path="/cari-dokter" element={<Middleware allowedRoles={['patient']}><CariDokter /></Middleware>} />
      <Route path="/jadwal-konsultasi" element={<Middleware allowedRoles={['patient']}><JadwalKonsultasi /></Middleware>} />
      <Route path="/riwayat-konsultasi" element={<Middleware allowedRoles={['patient']}><RiwayatKonsultasi /></Middleware>} />
      <Route path="/pembayaran" element={<Middleware allowedRoles={['patient']}><Pembayaran /></Middleware>} />
      <Route path="/messages-pasien" element={<Middleware allowedRoles={['patient']}><MessagesPasien /></Middleware>} />
    </Routes>
  );
};

export default Routing;

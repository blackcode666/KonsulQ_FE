import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {
  // Data Cards
  const cards = [
    {
      title: "Jumlah Dokter Terdaftar",
      value: 50,
      growth: "+8% dari kemarin",
      bg: "bg-red-100",
      text: "text-red-500",
      icon: "fas fa-user-md",
    },
    {
      title: "Total Pasien Terdaftar",
      value: 300,
      growth: "+5% dari kemarin",
      bg: "bg-yellow-100",
      text: "text-yellow-500",
      icon: "fas fa-users",
    },
    {
      title: "Konsultasi Berlangsung",
      value: 5,
      growth: "+1.2% dari kemarin",
      bg: "bg-green-100",
      text: "text-green-500",
      icon: "fas fa-comments",
    },
    {
      title: "Konsultasi Dibatalkan",
      value: 8,
      growth: "+0.5% dari kemarin",
      bg: "bg-purple-100",
      text: "text-purple-500",
      icon: "fas fa-calendar-times",
    },
  ];

  // Data untuk Pie Chart
  const pieData = {
    labels: ["Dokter Terdaftar", "Pasien Terdaftar", "Berlangsung", "Dibatalkan"],
    datasets: [
      {
        label: "Jumlah",
        data: [50, 300, 5, 8], // Data diambil dari card
        backgroundColor: ["#F87171", "#FBBF24", "#34D399", "#9F7AEA"],
        hoverBackgroundColor: ["#FCA5A5", "#FDE68A", "#6EE7B7", "#C4B5FD"],
      },
    ],
  };

  // Data untuk Line Chart
  const lineData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Konsultasi Mingguan",
        data: [10, 20, 15, 25, 30, 28, 35], // Contoh data
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${card.bg} flex items-center justify-between`}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
                <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
                <p className="text-sm text-gray-500">{card.growth}</p>
              </div>
              <div>
                <i className={`${card.icon} text-4xl ${card.text}`}></i>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Konsultasi Mingguan</h2>
            <Line data={lineData} options={chartOptions} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Distribusi Statistik</h2>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;

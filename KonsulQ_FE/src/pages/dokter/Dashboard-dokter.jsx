import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const DashboardDokter = () => {
  // Data Cards
  const cardData = [
    {
      title: "Konsultasi Selesai",
      value: 120,
      bg: "bg-green-100",
      text: "text-green-500",
      icon: "fas fa-check-circle",
    },
    {
      title: "Konsultasi Pending",
      value: 45,
      bg: "bg-yellow-100",
      text: "text-yellow-500",
      icon: "fas fa-hourglass-half",
    },
    {
      title: "Konsultasi Dibatalkan",
      value: 15,
      bg: "bg-red-100",
      text: "text-red-500",
      icon: "fas fa-times-circle",
    },
    {
      title: "Pasien Baru",
      value: 25,
      bg: "bg-blue-100",
      text: "text-blue-500",
      icon: "fas fa-user-plus",
    },
    {
      title: "Total Pasien",
      value: 300,
      bg: "bg-purple-100",
      text: "text-purple-500",
      icon: "fas fa-users",
    },
  ];

  // Data untuk Pie Chart (Distribusi Konsultasi)
  const pieData = {
    labels: ["Konsultasi Selesai", "Konsultasi Pending", "Konsultasi Dibatalkan"],
    datasets: [
      {
        label: "Distribusi Konsultasi",
        data: [120, 45, 15],
        backgroundColor: ["#34D399", "#FBBF24", "#F87171"],
        hoverBackgroundColor: ["#6EE7B7", "#FDE68A", "#FCA5A5"],
      },
    ],
  };

  // Data untuk Line Chart (Tren Pasien Baru Mingguan)
  const lineData = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Pasien Baru",
        data: [10, 15, 20, 25], // Data pasien baru per minggu
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
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
    <DokterLayout>
      <div className="space-y-6">
        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${card.bg} flex items-center justify-between`}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
                <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
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
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tren Pasien Baru</h2>
            <Line data={lineData} options={chartOptions} />
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Distribusi Konsultasi</h2>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>
    </DokterLayout>
  );
};

export default DashboardDokter;

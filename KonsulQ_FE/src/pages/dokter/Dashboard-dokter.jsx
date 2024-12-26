import React, { useState, useEffect } from "react";
import axios from "axios";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import { useAuth } from "../../context/AuthContext";
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
  const { userInfo } = useAuth();
  console.log(userInfo);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    cancelled: 0,
    newPatients: 0,
    totalPatients: 0,
  });
  const [loading, setLoading] = useState(true);

  const [lineData, setLineData] = useState({
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Pasien Baru",
        data: [0, 0, 0, 0],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(userInfo);

        // Ambil data konsultasi
        const consultationResponse = await axios.get(`https://techsign.store/api/appointments/${userInfo.id}/doctor`);
        const consultations = consultationResponse.data;

        const completedConsultations = consultations.filter(
          (consul) => consul.status === "completed"
        ).length;
        const pendingConsultations = consultations.filter(
          (consul) => consul.status === "pending"
        ).length;
        const cancelledConsultations = consultations.filter(
          (consul) => consul.status === "canceled"
        ).length;

        // Ambil data pasien
        const patientResponse = await axios.get("https://techsign.store/api/users");
        const patients = patientResponse.data.data.filter((user) => user.role === "patient");

        // Mendapatkan data konsultasi untuk minggu terakhir
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        // Filter konsultasi dalam 7 hari terakhir
        const recentConsultations = consultations.filter((consultation) => {
          const appointmentDate = new Date(consultation.appointment_start);
          return appointmentDate >= lastWeekDate;
        });

        const consultationsByDay = [0, 0, 0, 0, 0, 0, 0]; // Array untuk mencatat konsultasi setiap hari
        recentConsultations.forEach((consultation) => {
          const appointmentDate = new Date(consultation.appointment_start);
          const dayOfWeek = appointmentDate.getDay(); // Menentukan hari dalam seminggu
          consultationsByDay[dayOfWeek]++;
        });

        setStats({
          completed: completedConsultations,
          pending: pendingConsultations,
          cancelled: cancelledConsultations,
          newPatients: patients.length,
          totalPatients: patients.length,
        });

        setLineData({
          labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], // Label untuk hari dalam seminggu
          datasets: [
            {
              label: "Konsultasi Mingguan",
              data: consultationsByDay,
              borderColor: "#34D399",
              backgroundColor: "rgba(52, 211, 153, 0.3)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);


  const pieData = {
    labels: ["Konsultasi Selesai", "Konsultasi Pending", "Konsultasi Dibatalkan"],
    datasets: [
      {
        label: "Distribusi Konsultasi",
        data: [stats.completed, stats.pending, stats.cancelled],
        backgroundColor: ["#34D399", "#FBBF24", "#F87171"],
        hoverBackgroundColor: ["#6EE7B7", "#FDE68A", "#FCA5A5"],
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
        {!loading && (
          <>
            {/* Statistik Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Konsultasi Selesai",
                  value: stats.completed,
                  bg: "bg-green-100",
                  text: "text-green-500",
                  icon: "fas fa-check-circle",
                },
                {
                  title: "Konsultasi Pending",
                  value: stats.pending,
                  bg: "bg-yellow-100",
                  text: "text-yellow-500",
                  icon: "fas fa-hourglass-half",
                },
                {
                  title: "Konsultasi Dibatalkan",
                  value: stats.cancelled,
                  bg: "bg-red-100",
                  text: "text-red-500",
                  icon: "fas fa-times-circle",
                },
                {
                  title: "Pasien Baru",
                  value: stats.newPatients,
                  bg: "bg-blue-100",
                  text: "text-blue-500",
                  icon: "fas fa-user-plus",
                },
                {
                  title: "Total Pasien",
                  value: stats.totalPatients,
                  bg: "bg-purple-100",
                  text: "text-purple-500",
                  icon: "fas fa-users",
                },
              ].map((card, index) => (
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
          </>
        )}
      </div>
    </DokterLayout>
  );
};

export default DashboardDokter;

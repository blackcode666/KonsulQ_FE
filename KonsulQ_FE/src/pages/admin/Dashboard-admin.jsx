import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    consultations: 0,
    cancelled: 0,

  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      try {

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


        const userResponse = await axios.get("https://techsign.store/api/users");

        const doctorCount = userResponse.data.data.filter(user => user.role === 'doctor').length;
        const patientCount = userResponse.data.data.filter(user => user.role === 'patient').length;


        const consultationResponse = await axios.get("https://techsign.store/api/appointments");
        const consultationData = consultationResponse.data;
        const cancelledConsultations = consultationData.filter((consul) => consul.status === "canceled");
        const scheduledConsultations = consultationData.filter((consul) => consul.status !== "canceled");
        console.log("Scheduled Consultations:", scheduledConsultations.length);


        setStats({
          doctors: doctorCount,
          patients: patientCount,
          consultations: scheduledConsultations.length,
          cancelled: cancelledConsultations.length,
        });

        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);


        const recentConsultations = scheduledConsultations.filter((consultation) => {
          const appointmentDate = new Date(consultation.appointment_start);
          return appointmentDate >= lastWeekDate;
        });


        const consultationsByDay = [0, 0, 0, 0, 0, 0, 0];
        recentConsultations.forEach((consultation) => {
          const appointmentDate = new Date(consultation.appointment_start);
          const dayOfWeek = appointmentDate.getDay();
          consultationsByDay[dayOfWeek]++;
        });


        setLineData({
          labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
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
  }, []);


  const [lineData, setLineData] = useState({
    labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    datasets: [
      {
        label: "Konsultasi Mingguan",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  });


  const pieData = {
    labels: ["Dokter Terdaftar", "Pasien Terdaftar", "Berlangsung", "Dibatalkan"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          stats.doctors,
          stats.patients,
          stats.consultations,
          stats.cancelled,
        ],
        backgroundColor: ["#F87171", "#FBBF24", "#34D399", "#9F7AEA"],
        hoverBackgroundColor: ["#FCA5A5", "#FDE68A", "#6EE7B7", "#C4B5FD"],
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
          {[
            {
              title: "Jumlah Dokter Terdaftar",
              value: stats.doctors,
              bg: "bg-red-100",
              text: "text-red-500",
              icon: "fas fa-user-md",
            },
            {
              title: "Total Pasien Terdaftar",
              value: stats.patients,
              bg: "bg-yellow-100",
              text: "text-yellow-500",
              icon: "fas fa-users",
            },
            {
              title: "Konsultasi Berlangsung",
              value: stats.consultations - stats.cancelled,
              bg: "bg-green-100",
              text: "text-green-500",
              icon: "fas fa-comments",
            },
            {
              title: "Konsultasi Dibatalkan",
              value: stats.cancelled,
              bg: "bg-purple-100",
              text: "text-purple-500",
              icon: "fas fa-calendar-times",
            },
          ].map((card, index) => (
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
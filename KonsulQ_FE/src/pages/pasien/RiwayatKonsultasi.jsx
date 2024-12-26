import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css"; // Gaya kalender default
import { useAuth } from "../../context/AuthContext"; // Pastikan jalur impor benar
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
DataTable.use(DT);

import RiwayatKonsultasiLayout from "../../layouts/pasien/RiwayatKonsultasiLayout";

const RiwayatKonsultasi = () => {
  const [appointments, setAppointments] = useState([]); // State untuk menyimpan appointment
  const [loading, setLoading] = useState(true); // State untuk menandai loading

  const { userInfo } = useAuth(); // Ambil data pengguna dari context
  const token = localStorage.getItem("token");
  console.log(userInfo.id);

  // Ambil data appointment yang statusnya scheduled dan filter berdasarkan user_id
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true); // Menandai loading
        const response = await axios.get(
          `https://techsign.store/api/appointments/${userInfo.id}/patient`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Menyimpan seluruh data appointment
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Menandai loading selesai
      }
    };

    fetchAppointments();
  }, [token, userInfo.id]);

  return (
    <RiwayatKonsultasiLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Data Konsultasi</h1>
        {/* pesan konsultasi kembali */}
        <a href="/cari-dokter" className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-800 transition duration-200">Pesan Konsultasi</a>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <DataTable
            className="display w-full"
            options={{
              paging: true,
              searching: true,
              ordering: true,
              info: true,
              autoWidth: false,
            }}
          >
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Dokter</th>
                <th>Waktu Mulai</th>
                <th>Waktu Selesai</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const currentTime = new Date();
                const appointmentStartTime = new Date(appointment.appointment_start);
                const appointmentEndTime = new Date(appointment.appointment_end);

                // Menentukan apakah tombol konsultasi muncul berdasarkan waktu dan status
                const showConsultButton =
                  appointment.status === "scheduled" &&
                  currentTime >= appointmentStartTime &&
                  currentTime <= appointmentEndTime;

                return (
                  <tr key={appointment.id}>
                    <td>{new Date(appointment.appointment_start).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>{appointment.doctor.name}</td>
                    <td>{new Date(appointment.appointment_start).toLocaleTimeString()}</td>
                    <td>{new Date(appointment.appointment_end).toLocaleTimeString()}</td>
                    <td>{appointment.status}</td>
                    <td>
                      {appointment.status === "scheduled" || appointment.status === "processed" && showConsultButton ? (
                        <a
                          className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600 transition duration-200"
                          href={`/konsultasi/${appointment.id}`}
                        >
                          masuk
                        </a>
                      ) : (
                          <a
                            className="bg-gray-500 text-white py-1 px-1 rounded hover:bg-gray-600 transition duration-200"
                            href={`/pembayaran`}
                          >
                            bayar
                          </a>
                      )}
                      
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </DataTable>
        )}
      </div>
    </RiwayatKonsultasiLayout>
  );
};

export default RiwayatKonsultasi;

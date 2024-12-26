import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import JadwalKonsultasiLayout from "../../layouts/pasien/JadwalKonsultasiLayout";
import axios from "axios";
import "react-calendar/dist/Calendar.css"; // Gaya kalender default
import { useAuth } from "../../context/AuthContext"; // Pastikan jalur impor benar
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
DataTable.use(DT);

const JadwalKonsultasi = () => {
  const [date, setDate] = useState(new Date());
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
        // Filter appointment yang statusnya scheduled dan sesuai dengan user_id
        const scheduledAppointments = response.data.filter(
          (appointment) => appointment.status === "scheduled"
        );
        console.log(scheduledAppointments);
        setAppointments(scheduledAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Menandai loading selesai
      }
    };

    fetchAppointments();
  }, [token, userInfo.id]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Menampilkan appointment berdasarkan tanggal yang dipilih
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointment_start);
    return appointmentDate.toDateString() === date.toDateString();
  });
  return (
    <JadwalKonsultasiLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="calendar-container">
          <h2 className="text-center mb-4">Kalender</h2>
          <Calendar
            onChange={handleDateChange} // Fungsi untuk menangani perubahan tanggal
            value={date} // Nilai tanggal yang dipilih
            className="w-full"
          />
          <p className="mt-4 text-center">Tanggal yang dipilih: {date.toDateString()}</p>

          {/* Menampilkan loading jika data masih diambil */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : filteredAppointments.length > 0 ? (
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
                  <th>Pasien</th>
                  <th>Dokter</th>
                  <th>Waktu Mulai</th>
                  <th>Waktu Selesai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => {
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
                      <td>{appointment.patient.name}</td>
                      <td>{appointment.doctor.name}</td>
                      <td>{new Date(appointment.appointment_start).toLocaleTimeString()}</td>
                      <td>{new Date(appointment.appointment_end).toLocaleTimeString()}</td>
                      <td>
                        {appointment.status === "scheduled" && showConsultButton ? (
                          <a
                            className="btn btn-primary" href={`/konsultasi/${appointment.id}`}
                          >
                            Masuk Konsultasi
                          </a>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </DataTable>
          ) : (
            <p>Tidak ada appointment pada tanggal ini.</p>
          )}
        </div>
      </div>
    </JadwalKonsultasiLayout>
  );
};

export default JadwalKonsultasi;

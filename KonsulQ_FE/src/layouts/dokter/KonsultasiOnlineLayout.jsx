import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";


const KonsultasiOnlineLayout = ({ appointments }) => {
  console.log(appointments);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Konsultasi Online</h1>

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
          <tr className="border-b bg-gray-50">
            <th className="py-2 text-left text-gray-600">Tanggal Mulai</th>
            <th className="py-2 text-left text-gray-600">Tanggal Selesai</th>
            <th className="py-2 text-left text-gray-600">Nama Pasien</th>
            <th className="py-2 text-left text-gray-600">Details</th>
            <th className="py-2 text-left text-gray-600">Status</th>
            <th className="py-2 text-left text-gray-600">Aksi</th>

          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-2">
                {new Date(appointment.appointment_start).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},{" "}
                {new Date(appointment.appointment_start).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="py-2">
                {new Date(appointment.appointment_end).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })},{" "}
                {new Date(appointment.appointment_end).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="py-2">{appointment.patient.name}</td>
              <td className="py-2">{appointment.details}</td>
              <td className="py-2">{appointment.status}</td>
              <td className="py-2">
                {appointment.status === "pending" ? (
                  <a
                    href="/pembayaran"
                    className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 transition duration-200"
                  >
                    Bayar
                  </a>
                ) : appointment.status === "scheduled" &&
                  new Date() >= new Date(appointment.appointment_start) &&
                  new Date() <= new Date(appointment.appointment_end) ? (
                  <a
                    href={`/konsultasi/${appointment.id}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Masuk
                  </a>
                  ) : (
                  <span className="text-gray-400">Selesai</span>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default KonsultasiOnlineLayout;

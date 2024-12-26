import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./App.css";
DataTable.use(DT);
import PembayaranLayout from "../../layouts/pasien/PembayaranLayout";

const Pembayaran = () => {
  const [consultations, setConsultations] = useState([]); // State untuk menyimpan konsultasi
  const [loading, setLoading] = useState(true); // State untuk menandai loading

  const { userInfo } = useAuth(); // Ambil data pengguna dari context
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://techsign.store/api/consultations?patient_id=${userInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConsultations(response.data); // Simpan data konsultasi
      } catch (error) {
        console.error("Error fetching consultations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [token, userInfo.id]);

  return (
    <PembayaranLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Pembayaran</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
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
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200">Tanggal</th>
                  <th className="px-4 py-2 border border-gray-200">Dokter</th>
                  <th className="px-4 py-2 border border-gray-200">Catatan</th>
                  <th className="px-4 py-2 border border-gray-200">Status</th>
                  <th className="px-4 py-2 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation) => (
                  <tr key={consultation.id}>
                    <td className="px-4 py-2 border">
                      {new Date(
                        consultation.appointment.appointment_start
                      ).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 border">
                      {consultation.appointment.doctor.name}
                    </td>
                    <td className="px-4 py-2 border">
                      {consultation.notes}
                    </td>
                    <td className="px-4 py-2 border">
                      {consultation.status}
                    </td>
                    <td className="px-4 py-2 border">
                      <a
                        href={`/pembayaran/${consultation.id}`}
                        className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              </DataTable>
          </div>
        )}
      </div>
    </PembayaranLayout>
  );
};

export default Pembayaran;

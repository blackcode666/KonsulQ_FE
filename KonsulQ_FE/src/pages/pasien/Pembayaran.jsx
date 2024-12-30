import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useNavigate } from "react-router-dom";
import "./App.css";
DataTable.use(DT);
import PembayaranLayout from "../../layouts/pasien/PembayaranLayout";

const Pembayaran = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let isPaymentInProgress = false; // Flag untuk mencegah pemanggilan ganda

  useEffect(() => {
    fetchConsultations();
  }, [token, userInfo.id]);

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
      setConsultations(response.data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (consultation) => {
    if (isPaymentInProgress) {
      alert("Transaksi sedang diproses, harap tunggu.");
      return;
    }

    isPaymentInProgress = true;

    // Ambil data pembayaran yang telah ada, jika ada
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
    if (checkoutData && checkoutData.id === consultation.id) {
      // Data pembayaran sudah ada di localStorage, lanjutkan dengan pembayaran
      try {
        const response = await axios.post("https://techsign.store/api/create-transaction", {
          grossAmount: checkoutData.amount,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
        });

        window.snap.pay(response.data.snapToken, {
          onSuccess: async function (result) {
            console.log("Payment Success:", result);
            try {
              await axios.post("https://techsign.store/api/update-payment-status", {
                order_id: result.order_id,
                status: "success",
              });
              alert("Pembayaran berhasil!");
              fetchConsultations();
            } catch (error) {
              console.error("Error updating payment status:", error);
            }
          },
          onPending: async function (result) {
            console.log("Payment Pending:", result);
            try {
              await axios.post("https://techsign.store/api/update-payment-status", {
                order_id: result.order_id,
                status: "pending",
              });
              alert("Pembayaran masih dalam proses.");
              fetchConsultations();
            } catch (error) {
              console.error("Error updating payment status:", error);
            }
          },
          onError: async function (result) {
            console.log("Payment Error:", result);
            try {
              await axios.post("https://techsign.store/api/update-payment-status", {
                order_id: result.order_id,
                status: "failed",
              });
              alert("Pembayaran gagal.");
            } catch (error) {
              console.error("Error updating payment status:", error);
            }
          },
          onClose: function () {
            console.log("Payment Dialog Closed");
          },
        });
      } catch (error) {
        console.error("Error creating transaction:", error);
      }
    } else {
      alert("Data pemesanan tidak valid.");
    }

    isPaymentInProgress = false;
  };

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
                  <th className="px-4 py-2 border border-gray-200">Total Biaya</th>
                  <th className="px-4 py-2 border border-gray-200">Status</th>
                  <th className="px-4 py-2 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation) => (
                  <tr key={consultation.id}>
                    <td className="px-4 py-2 border">
                      {new Date(consultation.appointment.appointment_start).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 border">
                      {consultation.appointment.doctor.name}
                    </td>
                    <td className="px-4 py-2 border">{consultation.notes}</td>
                    <td className="px-4 py-2 border">{consultation.total_price}</td>
                    <td className="px-4 py-2 border">{consultation.status}</td>
                    <td className="px-4 py-2 border">
                      {consultation.status === "pending" && (
                        <button
                          onClick={() => handlePayment(consultation)}
                          className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Bayar
                        </button>
                      )}
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

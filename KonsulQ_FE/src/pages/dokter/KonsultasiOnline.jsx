import React, { useState, useEffect } from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import KonsultasiOnlineLayout from "../../layouts/dokter/KonsultasiOnlineLayout";
import axios from "axios";

const KonsultasiOnline = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("https://techsign.store/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <DokterLayout>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <KonsultasiOnlineLayout appointments={appointments} />
      )}
    </DokterLayout>
  );
};

export default KonsultasiOnline;

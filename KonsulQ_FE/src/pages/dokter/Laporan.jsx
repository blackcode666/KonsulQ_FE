import { React, useState, useEffect } from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import LaporanLayout from "../../layouts/dokter/LaporanLayout";
import { useAuth } from "../../context/AuthContext";

const Laporan = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://techsign.store/api/consultations/${userInfo.id}/doctor`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        console.log(data);
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <DokterLayout>
      <LaporanLayout reports={reports} />
    </DokterLayout>
  );
};

export default Laporan;

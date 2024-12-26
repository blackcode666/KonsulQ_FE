import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ReportsLayout from "../../layouts/admin/ReportsLayout";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://techsign.store/api/consultations", {
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AdminLayout>
      <ReportsLayout reports={reports} />
    </AdminLayout>
  );
};

export default Reports;

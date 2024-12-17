import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      const data = await fetchData("consultations");
      setConsultations(data);
    };

    fetchConsultations();
  }, []);

  return (
    <div>
      <h2>Consultations</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td>{consultation.id}</td>
              <td>{consultation.doctor_name}</td>
              <td>{consultation.patient_name}</td>
              <td>{consultation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consultations;

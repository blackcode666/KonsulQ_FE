import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { saveUserRole } from "../utils/firestore";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    const user = auth.currentUser;
    if (user) {
      await saveUserRole(user, role); // Simpan role ke Firestore
      navigate(`/${role}`); // Redirect ke halaman sesuai role
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <div className="role-selection">
      <h2>Pilih Peran Anda</h2>
      <button onClick={() => handleRoleSelect("admin")}>Admin</button>
      <button onClick={() => handleRoleSelect("doctor")}>Dokter</button>
      <button onClick={() => handleRoleSelect("patient")}>Pasien</button>
    </div>
  );
};

export default RoleSelection;

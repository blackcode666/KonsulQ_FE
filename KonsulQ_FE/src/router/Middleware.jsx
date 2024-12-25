import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Middleware = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth(); 

  useEffect(() => {
    
    if (!userInfo) {
      console.log("User not loaded yet");
      return;
    }

    
    if (!userInfo) {
      navigate("/login");
    } else if (allowedRoles && !allowedRoles.includes(userInfo?.role)) {
      
      alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
      if (userInfo?.role === "admin") {
        navigate("/dashboard-admin");
      } else if (userInfo?.role === "doctor") {
        navigate("/dashboard-dokter");
      } else if (userInfo?.role === "patient") {
        navigate("/dashboard-pasien");
      }
    }
  }, [navigate, userInfo, allowedRoles]);

  
  if (!userInfo) {
    return <div>Loading...</div>; 
  }

  return children; 
};

export default Middleware;

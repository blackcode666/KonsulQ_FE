import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"; // Pastikan jalur import benar

const Middleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Redirect ke halaman login jika belum login
      }
    });

    // Cleanup untuk listener Firebase
    return () => unsubscribe();
  }, [navigate]);

  return children; // Jika user terautentikasi, render children
};

export default Middleware;

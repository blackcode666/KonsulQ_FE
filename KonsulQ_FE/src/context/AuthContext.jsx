import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mengatur status login
  const [userInfo, setUserInfo] = useState(null); // Menyimpan informasi user

  // Mengecek token dan userInfo di localStorage saat aplikasi pertama kali di-load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (token && user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  // Fungsi untuk login
  const login = (user, token) => {
    setIsLoggedIn(true); // Set isLoggedIn ke true
    setUserInfo(user); // Simpan informasi user
    localStorage.setItem("authToken", token); // Simpan token ke localStorage
    localStorage.setItem("userInfo", JSON.stringify(user)); // Simpan informasi user ke localStorage
  };

  // Fungsi untuk logout
  const logout = () => {
    setIsLoggedIn(false); // Set isLoggedIn ke false
    setUserInfo(null); // Hapus informasi user dari state
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    localStorage.removeItem("userInfo"); // Hapus informasi user dari localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

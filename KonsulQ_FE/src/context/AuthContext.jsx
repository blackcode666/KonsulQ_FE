import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (token && user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  
  const login = (user, token) => {
    setIsLoggedIn(true);
    setUserInfo(user); 
    localStorage.setItem("authToken", token); 
    localStorage.setItem("userInfo", JSON.stringify(user)); 
  };

  
  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null); 
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("userInfo"); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

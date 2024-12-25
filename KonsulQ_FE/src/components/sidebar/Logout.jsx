import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 

    const handleSignOut = () => {
        logout(); 
        navigate("/login"); 
    };

    return (
        <button
            onClick={handleSignOut} 
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
            <i className="fas fa-sign-out-alt mr-3 text-teal-500"></i> Sign Out
        </button>
    );
};

export default Logout;

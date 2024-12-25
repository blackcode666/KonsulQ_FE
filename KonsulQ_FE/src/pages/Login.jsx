import React from "react";
import LRImage from "../assets/LR.png";
import RightImage from "../assets/1.png";
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";  

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome back, ${user.displayName}!`);

      
      login({ ...user, role: user.role || 'user' });  

      navigateBasedOnRole(user.role);  
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("https://techsign.store/api/login", {
        email,
        password,
      });

      console.log("API Response:", response.data); 

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", token);
        alert(`Welcome back, ${user.name}!`);

        
        const role = user.role ? user.role : 'user';  

        login({ ...user, role });  

        navigateBasedOnRole(role);  
      } else {
        alert("Login failed. Token not received.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your email and password.");
    }
  };


  const navigateBasedOnRole = (role) => {
    if (role === "admin") {
      navigate("/dashboard-admin");
    } else if (role === "doctor") {
      navigate("/dashboard-dokter");
    } else if (role === "patient") {
      navigate("/dashboard-pasien");
    } else {
      navigate("/");  
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-500">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center bg-gray-200 px-12 lg:px-20 pb-8 flex-grow">
        <div className="flex justify-center mb-10">
          {/* Enlarged Logo */}
          <img src={LRImage} alt="Logo" className="w-44 h-44 object-contain" />
        </div>
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Selamat Datang
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            Masuk untuk melanjutkan
          </p>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan email kamu"
                aria-describedby="email-helper"
              />
              <small
                id="email-helper"
                className="text-sm text-gray-500"
              >
                Contoh: email@example.com
              </small>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan password kamu"
                aria-describedby="password-helper"
              />
              <small
                id="password-helper"
                className="text-sm text-gray-500"
              >
                Password minimal 8 karakter.
              </small>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:outline-none"
            >
              Masuk
            </button>
          </form>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-600 mb-5">Atau masuk menggunakan</p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.805 10.023h-9.81v3.954h5.636c-.318 1.614-1.29 2.982-2.729 3.83l3.06 2.384c2.038-1.88 3.203-4.64 3.203-8.01 0-.729-.084-1.439-.235-2.158z" />
                  <path d="M12 21.272c2.478 0 4.562-.827 6.083-2.242l-3.06-2.384c-.835.561-1.895.895-3.023.895-2.325 0-4.295-1.57-5.002-3.687l-3.179 2.47c1.528 3.005 4.64 5.049 8.181 5.049z" />
                  <path d="M6.998 13.85a5.97 5.97 0 01-.347-1.903c0-.661.122-1.295.347-1.903l-3.18-2.471c-.707 1.37-1.11 2.925-1.11 4.374s.403 3.004 1.11 4.374l3.18-2.471z" />
                  <path d="M12 5.811c1.218 0 2.336.432 3.208 1.27l2.414-2.414c-1.523-1.433-3.62-2.326-5.622-2.326-3.541 0-6.653 2.045-8.182 5.05l3.18 2.47c.707-2.118 2.677-3.68 5.002-3.68z" />
                </svg>
                Login with Google
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Belum punya akun?{" "}
              <a href="/register" className="text-green-500 hover:underline">
                Daftar Sekarang
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-[45%] bg-teal-600 items-center justify-center flex-grow">
        <img
          src={RightImage}
          alt="Right Side"
          className="max-h-[80%] max-w-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default Login;

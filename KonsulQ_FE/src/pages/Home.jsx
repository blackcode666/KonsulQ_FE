import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import HealthInfo from "../components/home/HealthInfo";
import Partners from "../components/home/Partners";
import Services from "../components/home/Services";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HealthInfo />
      <Partners />
      <Services />
      
      {/* Button untuk menuju Dashboard */}
      <div className="text-center mt-12">
        <Link to="/dashboard">
          <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
            Masuk ke Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

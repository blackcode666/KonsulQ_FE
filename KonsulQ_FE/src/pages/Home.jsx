import React from "react";
import HeroSection from "../components/home/HeroSection";
import HealthInfo from "../components/home/HealthInfo";
import Partners from "../components/home/Partners";
import Services from "../components/home/Services";
import { Link } from "react-router-dom"; // Import Link untuk tombol

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50"> {/* Background gray untuk keseluruhan halaman */}
      <HeroSection />
      <HealthInfo />
      <Partners />
      <Services />
  
    </div>
  );
};

export default Home;

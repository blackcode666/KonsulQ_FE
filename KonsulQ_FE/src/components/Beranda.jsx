import React from 'react';
import HeroSection from './HeroSection';
import Services from './Services';
import Consultation from './Consultation';
import HealthInfo from './HealthInfo';
import Partners from './Partners';
import Footer from './Footer';

const Beranda = () => {
  return (
    <div>
      <HeroSection />
      <Services />
      <Consultation />
      <HealthInfo />
      <Partners />
      <Footer />
    </div>
  );
};

export default Beranda;

import React from "react";

const Footer = () => {
  return (
    <footer className="text-center p-4 bg-gray-800 text-white mt-8">
      <p>&copy; {new Date().getFullYear()} KonsulQ. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

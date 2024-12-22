import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800">About Us</h2>
      <p className="mt-4 text-lg text-gray-700">
        This is the about page of the application. Here you can provide
        information about your project or business. We aim to provide an
        excellent service to our users and constantly improve our platform.
      </p>
      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
        <p className="mt-2 text-gray-600">
          Our mission is to provide easy access to consultations with
          healthcare professionals, making sure everyone has the tools they
          need to stay healthy.
        </p>
      </section>
    </div>
  );
};

export default About;

import React from 'react';
import logoImage from '../assets/LOGO.png'; // Import LOGO.png

// Data untuk Health Info
const healthInfoData = [
  { id: 1, title: 'Dental treatments', image: logoImage },
  { id: 2, title: 'Bones treatments', image: logoImage },
  { id: 3, title: 'Diagnosis', image: logoImage },
  { id: 4, title: 'Cardiology', image: logoImage },
  { id: 5, title: 'Surgery', image: logoImage },
  { id: 6, title: 'Eye care', image: logoImage },
];

const HealthInfo = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-r from-teal-100 to-teal-50">
      <h2 className="text-4xl font-extrabold text-teal-600 text-center mb-8">
        Dapatkan Informasi Seputar Kesehatan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {healthInfoData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Render gambar */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover transition-all duration-300 hover:scale-110"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Donec non augue non velit placerat vehicula.
              </p>
              <button className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:scale-105">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthInfo;

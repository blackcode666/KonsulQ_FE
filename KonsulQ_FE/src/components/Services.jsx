import React from 'react';

const services = [
  { id: 1, title: '100.000+', description: 'Pasien sudah merasakan manfaatnya' },
  { id: 2, title: '4.8/5', description: 'Tingkat kepuasan pasien' },
  { id: 3, title: '500+', description: 'Tenaga medis siap melayani Anda' },
];

const Services = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-10">
        Layanan Terbaik untuk Kesehatan Anda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <h3 className="text-5xl font-extrabold text-teal-500 mb-4">{service.title}</h3>
            <p className="text-lg font-semibold text-gray-700">{service.description}</p>
            <div className="mt-4 border-t-4 border-teal-500 pt-4">
              <span className="text-teal-500 font-semibold">Lebih lanjut</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Artikel = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Artikel Section */}
      <section className="container mx-auto px-6 py-8">
        {/* Artikel Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-600 mb-2">
            Dental Treatments
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
              Kesehatan Gigi
            </span>
            <span>14 Des 2024 Ditinjau oleh dr. Fadhilah Neza Solikhah</span>
          </div>
        </div>

        {/* Artikel Image */}
        <div className="mb-8">
          <img
            src="https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg"
            alt="Dental Treatments"
            className="w-full max-w-4xl rounded-lg shadow-lg"
          />
        </div>

        {/* Artikel Content */}
        <div className="text-gray-700 leading-relaxed max-w-4xl">
          <p className="mb-4">
            Perawatan gigi yang baik sangat penting untuk menjaga kesehatan mulut
            dan mencegah berbagai masalah seperti gigi berlubang dan penyakit
            gusi. Berikut adalah beberapa tips untuk merawat gigi Anda:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Menyikat gigi dua kali sehari dengan pasta gigi berfluoride.</li>
            <li>Menggunakan benang gigi setiap hari untuk membersihkan sela-sela gigi.</li>
            <li>Menghindari makanan dan minuman manis yang berlebihan.</li>
            <li>Rutin memeriksakan gigi ke dokter gigi setiap enam bulan sekali.</li>
          </ul>
          <p>
            Dengan mengikuti langkah-langkah di atas, Anda dapat menjaga kesehatan
            gigi dan mulut serta mencegah masalah yang lebih serius di kemudian hari.
          </p>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Artikel Terkait</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
            >
              <img
                src={`https://images.pexels.com/photos/384576${item}/pexels-photo-384576${item}.jpeg`}
                alt={`Artikel ${item}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-teal-600">
                  Tips Menjaga Kesehatan Gigi
                </h3>
                <p className="text-sm text-gray-500">
                  Pelajari cara menjaga kesehatan gigi dengan benar untuk mencegah berbagai masalah mulut.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Artikel;

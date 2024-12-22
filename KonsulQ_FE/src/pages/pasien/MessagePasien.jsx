import React from "react";
import MessagesLayout from "../../layouts/pasien/MessagesLayout";

const Messages = () => {
  return (
    <MessagesLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Messages</h1>
        <p>Pesan pasien akan ditampilkan di sini.</p>
      </div>
    </MessagesLayout>
  );
};

export default Messages;

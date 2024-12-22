import React from "react";
import DokterLayout from "../../layouts/dokter/DokterLayout";
import MessagesLayout from "../../layouts/dokter/MessagesLayout";

const Messages = () => {
  const messages = [
    { sender: "Albram", content: "Dokter, terima kasih atas konsultasi kemarin." },
    { sender: "Salman", content: "Dok, bagaimana hasil lab saya?" },
    { sender: "Dela", content: "Dok, kapan jadwal konsultasi selanjutnya?" },
    { sender: "Fadhilah", content: "Dokter, saya merasa lebih baik setelah perawatan." },
  ];

  return (
    <DokterLayout>
      <MessagesLayout messages={messages} />
    </DokterLayout>
  );
};

export default Messages;

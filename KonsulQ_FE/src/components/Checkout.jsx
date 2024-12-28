import React, { useState } from "react";

const Checkout = () => {
  const [snapToken, setSnapToken] = useState("");
  const [orderId] = useState("ORDER-" + new Date().getTime()); // Order ID unik
  const [grossAmount] = useState(1000); // Total harga

  const handlePayment = async () => {
    try {
      // Panggil API Laravel untuk mendapatkan Snap Token
      const response = await fetch(
        "http://localhost:8000/api/create-transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grossAmount: grossAmount,
            name: "Nama Pelanggan",
            email: "email@contoh.com",
            phone: "081234567890",
          }),
        }
      );

      const data = await response.json();

      if (data.snapToken) {
        setSnapToken(data.snapToken);

        // Panggil Snap untuk membuka modal pembayaran
        window.snap.pay(data.snapToken, {
          onSuccess: (result) => {
            console.log("Payment Success:", result);

            // Arahkan ke WhatsApp dengan pesan otomatis
            const waUrl = `https://wa.me/6281317407414?text=Halo%20admin,%20saya%20sudah%20melakukan%20pembayaran%20dengan%20Order%20ID:%20${result.order_id}`;
            window.location.href = waUrl;
          },
          onPending: (result) => {
            console.log("Payment Pending:", result);
          },
          onError: (result) => {
            console.error("Payment Error:", result);
          },
          onClose: () => {
            console.log("Payment Popup Closed");
          },
        });
      }
    } catch (error) {
      console.error("Error fetching transaction token:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Order ID: {orderId}</p>
      <p>Total: Rp {grossAmount.toLocaleString()}</p>
      <button
        onClick={handlePayment}
        className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default Checkout;

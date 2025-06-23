"use client";

import { useState } from "react";

export default function DonateForm() {
  const [amount, setAmount] = useState(5); // default $5

  const handleDonate = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error creating checkout session.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Support Our Cause</h1>
        <input
          type="number"
          min="1"
          className="border p-2 rounded w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={handleDonate}
        >
          Donate ${amount}
        </button>
      </div>
    </div>
  );
}

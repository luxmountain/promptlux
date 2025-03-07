// 📌 PinItem.jsx
import React from "react";

function PinItem({ pin }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg mb-8">
      {/* Image giữ nguyên tỷ lệ */}
      <img
        src={pin.image}
        alt={pin.title}
        className="w-full h-auto object-cover rounded-lg"
      />
      <div className="p-3">
        <h2 className="font-semibold text-lg">{pin.title}</h2>
        <p className="text-gray-600 text-sm">{pin.desc}</p>
      </div>
    </div>
  );
}

export default PinItem;

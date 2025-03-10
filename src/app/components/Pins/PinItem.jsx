import React from "react";

function PinItem({ pin }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg mb-8">
      <img
        src={pin.image_url}
        alt={pin.title}
        className="w-full h-auto object-cover rounded-lg"
      />
      <div className="p-3">
        <h2 className="font-semibold text-lg">{pin.title}</h2>
        <p className="text-gray-600 text-sm">{pin.description}</p>
      </div>
    </div>
  );
}

export default PinItem;

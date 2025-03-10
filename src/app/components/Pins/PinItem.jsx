import React from "react";

function PinItem({ pin }) {
  console.log(pin);
  return (
    <div className="overflow-hidden mb-8">
      {/* Ảnh bài post */}
      <img
        src={pin.image_url}
        alt={pin.description}
        className="w-full h-auto object-cover rounded-xl overflow-hidden"
      />

      <div className="p-1">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-700">
            @{pin.user?.username || "Unknown User"}
          </h3>
          <p className="text-base text-gray-500">{pin.model?.model_name || "Unknown Model"}</p>
        </div>
      </div>
    </div>
  );
}

export default PinItem;
